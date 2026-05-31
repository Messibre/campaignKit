# Campaign Kit AI

Campaign Kit AI is a Next.js app that generates complete marketing campaign kits from a short product brief. It creates landing page copy, hero variants, email content, social posts, image prompts, and exportable campaign assets using Google Gemini and a staged prompt workflow.

## Table of contents

- [Features](#features)
- [Architecture overview](#architecture-overview)
- [Tech stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Notes](#notes)
- [Project structure](#project-structure)
- [License](#license)
- [Contributing](#contributing)

## Features

- Staged generation flow for fast landing page feedback followed by collateral generation.
- Form-driven campaign brief with tone, audience, goal, brand colors, and custom prompt support.
- Preview sections for landing page copy, hero variants, emails, social posts, taglines, and image prompts.
- Export generated assets as a ZIP bundle.
- Built-in mock fallback data for demo mode and API failure recovery.
- Multi-key and multi-model Gemini fallback support.

## Architecture overview

### Frontend

- `app/page.tsx`
  - Main client page that manages form state, API calls, example selection, and progress feedback.

- `components/campaign-form.tsx`
  - Form UI built with `react-hook-form` and validated with `zod`.
  - Accepts campaign inputs including product name, description, audience, campaign goal, tones, and prompt length.

- `components/results-preview.tsx`
  - Displays campaign output and HTML previews.
  - Supports ZIP export via `jszip` and `file-saver`.

- `components/ui/`
  - Reusable design system components for inputs, buttons, tabs, sliders, selects, and feedback.
  - Uses Tailwind CSS and Radix UI primitives.

### Backend / API

- `app/api/generate/route.ts`
  - Receives POST requests to generate campaign output.
  - Uses `@ai-sdk/google` and `ai` to call Gemini with structured prompt schemas.
  - Splits generation into two stages:
    - `stage1`: landing page, hero variants, taglines, trust items, FAQ, design tokens, and metadata.
    - `stage2`: emails, social posts, and image prompts.
  - Validates AI output using Zod and falls back to mock data when needed.

### Shared types and utilities

- `lib/campaign-types.ts`
  - Defines strict TypeScript types for campaign responses.
  - Includes `mockCampaign` fallback content used by the API and demo mode.

- `lib/utils.ts`
  - Provides the `cn` helper for class name composition with `clsx` and `tailwind-merge`.

## Key concepts

- **Stage-based generation**
  - Separates landing page generation from collateral generation to improve feedback speed and maintain output quality.

- **Prompt schema enforcement**
  - Uses structured prompt schemas and Zod validation to encourage reliable AI output.

- **Resilience and fallback**
  - Attempts multiple Gemini models and keys.
  - Returns mock data with `X-Mock-Data: true` when real generation is unavailable.
  - Handles rate limits and authentication issues gracefully.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives
- `react-hook-form`, `zod`, `@hookform/resolvers`
- `@ai-sdk/google` and `ai`
- `jszip` + `file-saver`
- `sonner`

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment variables

Create or update `.env.local`:

```env
GEMINI_API_KEY1=your-key-1
GEMINI_API_KEY2=your-key-2
GEMINI_API_KEY3=your-key-3
GEMINI_MODEL=gemini-2.5-flash
GEMINI_FALLBACK_MODELS=gemini-2.5-flash-lite,gemma-3-12b,gemma-3-1b,gemma-3-27b,gemma-3-2b,gemma-3-4b
CAMPAIGN_ADDITIONAL_PROMPT=
```

- `GEMINI_API_KEY1..3`: optional multiple keys for fallback.
- `GEMINI_MODEL`: preferred model name.
- `GEMINI_FALLBACK_MODELS`: comma-separated fallback models.
- `CAMPAIGN_ADDITIONAL_PROMPT`: optional global prompt enhancements.

3. Run the app

```bash
npm run dev
```

## Usage

- Open the app in your browser at `http://localhost:3000`.
- Enter your product and campaign details.
- Submit the form to generate the landing page first.
- Wait for supporting emails, social posts, and image prompts to appear.
- Export the campaign kit as a ZIP bundle.

## Notes

- Demo mode is enabled automatically when Gemini API keys are not configured.
- Stage 1 output is shown quickly for immediate feedback.
- Stage 2 loads after stage 1 to generate supporting collateral in a second pass.
- `next.config.mjs` currently enables unoptimized images and ignores TypeScript build errors for local prototyping.

## Project structure

- `app/` — Next.js app router pages and API routes.
- `components/` — Page-level UI components and feature-specific components.
- `components/ui/` — Reusable UI primitives.
- `lib/` — Shared types, mock data, and helpers.
- `public/` — Static assets and example campaign outputs.
- `styles/` — Tailwind CSS and global styling.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome. Open an issue for bugs, feature requests, or roadmap discussions, and submit pull requests for improvements.
