export interface LandingPageContent {
  title: string
  hero: string
  features: string[]
  cta: string
  htmlPreview: string
}

export interface CampaignEmail {
  subject: string
  preview: string
  body: string
}

export type SocialPlatform = 'Twitter' | 'Instagram' | 'LinkedIn'

export interface SocialPost {
  platform: SocialPlatform
  text: string
  hashtags: string[]
}

export interface CampaignResponse {
  landingPage?: LandingPageContent
  emails?: CampaignEmail[]
  socialPosts?: SocialPost[]
  taglines?: string[]
  imagePrompts?: string[]
}

export const mockCampaign: CampaignResponse = {
  landingPage: {
    title: 'Introducing EcoFlow Water Bottle',
    hero: 'Stay hydrated while saving the planet with EcoFlow — a premium reusable bottle crafted from recycled ocean plastic.',
    features: [
      'Made from 100% recycled ocean-bound plastic',
      'Keeps drinks cold for 24 hours and hot for 12 hours',
      'Minimal, modern design for everyday carry',
      'Every purchase funds ocean cleanup initiatives',
    ],
    cta: 'Start your sustainable hydration habit today',
    htmlPreview: `
<main class="min-h-screen bg-slate-950 text-slate-50 font-sans">
  <section class="max-w-5xl mx-auto px-6 py-16">
    <header class="mb-10">
      <p class="text-sm uppercase tracking-[0.2em] text-emerald-300/80 mb-3">Eco-Friendly Launch</p>
      <h1 class="text-4xl md:text-5xl font-semibold mb-4">Introducing EcoFlow Water Bottle</h1>
      <p class="text-slate-300 max-w-2xl">
        Stay hydrated while saving the planet with EcoFlow — a premium reusable bottle crafted from recycled ocean plastic.
      </p>
    </header>
    <div class="grid md:grid-cols-[2fr,1.5fr] gap-10 items-start">
      <div class="space-y-6">
        <ul class="space-y-3">
          <li class="flex gap-3">
            <span class="mt-1 h-5 w-5 rounded-full bg-emerald-400/10 border border-emerald-400/60 flex items-center justify-center text-xs">✓</span>
            <span>Made from 100% recycled ocean-bound plastic</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 h-5 w-5 rounded-full bg-emerald-400/10 border border-emerald-400/60 flex items-center justify-center text-xs">✓</span>
            <span>Keeps drinks cold for 24 hours and hot for 12 hours</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 h-5 w-5 rounded-full bg-emerald-400/10 border border-emerald-400/60 flex items-center justify-center text-xs">✓</span>
            <span>Minimal, modern design for everyday carry</span>
          </li>
          <li class="flex gap-3">
            <span class="mt-1 h-5 w-5 rounded-full bg-emerald-400/10 border border-emerald-400/60 flex items-center justify-center text-xs">✓</span>
            <span>Every purchase funds ocean cleanup initiatives</span>
          </li>
        </ul>
      </div>
      <aside class="bg-slate-900/60 border border-slate-700/60 rounded-2xl p-6 space-y-4">
        <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Special Launch Offer</p>
        <p class="text-2xl font-semibold">Start your sustainable hydration habit today</p>
        <p class="text-slate-300 text-sm">
          Join thousands of eco-conscious professionals who have upgraded their daily carry with EcoFlow.
        </p>
        <button class="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-400 text-slate-950 text-sm font-semibold px-6 py-2">
          Shop EcoFlow
        </button>
      </aside>
    </div>
  </section>
</main>`.trim(),
  },
  emails: [
    {
      subject: 'Your New Favorite Bottle (and the Ocean’s Too) 🌊',
      preview: 'Meet EcoFlow — a premium, ocean-friendly bottle for modern professionals.',
      body: [
        'Hi there,',
        '',
        'Meet EcoFlow, the reusable bottle designed for people who care about performance and the planet.',
        '',
        'Every EcoFlow is crafted from recycled ocean-bound plastic, keeps drinks cold for 24 hours, and supports real cleanup initiatives.',
        '',
        'Make the switch once, and feel good about every refill.',
        '',
        '→ Discover EcoFlow today and start your sustainable hydration habit.',
        '',
        'Best,',
        'The EcoFlow Team',
      ].join('\n'),
    },
  ],
  socialPosts: [
    {
      platform: 'Twitter',
      text: 'Your daily coffee deserves better than single-use cups. ☕🌊\n\nEcoFlow is the premium reusable bottle made from recycled ocean plastic — built for modern, eco-conscious professionals.\n\nMake every sip part of the solution.',
      hashtags: ['#EcoFlow', '#SustainableLiving', '#OceanFriendly'],
    },
    {
      platform: 'Instagram',
      text: 'Minimal design. Maximum impact.\n\nEcoFlow turns ocean-bound plastic into a daily essential you’re proud to carry.\n\nReady to upgrade your hydration ritual?',
      hashtags: ['#EcoFlowBottle', '#PlasticFree', '#EcoChic', '#SustainableStyle'],
    },
    {
      platform: 'LinkedIn',
      text: 'Sustainability isn’t a campaign — it’s a commitment.\n\nEcoFlow helps modern teams reduce single-use waste with a premium, branded bottle made from recycled ocean plastic.\n\nOutfit your team with a product that reflects your values.',
      hashtags: ['#ESG', '#Sustainability', '#BrandImpact'],
    },
  ],
  taglines: [
    'Hydration that cleans the ocean.',
    'Carry less waste, create more impact.',
    'Designed for your desk, built for the planet.',
  ],
  imagePrompts: [
    'Hyper-realistic product shot of a sleek, matte black reusable bottle on a reflective dark stone surface, soft spotlight, subtle ocean waves texture in the background, premium lifestyle branding, cinematic lighting.',
    'Top-down flat lay of a minimalist work desk with a laptop, notebook, and an elegant reusable bottle made from recycled plastic, neutral color palette, soft natural light, eco-conscious aesthetic.',
  ],
}

