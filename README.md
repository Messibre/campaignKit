# Campaign Kit AI

Generate a complete marketing campaign kit (landing page, emails, social posts) from a short product brief.

## Setup

1. Install dependencies
```
npm install
```

2. Configure environment variables

Create or update `.env.local`:
```
GEMINI_API_KEY1=your-key-1
GEMINI_API_KEY2=your-key-2
GEMINI_API_KEY3=your-key-3
GEMINI_MODEL=gemini-2.5-flash
GEMINI_FALLBACK_MODELS=gemini-2.5-flash-lite,gemma-3-12b,gemma-3-1b,gemma-3-27b,gemma-3-2b,gemma-3-4b
CAMPAIGN_ADDITIONAL_PROMPT=
```

3. Run the app
```
npm run dev
```

## Notes
- Stage 1 generates landing page + taglines first, then stage 2 appends emails + social + image prompts.
- If the model rate limit is hit, the UI shows a friendly message and keeps any results already generated.
