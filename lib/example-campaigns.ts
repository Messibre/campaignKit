import type { CampaignFormValues } from "@/components/campaign-form";
import type { CampaignResponse } from "@/lib/campaign-types";

export interface ExampleCampaign {
  id: string;
  label: string;
  formValues: CampaignFormValues;
  campaign: CampaignResponse;
}

export const exampleCampaigns: ExampleCampaign[] = [
  {
    id: "v0-ai",
    label: "V0 AI",
    formValues: {
      productName: "V0 AI",
      productDescription:
        "Generative AI platform created by Vercel that acts as an AI agent for web development, helping teams build cool web applications and UIs.",
      targetAudience: "Vibe coders, software developers, product owners",
      campaignGoal: "Engagement",
      tones: ["Inspirational"],
      desiredLength: 33,
      brandColors: "Black",
      customPrompt: "",
    },
    campaign: {
      landingPage: {
        title: "V0 AI: The Future of Web Development, Powered by Vercel",
        hero: "Transform your web development workflow. V0 AI, Vercel's generative AI agent, empowers developers and product owners to effortlessly build stunning web applications and UIs with unprecedented speed and creativity.",
        features: [
          {
            type: "detail",
            heading: "Instant UI Generation",
            body: "Describe your vision, and V0 AI crafts beautiful, functional UI components and full-page layouts in seconds.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Accelerated Development Cycles",
            body: "Drastically cut down development time, allowing you to iterate faster and bring innovative products to market quicker.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Seamless Vercel Integration",
            body: "Build, deploy, and scale your AI-generated applications with the robust, developer-friendly infrastructure of Vercel.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Intelligent Code & Design",
            body: "Get smart, context-aware code suggestions and design optimizations that elevate your project’s quality and performance.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Empower Your Team",
            body: "Foster a collaborative environment where ideas turn into interactive prototypes and production-ready code with AI assistance.",
            metric: null,
            iconPrompt: null,
          },
        ],
        cta: "Start Building with V0 AI",
        htmlPreview: `
<div style="font-family:'Inter', sans-serif; background-color:#000; color:#fff; padding:40px; text-align:center; border-radius:10px; max-width:800px; margin:auto;"><h1 style="font-size:3em; margin-bottom:20px; line-height:1.2;">V0 AI: The Future of Web Development, Powered by Vercel</h1><p style="font-size:1.2em; margin-bottom:40px; opacity:0.9;">Transform your web development workflow. V0 AI, Vercel's generative AI agent, empowers developers and product owners to effortlessly build stunning web applications and UIs with unprecedented speed and creativity.</p><div style="display:flex; flex-wrap:wrap; justify-content:center; gap:20px; margin-bottom:40px;"><div style="background-color:#1a1a1a; padding:25px; border-radius:8px; flex:1; min-width:280px; text-align:left;"><h3 style="font-size:1.4em; margin-bottom:10px; color:#0070f3;">Instant UI Generation</h3><p style="font-size:1em; opacity:0.8;">Describe your vision, and V0 AI crafts beautiful, functional UI components and full-page layouts in seconds.</p></div><div style="background-color:#1a1a1a; padding:25px; border-radius:8px; flex:1; min-width:280px; text-align:left;"><h3 style="font-size:1.4em; margin-bottom:10px; color:#0070f3;">Accelerated Development Cycles</h3><p style="font-size:1em; opacity:0.8;">Drastically cut down development time, allowing you to iterate faster and bring innovative products to market quicker.</p></div><div style="background-color:#1a1a1a; padding:25px; border-radius:8px; flex:1; min-width:280px; text-align:left;"><h3 style="font-size:1.4em; margin-bottom:10px; color:#0070f3;">Seamless Vercel Integration</h3><p style="font-size:1em; opacity:0.8;">Build, deploy, and scale your AI-generated applications with the robust, developer-friendly infrastructure of Vercel.</p></div><div style="background-color:#1a1a1a; padding:25px; border-radius:8px; flex:1; min-width:280px; text-align:left;"><h3 style="font-size:1.4em; margin-bottom:10px; color:#0070f3;">Intelligent Code & Design</h3><p style="font-size:1em; opacity:0.8;">Get smart, context-aware code suggestions and design optimizations that elevate your project's quality and performance.</p></div><div style="background-color:#1a1a1a; padding:25px; border-radius:8px; flex:1; min-width:280px; text-align:left;"><h3 style="font-size:1.4em; margin-bottom:10px; color:#0070f3;">Empower Your Team</h3><p style="font-size:1em; opacity:0.8;">Foster a collaborative environment where ideas turn into interactive prototypes and production-ready code with AI assistance.</p></div></div><a href="#" style="background-color:#0070f3; color:#fff; padding:15px 30px; border-radius:5px; text-decoration:none; font-size:1.2em; font-weight:bold; display:inline-block; transition:background-color 0.3s ease;">Start Building with V0 AI</a></div>
        `.trim(),
      },
      taglines: [
        "V0 AI: Build Beyond Limits.",
        "V0 AI: Your Vision, Accelerated.",
        "V0 AI: Intelligent Web Creation, Simplified.",
        "V0 AI: Code the Future, Today.",
        "V0 AI: Crafting Web Excellence with AI.",
      ],
      emails: [
        {
          subject: "Unlock Next-Gen Web Development with V0 AI by Vercel",
          preview:
            "Discover how V0 AI empowers you to build stunning web applications and UIs faster than ever.",
          body: [
            "Dear Developer,",
            "Are you ready to redefine your web development workflow? Introducing V0 AI by Vercel, your new generative AI agent designed to accelerate the creation of cool web applications and UIs.",
            "V0 AI seamlessly integrates into your development process, transforming ideas into functional, beautiful interfaces with unprecedented speed and precision. Imagine building complex UIs effortlessly, allowing you to focus on innovation and user experience.",
            "Join the forefront of web development. Experience the power of AI-driven creation and bring your most ambitious projects to life.",
            "Learn more and start building with V0 AI today.",
            "Sincerely,",
            "The Vercel Team",
          ].join("\n"),
        },
      ],
      socialPosts: [
        {
          platform: "Twitter",
          text: "🚀 Elevate your web development! V0 AI by Vercel is here to transform how you build cool web apps & UIs. Say goodbye to tedious coding, hello to generative AI power.",
          hashtags: ["#V0AI", "#Vercel", "#WebDev", "#AI", "#GenerativeAI"],
        },
        {
          platform: "Instagram",
          text: "Dreaming of building stunning web UIs faster? ✨ V0 AI by Vercel makes it a reality! Our generative AI agent empowers you to create incredible web applications with ease. Tap the link in bio to see the future of web development.",
          hashtags: [
            "#V0AI",
            "#Vercel",
            "#WebDevelopment",
            "#AICoding",
            "#UIUX",
            "#DeveloperLife",
          ],
        },
        {
          platform: "LinkedIn",
          text: "Product Owners, Software Developers, Vibe Coders: Meet V0 AI by Vercel. This generative AI agent is engineered to revolutionize web application and UI development, boosting productivity and fostering innovation. Leverage AI to build sophisticated, attractive web experiences with unparalleled efficiency. Discover how V0 AI can transform your team's output.",
          hashtags: [
            "#V0AI",
            "#Vercel",
            "#GenerativeAI",
            "#WebDevelopment",
            "#Productivity",
            "#Innovation",
            "#SoftwareDevelopment",
          ],
        },
      ],
      imagePrompts: [
        "A sleek, futuristic interface showing V0 AI generating complex web UI components in real-time, with Vercel's black branding prominent. The screen displays clean code and a beautiful, modern web application. Professional, inspirational, high-tech.",
        "A developer (diverse, modern aesthetic) looking inspired at a screen displaying V0 AI's generative capabilities, with abstract AI elements flowing into a perfectly rendered web UI. Dark, professional tones with subtle glowing accents.",
        "An abstract representation of AI and human collaboration in web development, featuring a stylized 'V0' logo. The background is a gradient of dark tones, emphasizing innovation and speed in UI creation. Clean lines, professional, inspiring.",
      ],
    },
  },
  {
    id: "campaign-kit",
    label: "CampaignKit Studio",
    formValues: {
      productName: "CampaignKit Studio",
      productDescription:
        "AI-powered web tool that generates complete marketing kits for any project or product, including landing page copy, emails, social posts, and taglines.",
      targetAudience: "Project builders, product owners",
      campaignGoal: "Product Launch",
      tones: ["Humorous"],
      desiredLength: 33,
      brandColors: "Golden and black",
      customPrompt: "",
    },
    campaign: {
      landingPage: {
        title: "CampaignKit Studio: Marketing Kits, Instantly.",
        hero: "CampaignKit Studio is your AI-powered sidekick, conjuring complete marketing kits for any project or product. Launch faster, laugh harder.",
        features: [
          {
            type: "detail",
            heading: "Landing Pages That Convert",
            body: "Compelling copy crafted to captivate and convert, no copywriting degree required.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Emails That Engage",
            body: "Craft persuasive emails that land in inboxes, not the digital abyss.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Social Posts That Pop",
            body: "Generate scroll-stopping content for all platforms to drive engagement.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Taglines That Stick",
            body: "Discover memorable, impactful taglines that define your brand with precision.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Complete Kits, Zero Hassle",
            body: "Everything you need – copy, emails, social, taglines – perfectly aligned and ready to deploy.",
            metric: null,
            iconPrompt: null,
          },
        ],
        cta: "Get Your Instant Marketing Kit!",
        htmlPreview: `
<div style="font-family: 'Arial', sans-serif; max-width: 960px; margin: 0 auto; padding: 20px; color: #333;"><header style="text-align: center; padding: 40px 0; background-color: #FFF8E1; border-bottom: 3px solid #FFD700;"><h1 style="font-size: 3em; color: #FFD700; margin-bottom: 10px;">CampaignKit Studio</h1><p style="font-size: 1.2em; color: #555;">Marketing Kits, Instantly.</p></header><section style="text-align: center; padding: 60px 20px; background-color: #FFFFFF;"><h2 style="font-size: 2.5em; color: #333; margin-bottom: 20px;">Tired of marketing feeling like a medieval quest?</h2><p style="font-size: 1.4em; line-height: 1.6; color: #666;">CampaignKit Studio is your AI-powered sidekick, conjuring complete marketing kits for any project or product. Launch faster, laugh harder.</p><button style="background-color: #FFD700; color: #333; padding: 15px 30px; border: none; border-radius: 5px; font-size: 1.2em; cursor: pointer; margin-top: 40px; transition: background-color 0.3s ease;">Get Your Instant Marketing Kit!</button></section><section style="padding: 60px 20px; background-color: #F9F9F9;"><h3 style="font-size: 2em; text-align: center; color: #333; margin-bottom: 40px;">What You Get (Without the Sweat)</h3><div style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 30px;"><div style="flex: 1 1 45%; min-width: 300px; background-color: #FFFFFF; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 5px solid #FFD700;"><h4 style="font-size: 1.5em; color: #FFD700; margin-bottom: 15px;">Landing Pages That Convert</h4><p style="color: #666;">Compelling copy crafted to captivate and convert, no copywriting degree required.</p></div><div style="flex: 1 1 45%; min-width: 300px; background-color: #FFFFFF; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 5px solid #FFD700;"><h4 style="font-size: 1.5em; color: #FFD700; margin-bottom: 15px;">Emails That Engage</h4><p style="color: #666;">Craft persuasive emails that land in inboxes, not the digital abyss. Watch your open rates soar.</p></div><div style="flex: 1 1 45%; min-width: 300px; background-color: #FFFFFF; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 5px solid #FFD700;"><h4 style="font-size: 1.5em; color: #FFD700; margin-bottom: 15px;">Social Posts That Pop</h4><p style="color: #666;">Generate scroll-stopping content for all platforms. Get ready for engagement.</p></div><div style="flex: 1 1 45%; min-width: 300px; background-color: #FFFFFF; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 5px solid #FFD700;"><h4 style="font-size: 1.5em; color: #FFD700; margin-bottom: 15px;">Taglines That Stick</h4><p style="color: #666;">Discover memorable, impactful taglines that define your brand with precision.</p></div><div style="flex: 1 1 95%; min-width: 300px; background-color: #FFFFFF; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-left: 5px solid #FFD700;"><h4 style="font-size: 1.5em; color: #FFD700; margin-bottom: 15px;">Complete Kits, Zero Hassle</h4><p style="color: #666;">Everything you need – copy, emails, social, taglines – perfectly aligned and ready to deploy. Your golden ticket to launch success.</p></div></div></section><footer style="text-align: center; padding: 40px 20px; background-color: #FFF8E1; border-top: 3px solid #FFD700; margin-top: 40px;"><p style="color: #555; font-size: 0.9em;">&copy; 2023 CampaignKit Studio. All rights reserved.</p></footer></div>
        `.trim(),
      },
      taglines: [
        "CampaignKit Studio: Marketing, Made Hilariously Easy.",
        "Launch Smarter, Not Harder. Your AI Marketing Genie.",
        "Instant Marketing Kits. Seriously, It's That Fast.",
        "From Zero to Launch Hero: CampaignKit Studio.",
        "Marketing Magic, No Wands Required.",
      ],
      emails: [
        {
          subject: "Your Marketing Just Got a Golden Ticket (and an AI Brain!)",
          preview:
            "Tired of marketing headaches? CampaignKit Studio is here to save your sanity.",
          body: [
            "Hey there, fellow builder! Ever felt like marketing your brilliant project was a bigger project than the project itself? We get it. The endless emails, social posts, taglines... it's enough to make anyone want to hide under a pile of code.",
            "",
            'Good news! CampaignKit Studio is officially launching, and it\'s like having a marketing genius (who also happens to be a stand-up comedian) on your team. Our AI-powered web tool whips up complete marketing kits – landing page copy, emails, social posts, and taglines – faster than you can say "ROI."',
            "",
            "Stop wrestling with words and start building. Let CampaignKit Studio handle the heavy lifting, so you can focus on what you do best. Your marketing just got a whole lot easier, and dare we say, a little more golden.",
            "",
            "Ready to ditch the marketing stress? Check out CampaignKit Studio today!",
          ].join("\n"),
        },
      ],
      socialPosts: [
        {
          platform: "Twitter",
          text: "Launching a product? Drowning in marketing tasks? 😩 CampaignKit Studio is your AI-powered lifesaver! Get complete marketing kits (emails, social, landing page copy) in a flash. Say goodbye to writer's block, hello to golden results!",
          hashtags: [
            "#CampaignKitStudio",
            "#AImarketing",
            "#ProductLaunch",
            "#ProjectBuilders",
            "#ProductOwners",
          ],
        },
        {
          platform: "Instagram",
          text: "Product owners and project builders, listen up! 🚀 Your marketing just got a major upgrade. Introducing CampaignKit Studio: the AI tool that generates entire marketing kits for you. From catchy emails to scroll-stopping social posts, we've got your back. Spend less time writing, more time building. Tap the link in bio to get your golden ticket to effortless marketing! ✨",
          hashtags: [
            "#CampaignKitStudio",
            "#AItools",
            "#MarketingAutomation",
            "#ProductLaunch",
            "#StartupLife",
            "#Innovation",
            "#GoldenOpportunity",
          ],
        },
        {
          platform: "LinkedIn",
          text: "For every project builder and product owner, the launch phase can be exhilarating yet daunting, especially when it comes to crafting compelling marketing content. We're thrilled to announce the launch of CampaignKit Studio, an AI-powered web tool designed to streamline this process.\n\nCampaignKit Studio generates complete marketing kits, including landing page copy, email sequences, social media posts, and taglines, allowing you to focus on core development and strategy. Elevate your product launch with precision and efficiency. Discover how CampaignKit Studio can transform your marketing efforts.",
          hashtags: [
            "#CampaignKitStudio",
            "#ProductLaunch",
            "#AIforBusiness",
            "#MarketingStrategy",
            "#Innovation",
            "#ProjectManagement",
            "#ProductDevelopment",
          ],
        },
      ],
      imagePrompts: [
        "A humorous illustration of a stressed project builder tangled in wires and papers, suddenly illuminated by a golden, glowing AI robot presenting a perfectly organized marketing kit on a tablet.",
        "A sleek, minimalist golden interface of CampaignKit Studio, with various marketing content types (email, social post icons) appearing instantly as if by magic, against a backdrop of a smiling product owner.",
        "An abstract representation of AI intelligence, depicted as a golden brain or circuit board, effortlessly generating diverse marketing content elements (text snippets, social media logos) flowing into a cohesive kit.",
      ],
    },
  },
  {
    id: "selam-gpt",
    label: "Selam GPT",
    formValues: {
      productName: "Selam GPT",
      productDescription:
        "Modern AI capabilities to Ethiopian languages enabling new ways to interact and create with different features.",
      targetAudience: "Content creators and software developers",
      campaignGoal: "Engagement",
      tones: ["Professional"],
      desiredLength: 33,
      brandColors: "Black and tomato",
      customPrompt: "",
    },
    campaign: {
      landingPage: {
        title: "Selam GPT: Ethiopian AI, Reimagined.",
        hero: "Unlock the Future of Ethiopian Languages with Selam GPT: Where AI Speaks Your World. Create, innovate, and connect like never before.",
        features: [
          {
            type: "detail",
            heading: "Multilingual Support",
            body: "Seamless AI interaction in Amharic, Oromo, Tigrinya, and more.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Versatile Content Generation",
            body: "Generate captivating content, translate with precision, and innovate faster.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Easy Integration",
            body: "Integrate powerful Ethiopian language models into your applications with ease.",
            metric: null,
            iconPrompt: null,
          },
          {
            type: "detail",
            heading: "Culturally Aware Outputs",
            body: "From witty proverbs to complex code, Selam GPT gets it.",
            metric: null,
            iconPrompt: null,
          },
        ],
        cta: "Explore Selam GPT Today!",
        htmlPreview: `
<div style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 40px auto; padding: 30px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);">  <h1 style="color: #000000; text-align: center; font-size: 2.8em; margin-bottom: 20px; line-height: 1.2;">Selam GPT: <span style="color: tomato;">Ethiopian AI, Reimagined.</span></h1>  <p style="color: #333333; text-align: center; font-size: 1.4em; margin-bottom: 40px; line-height: 1.6;">Unlock the Future of Ethiopian Languages with Selam GPT: Where AI Speaks Your World. Create, innovate, and connect like never before.</p>  <ul style="list-style: none; padding: 0; margin-bottom: 50px;">    <li style="background-color: #f9f9f9; padding: 20px; margin-bottom: 15px; border-left: 5px solid tomato; border-radius: 8px; font-size: 1.1em; color: #444444; display: flex; align-items: center;">      <span style="font-size: 1.5em; margin-right: 15px; color: tomato;">✨</span> Seamless AI interaction in Amharic, Oromo, Tigrinya, and more.    </li>    <li style="background-color: #f9f9f9; padding: 20px; margin-bottom: 15px; border-left: 5px solid tomato; border-radius: 8px; font-size: 1.1em; color: #444444; display: flex; align-items: center;">      <span style="font-size: 1.5em; margin-right: 15px; color: tomato;">✍️</span> Generate captivating content, translate with precision, and innovate faster.    </li>    <li style="background-color: #f9f9f9; padding: 20px; margin-bottom: 15px; border-left: 5px solid tomato; border-radius: 8px; font-size: 1.1em; color: #444444; display: flex; align-items: center;">      <span style="font-size: 1.5em; margin-right: 15px; color: tomato;">💻</span> Integrate powerful Ethiopian language models into your applications with ease.    </li>    <li style="background-color: #f9f9f9; padding: 20px; border-left: 5px solid tomato; border-radius: 8px; font-size: 1.1em; color: #444444; display: flex; align-items: center;">      <span style="font-size: 1.5em; margin-right: 15px; color: tomato;">😂</span> From witty proverbs to complex code, Selam GPT gets it. Seriously, it's smart.    </li>  </ul>  <div style="text-align: center;">    <a href="#" style="display: inline-block; background-color: tomato; color: #ffffff; padding: 18px 35px; border-radius: 50px; text-decoration: none; font-size: 1.3em; font-weight: bold; transition: background-color 0.3s ease, transform 0.3s ease; box-shadow: 0 4px 10px rgba(255, 99, 71, 0.4);">Explore Selam GPT Today!</a>  </div></div>
        `.trim(),
      },
      taglines: [
        "Selam GPT: AI that speaks your language, literally.",
        "Ethiopian AI: Smarter, Faster, Funnier.",
        "Beyond Translation: Create, Innovate, Ethiopianize.",
        "Your Ideas, Our AI, Ethiopian Power.",
        "Selam GPT: Because even AI needs to learn a new trick (or a few thousand words).",
      ],
      emails: [
        {
          subject: "Finally, AI That Speaks Your Language (Literally!) 😉",
          preview:
            "Unlock new creative and development possibilities with Selam GPT, bringing modern AI to Ethiopian languages.",
          body: [
            "Hey there, content creators and developers! Ever felt like AI was missing a crucial piece of the puzzle? Like, say, understanding Amharic, Oromo, or Tigrinya? Well, get ready to say 'Selam!' to a whole new world.",
            "",
            "Introducing Selam GPT: the groundbreaking AI that brings modern capabilities directly to Ethiopian languages. Imagine crafting compelling narratives, generating innovative code, or building interactive experiences – all powered by AI that truly understands your linguistic nuances.",
            "",
            "No more awkward translations or generic outputs. Selam GPT empowers you to create, innovate, and interact in ways you never thought possible. It's smart, it's powerful, and it's ready to revolutionize your workflow.",
            "",
            "Ready to dive into the future of AI? Learn more and join the linguistic revolution today!",
            "",
            "Best,",
            "The Selam GPT Team",
          ].join("\n"),
        },
      ],
      socialPosts: [
        {
          platform: "Twitter",
          text: "Tired of AI that doesn't get your Ethiopian vibe? 😂 Say 'Selam!' to Selam GPT! We're bringing cutting-edge AI to Amharic, Oromo, Tigrinya & more. Content creators & devs, your new favorite tool just dropped.",
          hashtags: [
            "#SelamGPT",
            "#EthiopianAI",
            "#AIforAfrica",
            "#ContentCreation",
            "#Developers",
          ],
        },
        {
          platform: "Instagram",
          text: "Ever wished AI could speak your language? 🤔 Wish granted! ✨ Selam GPT is here, empowering content creators and developers with modern AI capabilities in Ethiopian languages like Amharic, Oromo, and Tigrinya. Get ready to innovate! Link in bio to learn more.",
          hashtags: [
            "#SelamGPT",
            "#AIInnovation",
            "#EthiopianLanguages",
            "#TechAfrica",
            "#FutureIsNow",
            "#ContentCreator",
            "#SoftwareDev",
          ],
        },
        {
          platform: "LinkedIn",
          text: "Innovation Alert for Content Creators & Software Developers! We're thrilled to introduce Selam GPT, a pioneering AI solution bringing advanced capabilities to Ethiopian languages. This is a game-changer for localized content generation, application development, and interactive experiences. Empower your projects with AI that truly understands.",
          hashtags: [
            "#SelamGPT",
            "#AI",
            "#Ethiopia",
            "#LanguageTech",
            "#Innovation",
            "#Developers",
            "#ContentCreators",
            "#AfricanTech",
          ],
        },
      ],
      imagePrompts: [
        "A sleek, modern AI interface displaying text in Amharic, Oromo, and Tigrinya, with glowing lines connecting to a stylized brain icon. Brand colors black and tomato prominently featured. Professional yet inviting.",
        "A diverse group of content creators and software developers, smiling and collaborating around a holographic projection of Selam GPT's interface, showing Ethiopian script. The scene is vibrant and futuristic, with subtle hints of Ethiopian cultural patterns. Brand colors black and tomato.",
        "An abstract representation of AI neural networks merging with traditional Ethiopian script characters, creating a dynamic and innovative visual. The background is a gradient of black and tomato, suggesting sophistication and energy.",
      ],
    },
  },
];
