'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

const TONES = ['Professional', 'Casual/Fun', 'Inspirational', 'Urgent', 'Luxurious', 'Humorous'] as const

const campaignFormSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  productDescription: z.string().min(20, 'Description must be at least 20 characters'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  campaignGoal: z.string().min(1, 'Campaign goal is required'),
  tones: z.array(z.string()).default([]),
  desiredLength: z.number().min(33).max(100),
  brandColors: z.string().optional(),
  customPrompt: z.string().optional(),
})

export type CampaignFormValues = z.infer<typeof campaignFormSchema>

export type CampaignData = CampaignFormValues

interface CampaignFormProps {
  formRef: React.RefObject<HTMLDivElement | null>
  onSubmit: (data: CampaignFormValues) => Promise<void> | void
  isSubmitting: boolean
}

export function CampaignForm({ formRef, onSubmit, isSubmitting }: CampaignFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      productName: '',
      productDescription: '',
      targetAudience: '',
      campaignGoal: 'Lead Generation',
      tones: [],
      desiredLength: 50,
      brandColors: '',
      customPrompt: '',
    },
  })

  const tones = watch('tones')
  const desiredLength = watch('desiredLength')

  const handleToneToggle = (tone: string) => {
    const current = tones || []
    const next = current.includes(tone) ? current.filter((t) => t !== tone) : [...current, tone]
    setValue('tones', next, { shouldDirty: true, shouldValidate: true })
  }

  const onSubmitInternal = async (values: CampaignFormValues) => {
    await onSubmit(values)
  }

  const desiredLengthLabel =
    desiredLength === 33 ? 'Short & Punchy' : desiredLength === 66 ? 'Medium' : 'Detailed'

  return (
    <section ref={formRef} className="py-20 sm:py-32 bg-background border-t border-border/20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">
              Create Your Campaign
            </span>
          </div>
          <h2
            className="text-5xl sm:text-6xl font-bold text-foreground mb-4 text-pretty leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Tell Us About Your Product
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Provide the essential details and we'll craft a complete, tailored marketing campaign kit
            for your brand.
          </p>
        </div>

        <div className="luxury-card animate-scale-in">
          <form onSubmit={handleSubmit(onSubmitInternal)} className="space-y-8">
            {/* Product Name */}
            <div className="space-y-3 animate-fade-in-up stagger-1 opacity-0">
              <Label
                htmlFor="productName"
                className="text-xs font-semibold text-foreground uppercase tracking-widest"
              >
                Product Name
              </Label>
              <Input
                id="productName"
                placeholder="e.g., EcoFlow Water Bottle"
                className="luxury-input h-12 rounded-lg"
                {...register('productName')}
              />
              {errors.productName && (
                <p className="text-sm text-destructive">{errors.productName.message}</p>
              )}
            </div>

            {/* Product Description */}
            <div className="space-y-3 animate-fade-in-up stagger-2 opacity-0">
              <Label
                htmlFor="productDescription"
                className="text-xs font-semibold text-foreground uppercase tracking-widest"
              >
                Product Description
              </Label>
              <Textarea
                id="productDescription"
                placeholder="Eco-friendly reusable water bottle made from recycled ocean plastic..."
                className="luxury-input min-h-32 resize-none rounded-lg"
                {...register('productDescription')}
              />
              {errors.productDescription && (
                <p className="text-sm text-destructive">{errors.productDescription.message}</p>
              )}
            </div>

            {/* Target Audience */}
            <div className="space-y-3 animate-fade-in-up stagger-3 opacity-0">
              <Label
                htmlFor="targetAudience"
                className="text-xs font-semibold text-foreground uppercase tracking-widest"
              >
                Target Audience
              </Label>
              <Textarea
                id="targetAudience"
                placeholder="e.g., Young professionals 25-35, environmentally conscious, tech-savvy"
                className="luxury-input min-h-24 resize-none rounded-lg"
                {...register('targetAudience')}
              />
              {errors.targetAudience && (
                <p className="text-sm text-destructive">{errors.targetAudience.message}</p>
              )}
            </div>

            {/* Campaign Goal */}
            <div className="space-y-3 animate-fade-in-up stagger-4 opacity-0">
              <Label
                htmlFor="campaignGoal"
                className="text-xs font-semibold text-foreground uppercase tracking-widest"
              >
                Campaign Goal
              </Label>
              <Select
                defaultValue="Lead Generation"
                onValueChange={(value) =>
                  setValue('campaignGoal', value, { shouldDirty: true, shouldValidate: true })
                }
              >
                <SelectTrigger id="campaignGoal" className="luxury-input h-12 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Brand Awareness">Brand Awareness</SelectItem>
                  <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                  <SelectItem value="Sales Conversion">Sales Conversion</SelectItem>
                  <SelectItem value="Product Launch">Product Launch</SelectItem>
                  <SelectItem value="Engagement">Engagement</SelectItem>
                </SelectContent>
              </Select>
              {errors.campaignGoal && (
                <p className="text-sm text-destructive">{errors.campaignGoal.message}</p>
              )}
            </div>

            {/* Tone & Style */}
            <div className="space-y-4 animate-fade-in-up stagger-5 opacity-0">
              <Label className="text-xs font-semibold text-foreground uppercase tracking-widest">
                Tone & Style
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TONES.map((tone, idx) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => handleToneToggle(tone)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 text-sm overflow-hidden relative ${
                      tones?.includes(tone)
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-105'
                        : 'bg-secondary/40 text-foreground border border-border/50 hover:bg-secondary/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10'
                    }`}
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Desired Length */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-foreground uppercase tracking-widest">
                  Desired Length
                </Label>
                <span className="text-sm text-primary font-semibold tracking-wide">
                  {desiredLengthLabel}
                </span>
              </div>
              <Slider
                value={[desiredLength]}
                onValueChange={(value) =>
                  setValue('desiredLength', value[0], {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                min={33}
                max={100}
                step={33}
                className="w-full accent-primary"
              />
            </div>

            {/* Brand Colors */}
            <div className="space-y-3">
              <Label
                htmlFor="brandColors"
                className="text-xs font-semibold text-foreground uppercase tracking-widest"
              >
                Brand Colors (Optional)
              </Label>
              <Input
                id="brandColors"
                type="text"
                placeholder="#d4af37, #1a1a1a"
                className="luxury-input h-12 rounded-lg"
                {...register('brandColors')}
              />
            </div>

            {/* Custom Prompt */}
            <div className="space-y-3">
              <Label
                htmlFor="customPrompt"
                className="text-xs font-semibold text-foreground uppercase tracking-widest"
              >
                Custom General Instructions (optional)
              </Label>
              <Textarea
                id="customPrompt"
                placeholder="e.g., Make everything more humorous and targeted at Gen Z gamers..."
                className="luxury-input min-h-24 resize-none rounded-lg"
                {...register('customPrompt')}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="luxury-button w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3.5 text-base rounded-lg shadow-xl hover:shadow-2xl hover:shadow-primary/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Generating Campaign Kit...
                </span>
              ) : (
                'Generate Campaign Kit'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
