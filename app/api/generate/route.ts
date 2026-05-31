import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

import { CampaignResponse, mockCampaign } from "@/lib/campaign-types";

const createGeminiClient = (apiKey: string) =>
  createGoogleGenerativeAI({
    apiKey,
  });

const baseSystemPrompt = `
You are a world-class marketing strategist and copywriter. Generate high-quality, persuasive, creative copy tailored to the inputs.
`.trim();

const stage1Schema = `
Always output valid JSON only (no extra text) with this exact structure (use the fields as typed below):
{
  "heroVariants": [
    {
      "title": string,               // H1, max 60 chars
      "subtitle": string,            // H2/subhead, max 150 chars
      "ctaPrimary": string,          // primary CTA label, max 30 chars
      "ctaSecondary": string,        // secondary CTA label, max 30 chars
      "heroImagePrompt": string,     // image prompt for hero product shot
      "heroImageAlt": string         // short alt text for the hero image
    }
  ],
  "landingPage": {
    "title": string,
    "hero": string,
    "features": [
      {
        "type": "lead" | "metric" | "detail",
        "heading": string,
        "body": string,
        "metric": string | null,
        "iconPrompt": string | null
      }
    ],
    "cta": string,
    "htmlPreview": string           // small, semantic Tailwind-friendly HTML block for hero/feature area
  },
  "trust": [
    {
      "type": "logo" | "testimonial" | "stat",
      "text": string,
      "source": string | null
    }
  ],
  "faq": [
    { "q": string, "a": string }
  ],
  "designTokens": {
    "primaryColor": string,         // hex
    "accentColor": string,          // hex
    "headerFont": string,           // friendly name (e.g. Playfair Display)
    "bodyFont": string,             // friendly name (e.g. Inter)
    "spacingScale": string          // short guidance (e.g. "tight|normal|spacious")
  },
  "meta": {
    "titleTag": string,
    "description": string
  },
  "taglines": string[]
}
`.trim();

const stage1ExtraInstructions =
  `Return two distinct hero variants (one short/punchy, one long/story). For all copy fields provide suggested character limits in comments as specified. Prefer active voice and metric-led bullets where possible. Provide 1–3 trust items (mix of logos, testimonials, or stats). For each image prompt include a one-sentence alt text. The htmlPreview field should be a small, semantic Tailwind-compatible block (no scripts, no iframes) suitable for direct insertion into a component; keep it focused on the hero and one feature row. Return design tokens (primaryColor, accentColor, headerFont, bodyFont) and a short spacing hint. Always keep arrays short (max 3 items for heroVariants, max 5 features). Do not include any additional explanation or text — JSON only.
`.trim();

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
`.trim();

const stage1ZodSchema = z.object({
  heroVariants: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      ctaPrimary: z.string(),
      ctaSecondary: z.string().optional(),
      heroImagePrompt: z.string().optional(),
      heroImageAlt: z.string().optional(),
    }),
  ),
  landingPage: z.object({
    title: z.string(),
    hero: z.string(),
    features: z.array(
      z.object({
        type: z.enum(["lead", "metric", "detail"]),
        heading: z.string(),
        body: z.string(),
        metric: z.string().nullable().optional(),
        iconPrompt: z.string().nullable().optional(),
      }),
    ),
    cta: z.string(),
    htmlPreview: z.string(),
  }),
  trust: z
    .array(
      z.object({
        type: z.enum(["logo", "testimonial", "stat"]),
        text: z.string(),
        source: z.string().nullable().optional(),
      }),
    )
    .optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  designTokens: z
    .object({
      primaryColor: z.string(),
      accentColor: z.string().optional(),
      headerFont: z.string().optional(),
      bodyFont: z.string().optional(),
      spacingScale: z.string().optional(),
    })
    .optional(),
  meta: z
    .object({
      titleTag: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
  taglines: z.array(z.string()).optional(),
});

const stage2ZodSchema = z.object({
  emails: z.array(
    z.object({
      subject: z.string(),
      preview: z.string(),
      body: z.string(),
    }),
  ),
  socialPosts: z.array(
    z.object({
      platform: z.enum(["Twitter", "Instagram", "LinkedIn"]),
      text: z.string(),
      hashtags: z.array(z.string()),
    }),
  ),
  imagePrompts: z.array(z.string()).optional(),
});

const isRateLimitError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const anyError = error as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
    message?: string;
  };
  const status =
    anyError.status ?? anyError.statusCode ?? anyError.response?.status;
  const message = (anyError.message ?? "").toLowerCase();
  return (
    status === 429 ||
    message.includes("rate limit") ||
    message.includes("quota") ||
    message.includes("resource exhausted")
  );
};

const isAuthError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const anyError = error as {
    status?: number;
    statusCode?: number;
    response?: { status?: number };
    message?: string;
  };
  const status =
    anyError.status ?? anyError.statusCode ?? anyError.response?.status;
  const message = (anyError.message ?? "").toLowerCase();
  return (
    status === 401 ||
    status === 403 ||
    message.includes("api key") ||
    message.includes("unauthorized")
  );
};

const getModelCandidates = () => {
  const primary = (process.env.GEMINI_MODEL || "gemini-2.5-flash").trim();
  const fallbackEnv = process.env.GEMINI_FALLBACK_MODELS || "";
  const fallbackList = fallbackEnv
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const defaults = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemma-3-12b",
    "gemma-3-1b",
    "gemma-3-27b",
    "gemma-3-2b",
    "gemma-3-4b",
  ];

  return Array.from(new Set([primary, ...fallbackList, ...defaults]));
};

const getGeminiApiKeys = () => {
  const keys = [
    process.env.GEMINI_API_KEY1,
    process.env.GEMINI_API_KEY2,
    process.env.GEMINI_API_KEY3,
  ]
    .map((key) => key?.trim())
    .filter((key): key is string => Boolean(key));

  if (keys.length > 0) return keys;

  const legacyKey = process.env.GEMINI_API_KEY?.trim();
  return legacyKey ? [legacyKey] : [];
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
      productName: string;
      productDescription: string;
      targetAudience: string;
      campaignGoal: string;
      tones?: string[];
      desiredLength: number;
      brandColors?: string;
      customPrompt?: string;
      section?: string;
      stage?: "stage1" | "stage2";
    };

    const lengthLabel =
      desiredLength === 33
        ? "short"
        : desiredLength === 66
          ? "medium"
          : "long / detailed";

    const userMessageLines = [
      `Product: ${productName}`,
      `Description: ${productDescription}`,
      `Audience: ${targetAudience}`,
      `Goal: ${campaignGoal}`,
      `Tone: ${(tones ?? []).join(", ") || "Default"}`,
      `Length: ${lengthLabel}`,
      brandColors ? `Brand Colors: ${brandColors}` : null,
      section
        ? `Focus: Generate especially strong content for the ${section} section.`
        : null,
    ].filter(Boolean) as string[];

    const userMessage = userMessageLines.join("\n");

    const stage = body?.stage === "stage2" ? "stage2" : "stage1";
    const envPrompt = process.env.CAMPAIGN_ADDITIONAL_PROMPT?.trim();
    const userPrompt = customPrompt?.trim();

    const extraPromptLines = [
      envPrompt ? `Additional global instructions: ${envPrompt}` : null,
      userPrompt ? `Additional user instructions: ${userPrompt}` : null,
    ].filter(Boolean) as string[];

    const stageInstruction =
      stage === "stage1"
        ? "Generate only the landing page content and taglines."
        : "Generate only emails, social posts, and image prompts. Do not include landing page or taglines.";

    const fullSystemPrompt = [
      baseSystemPrompt,
      stageInstruction,
      ...(stage === "stage1"
        ? [stage1Schema, stage1ExtraInstructions]
        : [stage2Schema]),
      ...extraPromptLines,
    ]
      .filter(Boolean)
      .join("\n\n");

    const geminiApiKeys = getGeminiApiKeys();

    if (geminiApiKeys.length === 0) {
      const mockResponse =
        stage === "stage1"
          ? {
              landingPage: mockCampaign.landingPage,
              taglines: mockCampaign.taglines,
            }
          : {
              emails: mockCampaign.emails,
              socialPosts: mockCampaign.socialPosts,
              imagePrompts: mockCampaign.imagePrompts,
            };

      return NextResponse.json<CampaignResponse>(mockResponse, {
        headers: {
          "X-Mock-Data": "true",
        },
      });
    }

    const modelCandidates = getModelCandidates();
    let lastError: unknown = null;
    let sawRateLimit = false;
    let sawAuth = false;
    let sawOther = false;

    for (const apiKey of geminiApiKeys) {
      const gemini = createGeminiClient(apiKey);
      let keySawOther = false;
      let keyAborted = false;

      for (const modelName of modelCandidates) {
        try {
          const result = await generateObject({
            model: gemini(modelName) as any,
            system: fullSystemPrompt,
            prompt: userMessage,
            schema: stage === "stage1" ? stage1ZodSchema : stage2ZodSchema,
          } as any);

          return NextResponse.json<CampaignResponse>(
            result.object as CampaignResponse,
            {
              headers: {
                "X-Model-Used": modelName,
              },
            },
          );
        } catch (generateError) {
          lastError = generateError;

          if (isAuthError(generateError)) {
            sawAuth = true;
            keyAborted = true;
            break;
          }

          if (isRateLimitError(generateError)) {
            sawRateLimit = true;
            keyAborted = true;
            break;
          }

          // Try the next model for non-auth errors (including unsupported model names)
          keySawOther = true;
          continue;
        }
      }

      if (keySawOther && !keyAborted) {
        sawOther = true;
      }
    }

    console.error("All model attempts failed:", lastError);

    if (sawRateLimit && !sawOther) {
      return NextResponse.json(
        {
          error: "RATE_LIMIT",
          message: "All models are rate-limited. Please try again later.",
        },
        { status: 429 },
      );
    }

    if (sawAuth && !sawOther && !sawRateLimit) {
      return NextResponse.json(
        { error: "AUTH", message: "Invalid or missing API key." },
        { status: 401 },
      );
    }

    const fallback =
      stage === "stage1"
        ? {
            landingPage: mockCampaign.landingPage,
            taglines: mockCampaign.taglines,
          }
        : {
            emails: mockCampaign.emails,
            socialPosts: mockCampaign.socialPosts,
            imagePrompts: mockCampaign.imagePrompts,
          };

    return NextResponse.json<CampaignResponse>(fallback, {
      headers: {
        "X-Mock-Data": "true",
      },
    });
  } catch (error) {
    console.error("Error generating campaign:", error);
    return NextResponse.json<CampaignResponse>(mockCampaign, {
      status: 500,
      headers: {
        "X-Mock-Data": "true",
      },
    });
  }
}
