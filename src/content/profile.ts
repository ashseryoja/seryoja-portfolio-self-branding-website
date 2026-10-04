/*
 * Single source of truth for everything the portfolio says about Sergey.
 * The homepage, contact page, metadata and the AI assistant's system prompt
 * are all generated from this file — edit facts here, nowhere else.
 *
 * UpSound AI facts were checked against the product's git history
 * (origin/main, 2 Oct 2026): only systems Sergey authored are claimed as his.
 */

export const site = {
  url: "https://seryoja-portfolio.vercel.app",
  title: "Sergey Ashughyan — AI Engineer",
  description:
    "AI Engineer in Yerevan building the production layer of AI products: provider failover with circuit breakers, per-call LLM cost tracking, queue admission control and real-time streaming. Python, FastAPI, Next.js.",
} as const;

export const profile = {
  name: "Sergey Ashughyan",
  firstName: "Sergey",
  lastName: "Ashughyan",
  role: "AI Engineer",
  focus: "Production LLM systems · Python · FastAPI · Next.js",
  location: "Yerevan, Armenia",
  timezone: "UTC+4",
  availability: "Open to AI Engineer roles",
  email: "ashseryoja@gmail.com",
  cv: {
    href: "/cv/Sergey_Ashughyan_CV.pdf",
    fileName: "Sergey_Ashughyan_CV.pdf",
  },
  photo: "/assets/profile.webp",
  pitch:
    "I build the parts of AI products that keep them dependable in production — provider failover with circuit breakers, per-call cost tracking, admission control for async generation queues and real-time streaming — with Python, FastAPI and Next.js.",
  summary:
    "AI Engineer with a full-stack background. At UpSound AI I build the reliability and cost layer around 10+ model providers — failover, per-call cost tracking, queue admission control — along with generation pipelines, live streaming and the admin app.",
  languages: [
    { name: "English", level: "Professional working proficiency" },
    { name: "Russian", level: "Fluent" },
    { name: "Armenian", level: "Native" },
  ],
} as const;

export const heroFacts: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Based in", value: `${profile.location} · ${profile.timezone}` },
  { label: "Currently", value: "AI Engineer, UpSound AI" },
  { label: "Languages", value: "English · Russian · Armenian" },
  { label: "Education", value: "B.Sc. Software Engineering, NPUA ’27" },
];

export type SocialId = "email" | "linkedin" | "github" | "telegram";

export const socials: ReadonlyArray<{ id: SocialId; label: string; value: string; href: string }> = [
  { id: "email", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "in/sergey-ashughyan",
    href: "https://www.linkedin.com/in/sergey-ashughyan-928350253/",
  },
  { id: "github", label: "GitHub", value: "@ashseryoja", href: "https://github.com/ashseryoja" },
  { id: "telegram", label: "Telegram", value: "@ashseryoja", href: "https://t.me/ashseryoja" },
];

/* ------------------------------------------------------------------ */
/* Key numbers                                                         */
/* ------------------------------------------------------------------ */

export const highlights: ReadonlyArray<{ value: string; label: string; detail: string }> = [
  { value: "2,000+", label: "users", detail: "on UpSound AI, where I’m one of three core engineers" },
  { value: "42", label: "AI operation types", detail: "cost-tracked per call — tokens, USD and RUB — by a recorder I built" },
  { value: "12", label: "async job queues", detail: "behind per-user admission control I wrote in Redis Lua" },
  { value: "1,700+", label: "commits", detail: "≈20% of UpSound’s backend, frontend and admin since May 2026" },
];

/* ------------------------------------------------------------------ */
/* Featured case study                                                 */
/* ------------------------------------------------------------------ */

export type ArchitectureNode = { label: string; mine?: boolean };

export const caseStudy = {
  id: "upsound",
  name: "UpSound AI",
  tagline: "AI platform for independent musicians",
  url: "https://www.upsound.ai/",
  urlLabel: "upsound.ai",
  period: "May 2026 — Present",
  role: "AI Engineer",
  ownership:
    "One of three core engineers since May 2026 — about 1,740 commits (≈20%) across backend, frontend and admin, top committer in May and September. Below is the part I own.",
  problem:
    "UpSound runs 42 kinds of paid AI operations — audio analysis, covers, photoshoots, songwriting — on 10+ model providers. Any call can fail, stall or quietly overspend, and users pay per generation.",
  solution:
    "I build the reliability and cost layer around those models — per-call cost tracking and pricing, provider failover behind a circuit breaker, admission control for the async queues — plus audio ingestion, the neuro-photoshoot pipeline, live streaming and the admin app.",
  results: [
    "2,000+ users across the web app and Telegram bot",
    "Every AI call has a known cost: 42 operation types tracked in USD and RUB, priced from live provider rates",
    "Image generation keeps running through a provider outage — traffic fails over across three providers automatically",
  ],
  highlights: [
    {
      title: "Per-call AI cost tracking",
      body: "One recorder writes the tokens and USD / RUB cost of every AI call to Postgres and to PostHog as $ai_generation events, across 42 operation types. Model prices sync on a schedule from 6 providers and feed the generation-pricing service I built, which turns them into per-operation token prices.",
    },
    {
      title: "Failover behind a circuit breaker",
      body: "GPT Image 2 generation fails over across three providers. My Redis circuit breaker opens after 2 failures in 5 minutes, stays open for 30 minutes and fails open if Redis itself is down — one outage never blocks generation.",
    },
    {
      title: "Admission control for 12 queues",
      body: "Atomic per-user workflow slots in Redis Lua in front of 12 RabbitMQ job queues (quorum queues, dead-letter exchange, transactional outbox). I wrote about a third of the task-queue layer, including the RabbitMQ topology.",
    },
    {
      title: "Audio ingestion → artist profile",
      body: "Multi-source ingestion — Yandex Music, Bandcamp, yt-dlp search, previews — that rejects audio more than ±3 s off Spotify’s duration. Top committer on the Gemini pipeline that turns a track into a structured JSON artist profile.",
    },
    {
      title: "Neuro-photoshoot pipeline",
      body: "Queue, worker, provider adapters and API for reference-based artist photoshoots generated with GPT Image 2.",
    },
    {
      title: "Live streaming & admin",
      body: "Server-sent-event live streams for generations, including live EN → RU translation of generated song prompts. Started admin.upsound.ai (Next.js 15, 26 pages, 63 test files) and split the admin API from the public one.",
    },
  ],
  architecture: [
    {
      tier: "Clients",
      nodes: [{ label: "Next.js web app" }, { label: "Telegram bot · aiogram" }, { label: "Admin app", mine: true }],
    },
    {
      tier: "API",
      nodes: [{ label: "FastAPI · public API" }, { label: "Admin API", mine: true }, { label: "SSE live streams", mine: true }],
    },
    {
      tier: "Async work",
      nodes: [{ label: "Admission control · Redis Lua", mine: true }, { label: "12 RabbitMQ queues · DLX · outbox" }],
    },
    {
      tier: "AI layer",
      nodes: [
        { label: "Image failover + circuit breaker", mine: true },
        { label: "Audio ingestion", mine: true },
        { label: "LLM gateway · Gemini / OpenRouter / xAI" },
      ],
    },
    {
      tier: "Data & cost",
      nodes: [{ label: "AI usage log · USD / RUB", mine: true }, { label: "PostgreSQL · pgvector" }, { label: "PostHog · Sentry" }],
    },
  ] satisfies ReadonlyArray<{ tier: string; nodes: ArchitectureNode[] }>,
  scale: "Team codebase: 72 Next.js pages · 289 Alembic migrations · 14,000+ backend tests · 94 Playwright specs",
  stack: [
    "Python",
    "FastAPI",
    "SQLAlchemy 2",
    "PostgreSQL",
    "Redis · Lua",
    "RabbitMQ",
    "Gemini",
    "OpenRouter",
    "GPT Image 2",
    "PostHog",
    "aiogram 3",
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Railway",
  ],
  screenshots: [
    {
      src: "/assets/upsound-ai-playlist-pitching.jpg",
      title: "Playlist pitching",
      alt: "UpSound AI playlist pitching screen with generated pitch text",
    },
    {
      src: "/assets/upsound-ai-reels-scenarios.jpg",
      title: "Reels scenarios",
      alt: "UpSound AI Reels scenario generator screen",
    },
    {
      src: "/assets/upsound-ai-cover-generation.jpg",
      title: "Cover generation",
      alt: "UpSound AI cover generation screen with generated artwork",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Other AI projects                                                   */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  name: string;
  kind: string;
  year: string;
  summary: string;
  bullets: readonly string[];
  stack: readonly string[];
  image?: { src: string; alt: string; position?: string };
  link?: { href: string; label: string };
  note?: string;
};

export const projects: readonly Project[] = [
  {
    id: "dizzit-ai",
    name: "Dizzit AI",
    kind: "Own product · AI workspace",
    year: "2026",
    summary:
      "An AI workspace for interior designers: render enhancement, style transfer, new camera views, seamless materials, photo → 3D and a PDF presentation with AI-written copy. About 29k lines of TypeScript.",
    bullets: [
      "Vision “scene inventory” before every generation: lights, exact materials and easily misread objects go into the image prompt so the model stops swapping fixtures — about $0.005 per analysis, ~$0.05 per 4K render.",
      "Three-model vision fallback chain (Gemini → Claude Haiku → Gemini) with a 100 s deadline, typed provider errors, one retry on 429 / 5xx and a doubled token budget when a reasoning model runs out.",
      "Near-copy guard: every new camera view is compared with the source (24×24 grayscale correlation) and regenerated once if it’s a copy.",
    ],
    stack: ["Next.js 15", "TypeScript", "GPT Image 2", "Gemini", "Claude Haiku", "Meshy", "Postgres (Neon)"],
    image: {
      src: "/assets/dizzit-ui-project.webp",
      alt: "Dizzit AI workspace with a before-and-after interior render",
      position: "object-top",
    },
    note: "Private beta — demo on request",
  },
  {
    id: "elevenlabs-agent-manager",
    name: "ElevenLabs Agent Manager",
    kind: "AI agent · n8n",
    year: "2026",
    summary:
      "A Telegram agent that manages ElevenLabs voice agents in plain language: list and select agents, rewrite system prompts and welcome messages, update knowledge bases.",
    bullets: [
      "The LLM returns a structured decision — one of 6 intents plus a confidence score — instead of free text, so every action is validated before it runs.",
      "Authorization lives outside the model: each read or update re-checks in MySQL that the Telegram user owns the agent, and every change goes to an audit log.",
      "34-node workflow shipped in 2 days over 4 iterations, with 11 Python scripts verifying its behaviour.",
    ],
    stack: ["n8n AI Agent", "OpenAI GPT-5 mini", "ElevenLabs API", "Telegram Bot API", "MySQL"],
    image: {
      src: "/assets/elevenlabs-agent-workflow.png",
      alt: "n8n AI Agent node with model, memory and think tool, routing decisions to ElevenLabs and Telegram actions",
      position: "object-center",
    },
  },
  {
    id: "deo-home-automations",
    name: "AI automations for e-commerce",
    kind: "n8n · DEO HOME",
    year: "2025",
    summary: "Workflows that took manual work out of a furniture retailer’s sales and catalogue operations.",
    bullets: [
      "PDF quotes: the bot pulls live product photos and prices from WooCommerce, renders a branded proposal through CloudConvert and sends it in Telegram — proposal creation became hands-off.",
      "AI inventory assistant: the team adds, updates and removes catalogue products from plain-language Telegram messages via the WordPress / WooCommerce API.",
    ],
    stack: ["n8n", "OpenAI", "WooCommerce API", "CloudConvert", "Telegram Bot API"],
    image: {
      src: "/assets/pricelist-pdf-maker.png",
      alt: "n8n workflow that generates PDF price quotes",
      position: "object-center",
    },
  },
  {
    id: "portfolio-assistant",
    name: "Portfolio AI assistant",
    kind: "LLM app · this website",
    year: "2026",
    summary: "The chat on this site answers questions about my work in English or Russian and links to the right section.",
    bullets: [
      "Its system prompt is generated from the same typed data that renders this page, so the assistant can’t drift from the CV.",
      "Hardened route handler: only user / assistant turns are accepted from the client, with length and history caps and no internal errors leaked.",
    ],
    stack: ["Next.js route handler", "OpenAI API", "TypeScript"],
    link: { href: "/chat", label: "Try the assistant" },
  },
];

/* ------------------------------------------------------------------ */
/* Experience & education                                              */
/* ------------------------------------------------------------------ */

export type Role = {
  id: string;
  company: string;
  companyNote?: string;
  role: string;
  period: string;
  bullets: readonly string[];
  links?: ReadonlyArray<{ href: string; label: string }>;
};

export const experience: readonly Role[] = [
  {
    id: "upsound-experience",
    company: "UpSound AI",
    companyNote: "AI platform for independent musicians",
    role: "AI Engineer",
    period: "May 2026 — Present",
    bullets: [
      "One of three core engineers: about 1,740 commits across the FastAPI backend, Next.js frontend and admin since May 2026; top committer in May and September.",
      "Built per-call AI cost tracking across 42 operation types and the generation-pricing service that turns live provider prices into per-operation token prices.",
      "Built GPT Image 2 failover across three providers behind a Redis circuit breaker, and atomic Redis-Lua admission control for 12 RabbitMQ job queues.",
      "Built the audio-ingestion gateway and the neuro-photoshoot pipeline, shipped SSE live streaming with live EN → RU translation, and started admin.upsound.ai.",
    ],
    links: [{ href: "https://www.upsound.ai/", label: "upsound.ai" }],
  },
  {
    id: "deo-home-experience",
    company: "DEO HOME",
    companyNote: "Home and office furniture retailer",
    role: "Full-Stack Developer & AI Automation Engineer",
    period: "Apr 2025 — May 2026",
    bullets: [
      "Sole developer: built and launched two commercial e-commerce sites on WordPress / WooCommerce, from build to deployment.",
      "Built n8n pipelines connecting OpenAI with WooCommerce, Telegram and CloudConvert that generate PDF quotes and manage the catalogue from chat.",
      "Shipped an installable, offline-ready PWA catalogue that became the team’s daily internal sales tool on tablets.",
    ],
    links: [
      { href: "https://deohome.online/", label: "deohome.online" },
      { href: "https://deooffice.ru/", label: "deooffice.ru" },
    ],
  },
  {
    id: "imusic-experience",
    company: "IMUSIC",
    role: "Web Developer",
    period: "2022 — 2023",
    bullets: ["Built and maintained responsive frontend interfaces in HTML and CSS, focused on cross-device layout and usability."],
  },
];

export const education = [
  {
    id: "npua-education",
    school: "National Polytechnic University of Armenia",
    degree: "B.Sc. in Software Engineering",
    period: "2022 — 2027 (expected)",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export const skills: ReadonlyArray<{ group: string; items: readonly string[] }> = [
  {
    group: "AI & LLM engineering",
    items: [
      "LLM APIs: OpenAI, Gemini, Claude, xAI, OpenRouter",
      "Provider failover & circuit breakers",
      "Per-call cost tracking & pricing",
      "Structured outputs: JSON mode, Pydantic",
      "Agents & tool calling (n8n AI Agent)",
      "Image & vision models: GPT Image 2, Gemini",
      "Speech & voice: ElevenLabs",
      "Embeddings & vector search: pgvector",
      "Real-time streaming (SSE)",
    ],
  },
  {
    group: "Backend",
    items: [
      "Python",
      "FastAPI (async)",
      "SQLAlchemy 2 + asyncpg",
      "Alembic",
      "PostgreSQL / Supabase",
      "Redis & Lua",
      "RabbitMQ",
      "aiogram 3",
      "pytest",
    ],
  },
  {
    group: "Frontend",
    items: ["TypeScript", "Next.js 15", "React 19", "TanStack Query", "Zustand", "Tailwind CSS", "PWA", "Playwright"],
  },
  {
    group: "Infrastructure & ops",
    items: ["Docker", "Railway", "Vercel", "PostHog", "Sentry", "Git"],
  },
  {
    group: "Automation & tooling",
    items: ["n8n", "Telegram Bot API", "WooCommerce API", "CloudConvert", "Claude Code", "Codex", "Cursor"],
  },
];

/* ------------------------------------------------------------------ */
/* Web products (compact showcase)                                     */
/* ------------------------------------------------------------------ */

export const webProjects = [
  {
    id: "deohome-website",
    name: "DEO HOME",
    label: "E-commerce · PWA",
    description:
      "Furniture catalogue and store built as an installable PWA: works offline and is optimised for tablet-based sales in the showroom.",
    image: "/assets/pwa-portfolio.webp",
    imageAlt: "DEO HOME furniture catalogue displayed on tablets",
    imagePosition: "object-center",
    href: "https://deohome.online/",
    tags: ["WooCommerce", "PWA", "E-commerce"],
  },
  {
    id: "three-dimension-website",
    name: "3Dimension",
    label: "Studio website · Web 3D",
    description:
      "Website for a furniture 3D-visualisation studio with live material configuration in the browser and AR-ready 3D assets.",
    image: "/assets/three-dimension-project.jpg",
    imageAlt: "3Dimension furniture visualisation studio website",
    imagePosition: "object-center",
    href: "https://three-dimension-ten.vercel.app/",
    tags: ["Web 3D", "Configurator", "Brand site"],
  },
  {
    id: "beze-website",
    name: "BEZE",
    label: "Storefront · Multilingual",
    description:
      "Multilingual storefront for a Yerevan pastry studio with an animated product catalogue and product-led navigation.",
    image: "/assets/beze-project.webp",
    imageAlt: "BEZE pastry studio storefront",
    imagePosition: "object-[center_62%]",
    href: "https://beze-delta.vercel.app/",
    tags: ["Multilingual", "Catalogue", "Storefront"],
  },
] as const;
