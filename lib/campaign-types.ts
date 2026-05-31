export interface HeroVariant {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  heroImagePrompt?: string;
  heroImageAlt?: string;
}

export interface FeatureItem {
  type: "lead" | "metric" | "detail";
  heading: string;
  body: string;
  metric?: string | null;
  iconPrompt?: string | null;
}

export interface LandingPageContent {
  title: string;
  hero: string;
  features: FeatureItem[];
  cta: string;
  htmlPreview: string;
}

export interface CampaignEmail {
  subject: string;
  preview: string;
  body: string;
}

export type SocialPlatform = "Twitter" | "Instagram" | "LinkedIn";

export interface SocialPost {
  platform: SocialPlatform;
  text: string;
  hashtags: string[];
}

export interface TrustItem {
  type: "logo" | "testimonial" | "stat";
  text: string;
  source?: string | null;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface DesignTokens {
  primaryColor: string;
  accentColor?: string;
  headerFont?: string;
  bodyFont?: string;
  spacingScale?: string;
}

export interface MetaTags {
  titleTag?: string;
  description?: string;
}

export interface CampaignResponse {
  heroVariants?: HeroVariant[];
  landingPage?: LandingPageContent;
  trust?: TrustItem[];
  faq?: FAQItem[];
  designTokens?: DesignTokens;
  meta?: MetaTags;
  emails?: CampaignEmail[];
  socialPosts?: SocialPost[];
  taglines?: string[];
  imagePrompts?: string[];
}

export const mockCampaign: CampaignResponse = {
  heroVariants: [
    {
      title: "Introducing EcoFlow Water Bottle",
      subtitle:
        "Stay hydrated while saving the planet with EcoFlow — a premium reusable bottle crafted from recycled ocean plastic.",
      ctaPrimary: "Shop EcoFlow",
      ctaSecondary: "Learn More",
      heroImagePrompt:
        "Cinematic product shot of a sleek, matte black reusable bottle on a reflective dark stone surface, soft spotlight, subtle ocean waves texture in the background, premium lifestyle branding, cinematic lighting.",
      heroImageAlt:
        "EcoFlow black bottle on dark reflective stone with soft spotlight",
    },
    {
      title: "Minimal design. Maximum impact.",
      subtitle:
        "EcoFlow turns ocean-bound plastic into a daily essential you’re proud to carry.",
      ctaPrimary: "Discover EcoFlow",
      ctaSecondary: "See Specs",
      heroImagePrompt:
        "Top-down flat lay of a minimalist work desk with a laptop, notebook, and an elegant reusable bottle made from recycled plastic, neutral color palette, soft natural light, eco-conscious aesthetic.",
      heroImageAlt: "Flat lay of desk with EcoFlow bottle and laptop",
    },
  ],
  landingPage: {
    title: "Introducing EcoFlow Water Bottle",
    hero: "Stay hydrated while saving the planet with EcoFlow — a premium reusable bottle crafted from recycled ocean plastic.",
    features: [
      {
        type: "detail",
        heading: "Sustainably Sourced Materials",
        body: "Made from 100% recycled ocean-bound plastic, responsibly sourced and rigorously tested for durability.",
        metric: null,
        iconPrompt:
          "Flat icon of a leaf and circular arrows in brand accent color",
      },
      {
        type: "metric",
        heading: "Performance",
        body: "Keeps drinks cold for 24 hours and hot for 12 hours with superior insulation.",
        metric: "24h cold / 12h hot",
        iconPrompt: "Flat thermometer icon with cool/warm gradient",
      },
      {
        type: "detail",
        heading: "Every Purchase Gives Back",
        body: "A portion of proceeds funds ocean cleanup initiatives, turning purchases into impact.",
        metric: null,
        iconPrompt: "Small heart + wave logo, minimal line art",
      },
    ],
    cta: "Start your sustainable hydration habit today",
    htmlPreview: `
<section class="max-w-5xl mx-auto px-6 py-16">
  <header class="mb-10">
    <p class="text-sm uppercase tracking-[0.2em] text-emerald-300/80 mb-3">Eco-Friendly Launch</p>
    <h1 class="text-4xl md:text-5xl font-semibold mb-4">Introducing EcoFlow Water Bottle</h1>
    <p class="text-slate-600 max-w-2xl">Stay hydrated while saving the planet with EcoFlow — a premium reusable bottle crafted from recycled ocean plastic.</p>
  </header>
  <div class="grid md:grid-cols-[2fr,1.5fr] gap-10 items-start">
    <div class="space-y-6">
      <ul class="space-y-3">
        <li class="flex gap-3"><span class="mt-1 h-5 w-5 rounded-full bg-emerald-400/10 border border-emerald-400/60 flex items-center justify-center text-xs">✓</span><span>Made from 100% recycled ocean-bound plastic</span></li>
        <li class="flex gap-3"><span class="mt-1 h-5 w-5 rounded-full bg-emerald-400/10 border border-emerald-400/60 flex items-center justify-center text-xs">✓</span><span>Keeps drinks cold for 24 hours and hot for 12 hours</span></li>
        <li class="flex gap-3"><span class="mt-1 h-5 w-5 rounded-full bg-emerald-400/10 border border-emerald-400/60 flex items-center justify-center text-xs">✓</span><span>Minimal, modern design for everyday carry</span></li>
      </ul>
    </div>
    <aside class="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-500">Special Launch Offer</p>
      <p class="text-2xl font-semibold">Start your sustainable hydration habit today</p>
      <p class="text-slate-600 text-sm">Join thousands of eco-conscious professionals who have upgraded their daily carry with EcoFlow.</p>
      <button class="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-400 text-white text-sm font-semibold px-6 py-2">Shop EcoFlow</button>
    </aside>
  </div>
</section>
`.trim(),
  },
  emails: [
    {
      subject: "Your New Favorite Bottle (and the Ocean’s Too) 🌊",
      preview:
        "Meet EcoFlow — a premium, ocean-friendly bottle for modern professionals.",
      body: [
        "Hi there,",
        "",
        "Meet EcoFlow, the reusable bottle designed for people who care about performance and the planet.",
        "",
        "Every EcoFlow is crafted from recycled ocean-bound plastic, keeps drinks cold for 24 hours, and supports real cleanup initiatives.",
        "",
        "Make the switch once, and feel good about every refill.",
        "",
        "→ Discover EcoFlow today and start your sustainable hydration habit.",
        "",
        "Best,",
        "The EcoFlow Team",
      ].join("\n"),
    },
  ],
  socialPosts: [
    {
      platform: "Twitter",
      text: "Your daily coffee deserves better than single-use cups. ☕🌊\n\nEcoFlow is the premium reusable bottle made from recycled ocean plastic — built for modern, eco-conscious professionals.\n\nMake every sip part of the solution.",
      hashtags: ["#EcoFlow", "#SustainableLiving", "#OceanFriendly"],
    },
    {
      platform: "Instagram",
      text: "Minimal design. Maximum impact.\n\nEcoFlow turns ocean-bound plastic into a daily essential you’re proud to carry.\n\nReady to upgrade your hydration ritual?",
      hashtags: [
        "#EcoFlowBottle",
        "#PlasticFree",
        "#EcoChic",
        "#SustainableStyle",
      ],
    },
    {
      platform: "LinkedIn",
      text: "Sustainability isn’t a campaign — it’s a commitment.\n\nEcoFlow helps modern teams reduce single-use waste with a premium, branded bottle made from recycled ocean plastic.\n\nOutfit your team with a product that reflects your values.",
      hashtags: ["#ESG", "#Sustainability", "#BrandImpact"],
    },
  ],
  taglines: [
    "Hydration that cleans the ocean.",
    "Carry less waste, create more impact.",
    "Designed for your desk, built for the planet.",
  ],
  imagePrompts: [
    "Hyper-realistic product shot of a sleek, matte black reusable bottle on a reflective dark stone surface, soft spotlight, subtle ocean waves texture in the background, premium lifestyle branding, cinematic lighting.",
    "Top-down flat lay of a minimalist work desk with a laptop, notebook, and an elegant reusable bottle made from recycled plastic, neutral color palette, soft natural light, eco-conscious aesthetic.",
  ],
  trust: [
    { type: "stat", text: "Rated 4.8/5 by 3,200+ customers", source: null },
    {
      type: "testimonial",
      text: '"A premium bottle that actually lasts."',
      source: "Jordan P., Product Manager",
    },
  ],
  faq: [
    {
      q: "Is this bottle dishwasher safe?",
      a: "Yes — EcoFlow is top-rack dishwasher safe. We recommend hand-washing the lid for longevity.",
    },
    {
      q: "What is the warranty?",
      a: "We offer a 2-year limited warranty covering manufacturing defects.",
    },
  ],
  designTokens: {
    primaryColor: "#0f172a",
    accentColor: "#10b981",
    headerFont: "Playfair Display",
    bodyFont: "Inter",
    spacingScale: "normal",
  },
  meta: {
    titleTag: "EcoFlow — Premium Reusable Bottle Made from Ocean Plastic",
    description:
      "EcoFlow is a high-performance reusable bottle made from recycled ocean-bound plastic. Keeps drinks cold for 24h and supports ocean cleanup initiatives.",
  },
};
