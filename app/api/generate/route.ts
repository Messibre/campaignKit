import { NextRequest, NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { z } from 'zod'

import { CampaignResponse, mockCampaign } from '@/lib/campaign-types'

const createGeminiClient = (apiKey: string) =>
  createGoogleGenerativeAI({
    apiKey,
  })

const baseSystemPrompt = `
You are a world-class marketing strategist and copywriter. Generate high-quality, persuasive, creative copy tailored to the inputs.
`.trim()

const stage1Schema = `
Always output valid JSON only (no extra text) with this exact structure:
{
  "landingPage": {
    "title": string,
    "hero": string,
    "features": string[],
    "cta": string,
    "htmlPreview": string
  },
  "taglines": string[]
}
`.trim()

const stage2Schema = `
Always output valid JSON only (no extra text) with this exact structure:
{
  "emails": [
    {
      "subject": string,
      "preview": string,
      "body": string
    }
  ],
  "socialPosts": [
    {
      "platform": "Twitter" | "Instagram" | "LinkedIn",
      "text": string,
      "hashtags": string[]
    }
  ],
  "imagePrompts": string[]
}
`.trim()

const stage1ZodSchema = z.object({
  landingPage: z.object({
    title: z.string(),
    hero: z.string(),
    features: z.array(z.string()),
    cta: z.string(),
    htmlPreview: z.string(),
  }),
  taglines: z.array(z.string()),
})

const stage2ZodSchema = z.object({
  emails: z.array(
    z.object({
      subject: z.string(),
      preview: z.string(),
      body: z.string(),
    })
  ),
  socialPosts: z.array(
    z.object({
      platform: z.enum(['Twitter', 'Instagram', 'LinkedIn']),
      text: z.string(),
      hashtags: z.array(z.string()),
    })
  ),
  imagePrompts: z.array(z.string()).optional(),
})

const isRateLimitError = (error: unknown) => {
  if (!error || typeof error !== 'object') return false
  const anyError = error as {
    status?: number
    statusCode?: number
    response?: { status?: number }
    message?: string
  }
  const status = anyError.status ?? anyError.statusCode ?? anyError.response?.status
  const message = (anyError.message ?? '').toLowerCase()
  return (
    status === 429 ||
    message.includes('rate limit') ||
    message.includes('quota') ||
    message.includes('resource exhausted')
  )
}

const isAuthError = (error: unknown) => {
  if (!error || typeof error !== 'object') return false
  const anyError = error as {
    status?: number
    statusCode?: number
    response?: { status?: number }
    message?: string
  }
  const status = anyError.status ?? anyError.statusCode ?? anyError.response?.status
  const message = (anyError.message ?? '').toLowerCase()
  return status === 401 || status === 403 || message.includes('api key') || message.includes('unauthorized')
}

const getModelCandidates = () => {
  const primary = (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim()
  const fallbackEnv = process.env.GEMINI_FALLBACK_MODELS || ''
  const fallbackList = fallbackEnv
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  const defaults = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemma-3-12b',
    'gemma-3-1b',
    'gemma-3-27b',
    'gemma-3-2b',
    'gemma-3-4b',
  ]

  return Array.from(new Set([primary, ...fallbackList, ...defaults]))
}

const getGeminiApiKeys = () => {
  const keys = [
    process.env.GEMINI_API_KEY1,
    process.env.GEMINI_API_KEY2,
    process.env.GEMINI_API_KEY3,
  ]
    .map((key) => key?.trim())
    .filter((key): key is string => Boolean(key))

  if (keys.length > 0) return keys

  const legacyKey = process.env.GEMINI_API_KEY?.trim()
  return legacyKey ? [legacyKey] : []
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      productName,
      productDescription,
      targetAudience,
      campaignGoal,
      tones,
      desiredLength,
      brandColors,
      customPrompt,
      section,
    } = body as {
      productName: string
      productDescription: string
      targetAudience: string
      campaignGoal: string
      tones?: string[]
      desiredLength: number
      brandColors?: string
      customPrompt?: string
      section?: string
      stage?: 'stage1' | 'stage2'
    }

    const lengthLabel =
      desiredLength === 33 ? 'short' : desiredLength === 66 ? 'medium' : 'long / detailed'

    const userMessageLines = [
      `Product: ${productName}`,
      `Description: ${productDescription}`,
      `Audience: ${targetAudience}`,
      `Goal: ${campaignGoal}`,
      `Tone: ${(tones ?? []).join(', ') || 'Default'}`,
      `Length: ${lengthLabel}`,
      brandColors ? `Brand Colors: ${brandColors}` : null,
      section ? `Focus: Generate especially strong content for the ${section} section.` : null,
    ].filter(Boolean) as string[]

    const userMessage = userMessageLines.join('\n')

    const stage = body?.stage === 'stage2' ? 'stage2' : 'stage1'
    const envPrompt = process.env.CAMPAIGN_ADDITIONAL_PROMPT?.trim()
    const userPrompt = customPrompt?.trim()

    const extraPromptLines = [
      envPrompt ? `Additional global instructions: ${envPrompt}` : null,
      userPrompt ? `Additional user instructions: ${userPrompt}` : null,
    ].filter(Boolean) as string[]

    const stageInstruction =
      stage === 'stage1'
        ? 'Generate only the landing page content and taglines.'
        : 'Generate only emails, social posts, and image prompts. Do not include landing page or taglines.'

    const fullSystemPrompt = [
      baseSystemPrompt,
      stageInstruction,
      stage === 'stage1' ? stage1Schema : stage2Schema,
      ...extraPromptLines,
    ]
      .filter(Boolean)
      .join('\n\n')

    const geminiApiKeys = getGeminiApiKeys()

    if (geminiApiKeys.length === 0) {
      const mockResponse =
        stage === 'stage1'
          ? { landingPage: mockCampaign.landingPage, taglines: mockCampaign.taglines }
          : {
              emails: mockCampaign.emails,
              socialPosts: mockCampaign.socialPosts,
              imagePrompts: mockCampaign.imagePrompts,
            }

      return NextResponse.json<CampaignResponse>(mockResponse, {
        headers: {
          'X-Mock-Data': 'true',
        },
      })
    }

    const modelCandidates = getModelCandidates()
    let lastError: unknown = null
    let sawRateLimit = false
    let sawAuth = false
    let sawOther = false

    for (const apiKey of geminiApiKeys) {
      const gemini = createGeminiClient(apiKey)
      let keySawOther = false
      let keyAborted = false

      for (const modelName of modelCandidates) {
        try {
          const result = await generateObject({
            model: gemini(modelName),
            system: fullSystemPrompt,
            prompt: userMessage,
            schema: stage === 'stage1' ? stage1ZodSchema : stage2ZodSchema,
          })

          return NextResponse.json<CampaignResponse>(result.object as CampaignResponse, {
            headers: {
              'X-Model-Used': modelName,
            },
          })
        } catch (generateError) {
          lastError = generateError

          if (isAuthError(generateError)) {
            sawAuth = true
            keyAborted = true
            break
          }

          if (isRateLimitError(generateError)) {
            sawRateLimit = true
            keyAborted = true
            break
          }

          // Try the next model for non-auth errors (including unsupported model names)
          keySawOther = true
          continue
        }
      }

      if (keySawOther && !keyAborted) {
        sawOther = true
      }
    }

    console.error('All model attempts failed:', lastError)

    if (sawRateLimit && !sawOther) {
      return NextResponse.json(
        { error: 'RATE_LIMIT', message: 'All models are rate-limited. Please try again later.' },
        { status: 429 }
      )
    }

    if (sawAuth && !sawOther && !sawRateLimit) {
      return NextResponse.json(
        { error: 'AUTH', message: 'Invalid or missing API key.' },
        { status: 401 }
      )
    }

    const fallback =
      stage === 'stage1'
        ? { landingPage: mockCampaign.landingPage, taglines: mockCampaign.taglines }
        : {
            emails: mockCampaign.emails,
            socialPosts: mockCampaign.socialPosts,
            imagePrompts: mockCampaign.imagePrompts,
          }

    return NextResponse.json<CampaignResponse>(fallback, {
      headers: {
        'X-Mock-Data': 'true',
      },
    })
  } catch (error) {
    console.error('Error generating campaign:', error)
    return NextResponse.json<CampaignResponse>(mockCampaign, {
      status: 500,
      headers: {
        'X-Mock-Data': 'true',
      },
    })
  }
}

