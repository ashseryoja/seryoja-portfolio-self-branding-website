"use client";

import Image from "next/image";
import {
  ArrowDownRight,
  BrainCircuit,
  Download,
  ExternalLink,
  MonitorSmartphone,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import GithubActivity from "@/components/GithubActivity";
import ProjectShowcase from "@/components/ProjectShowcase";
import GlassSurface from "@/components/liquid/GlassSurface";
import HeroLens from "@/components/liquid/HeroLens";
import { scrollToId } from "@/components/liquid/SmoothScroll";
import { useLiquidMotion } from "@/components/liquid/useLiquidMotion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const upsoundPreviews = [
  {
    src: "/assets/upsound-ai-playlist-pitching.jpg",
    title: "Playlist Pitching",
    alt: "UpSound AI playlist pitching interface",
  },
  {
    src: "/assets/upsound-ai-reels-scenarios.jpg",
    title: "Reels Scenarios",
    alt: "UpSound AI Reels scenario generator interface",
  },
  {
    src: "/assets/upsound-ai-cover-generation.jpg",
    title: "Cover Generation",
    alt: "UpSound AI cover generation interface",
  },
];

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <div data-reveal className="hairline-l h-px flex-1" />
      <GlassSurface
        data-reveal
        tone="clear"
        display="inline-flex"
        className="shrink-0 rounded-full"
        contentClassName="px-5 py-2.5 sm:px-6"
      >
        <h3 className="font-mono text-sm uppercase tracking-[0.28em] text-white/90 sm:text-lg">{title}</h3>
      </GlassSurface>
      <div data-reveal className="hairline-r h-px w-12" />
    </div>
  );
}

function SkillCard({ title, icon: Icon, parallax, children }: { title: string; icon: LucideIcon; parallax: number; children: ReactNode }) {
  return (
    <div data-parallax={parallax}>
      <GlassSurface data-reveal interactive className="group h-full rounded-[28px] p-8" contentClassName="h-full">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <h4 className="text-2xl font-bold font-mono">{title}</h4>
          <span className="glass-lite grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/70 transition-colors duration-500 group-hover:text-white">
            <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </div>
        <ul className="space-y-4 font-light text-lg text-white/80">{children}</ul>
      </GlassSurface>
    </div>
  );
}

function SkillItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80 shadow-[0_0_10px_2px_rgba(255,255,255,0.45)] transition-transform duration-500 group-hover:scale-125" />{" "}
      <span>{children}</span>
    </li>
  );
}

function RailNode() {
  return (
    <div
      data-timeline-node
      className="timeline-node absolute left-[-2.25rem] top-2 z-10 h-4 w-4 rounded-full group-hover:scale-125 md:left-[-2.5rem]"
    />
  );
}

const pillLink =
  "glass-lite glass-lite-hover lg-press flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs text-white/85 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewModalRef = useRef<HTMLDivElement>(null);
  const [selectedPreview, setSelectedPreview] = useState<(typeof upsoundPreviews)[number] | null>(null);

  useLiquidMotion(containerRef);

  useEffect(() => {
    if (!selectedPreview) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPreview(null);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      const modal = previewModalRef.current;
      if (modal && event.target instanceof Node && !modal.contains(event.target)) {
        setSelectedPreview(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.body.style.overflow = "";
    };
  }, [selectedPreview]);

  return (
    <div ref={containerRef} className="relative min-h-screen text-white bg-transparent">
      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-48 selection:bg-white selection:text-black sm:pt-32">

        {/* HERO SECTION */}
        <section data-hero className="flex min-h-[calc(100svh-6rem)] flex-col justify-center pb-24 sm:min-h-[calc(100svh-8rem)] sm:pb-16 md:min-h-[80vh] md:pb-0">
          <div data-hero-drift="0.55" className="mb-5 sm:mb-6">
            <GlassSurface
              data-intro
              tone="clear"
              display="inline-flex"
              className="max-w-full rounded-[18px] sm:rounded-full"
              contentClassName="flex items-center gap-3 px-4 py-2.5"
            >
              <span className="status-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8e8ec] text-[#e8e8ec] shadow-[0_0_10px_rgba(255,255,255,0.9)]" aria-hidden="true" />
              <h2 className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/80 sm:text-xs sm:tracking-[0.3em]">
                FULL STACK DEVELOPER · AI INTEGRATOR · AI AUTOMATION ENGINEER
              </h2>
            </GlassSurface>
          </div>

          <HeroLens className="mb-6 w-fit max-w-full sm:mb-8">
            <h1 className="text-[12vw] sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] cursor-default break-words">
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-intro-line className="block">SERGEY</span>
              </span>
              <span className="block overflow-hidden pb-[0.07em]">
                <span data-intro-line className="block text-chrome">ASHUGHYAN</span>
              </span>
            </h1>
          </HeroLens>

          <div data-hero-drift="0.3">
            <p data-intro className="max-w-2xl text-base sm:text-xl font-light leading-relaxed text-white/60 mb-7 sm:mb-10">
              I build AI integrations and automation systems that connect products, data, teams, and business workflows.<br />
              From idea to production: interfaces, APIs, agents, payments, and deployment.
            </p>
          </div>

          <div data-hero-drift="0.16" className="flex flex-wrap items-center gap-3 sm:gap-4">
            <GlassSurface data-intro tone="bright" display="inline-flex" interactive className="lg-press rounded-full">
              <button
                onClick={() => scrollToId("builds-section")}
                className="inline-flex items-center justify-center gap-2 rounded-full px-[18px] py-3 font-mono text-xs uppercase tracking-wider w-fit text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:gap-2.5 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                View Projects
                <ArrowDownRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              </button>
            </GlassSurface>
            <GlassSurface data-intro tone="clear" display="inline-flex" interactive className="lg-press rounded-full">
              <a
                href="/cv/Sergey_Ashughyan_CV.pdf"
                download="Sergey_Ashughyan_CV.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full px-[18px] py-3 font-mono text-xs uppercase tracking-wider text-white w-fit text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:gap-2.5 sm:px-7 sm:py-3.5 sm:text-sm"
              >
                Download CV
                <Download className="h-3.5 w-3.5 sm:h-[15px] sm:w-[15px]" aria-hidden="true" />
              </a>
            </GlassSurface>
          </div>
        </section>

        <GithubActivity />

        {/* SKILLS GRID */}
        <section id="skills-section" className="min-h-screen flex flex-col justify-center py-20 scroll-mt-24">
          <SectionHeading title="The Skills Grid" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <SkillCard title="Frontend" icon={MonitorSmartphone} parallax={0.18}>
              <SkillItem>Production AI/SaaS Interfaces</SkillItem>
              <SkillItem>React.js &amp; Next.js</SkillItem>
              <SkillItem>JavaScript / TypeScript</SkillItem>
              <SkillItem>Design Systems &amp; Product UX</SkillItem>
              <SkillItem>PWA &amp; WebGL (Three.js / GSAP)</SkillItem>
              <SkillItem>Analytics &amp; User Tracking</SkillItem>
            </SkillCard>

            <SkillCard title="Backend & Automation" icon={Workflow} parallax={0.36}>
              <SkillItem><strong className="font-semibold text-white">n8n</strong> (Low-Code AI Automation)</SkillItem>
              <SkillItem>API Integrations &amp; Automation Architecture</SkillItem>
              <SkillItem>FastAPI, Workers, Queues &amp; Schedulers</SkillItem>
              <SkillItem>Telegram Bots &amp; Product Flows</SkillItem>
              <SkillItem>Payments, Subscriptions &amp; Webhooks</SkillItem>
            </SkillCard>

            <SkillCard title="AI & LLM Tools" icon={BrainCircuit} parallax={0.18}>
              <SkillItem>AI Product Integration</SkillItem>
              <SkillItem>Multi-Provider LLM Orchestration</SkillItem>
              <SkillItem>RAG, pgvector &amp; CLIP Embeddings</SkillItem>
              <SkillItem>AI Usage &amp; Cost Tracking</SkillItem>
              <SkillItem>Agent Pipelines &amp; Tooling</SkillItem>
            </SkillCard>
          </div>
        </section>

        {/* THE BUILDS / PROJECTS */}
        <section id="builds-section" className="py-20 scroll-mt-24">
          <SectionHeading title="The Builds" />

          <div id="websites-section" className="mb-8 scroll-mt-24 sm:flex sm:items-end sm:justify-between sm:gap-8">
            <div data-reveal>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">Selected work · 2026</p>
              <h4 className="font-mono text-sm uppercase tracking-widest text-white/80">Websites &amp; digital products</h4>
            </div>
            <p data-reveal className="mt-3 max-w-md text-sm font-light leading-relaxed text-white/50 sm:mt-0 sm:text-right">
              Five distinct digital experiences, designed and shipped end to end.
            </p>
          </div>

          <ProjectShowcase />
        </section>

        {/* THE LOG / EXPERIENCE */}
        <section id="log-section" className="py-20 relative scroll-mt-24">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/10 md:left-1/2" aria-hidden="true">
            <div
              data-timeline-progress
              className="absolute inset-0 origin-top bg-gradient-to-b from-white via-white/60 to-white/10 shadow-[0_0_14px_1px_rgba(255,255,255,0.55)]"
            />
          </div>

          <div className="flex items-center gap-4 mb-20 relative z-10 w-full justify-center">
            <GlassSurface data-reveal tone="clear" display="inline-flex" className="rounded-full" contentClassName="px-6 py-2.5">
              <h3 className="font-mono text-sm uppercase tracking-[0.28em] text-white/90 sm:text-lg">The Log</h3>
            </GlassSurface>
          </div>

          <div className="space-y-24">
            {/* Experience: UpSound */}
            <div id="upsound-experience" className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full group scroll-mt-24">
              <div data-reveal className="md:text-right pl-12 md:pl-0 flex flex-col md:items-end">
                <h4 className="text-3xl font-bold font-mono">UpSound</h4>
                <p className="text-white/50 font-mono mt-1">AI Integrator / Automation Builder</p>
                <p className="text-white/50 font-mono text-sm mt-1 mb-4">May 2026 — Present</p>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <a href="https://www.upsound.ai/" target="_blank" rel="noreferrer" className={pillLink}>
                    View UpSound AI
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="relative pl-12 md:pl-0">
                <RailNode />
                <p data-reveal className="text-white/75 font-light leading-relaxed mb-5">
                  Built <span className="font-semibold text-white">UpSound AI</span>, a production AI/SaaS platform for independent musicians. The product helps artists analyze tracks, generate cover concepts, Reels scripts, playlist pitches, and release promotion plans through a Next.js web app, Telegram bot, FastAPI backend, PostgreSQL/Supabase data layer, background generation queues, and payment infrastructure. Before launch, the platform attracted 1,500+ pre-registrations; since launch, it has grown to 3,000 active users and 5,000 users overall.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    {
                      label: "Architecture",
                      text: "Next.js 15, React 19, TypeScript, Supabase Auth, FastAPI, aiogram 3, async SQLAlchemy, Redis, APScheduler.",
                    },
                    {
                      label: "AI Pipeline",
                      text: "Gemini, OpenRouter, xAI Grok, image generation, CLIP embeddings, pgvector search, clustering, provider fallbacks.",
                    },
                    {
                      label: "Monetization",
                      text: "Token subscriptions, T-Bank recurring payments, webhook validation, payment reconciliation, Cloudflare R2 storage.",
                    },
                    {
                      label: "Production Quality",
                      text: "PostHog analytics, AI cost tracking, SQLAdmin dashboards, rate limits, 128 backend tests and 18 frontend tests.",
                    },
                  ].map((item) => (
                    <div key={item.label} data-reveal className="glass-lite glass-lite-hover rounded-[20px] p-4 backdrop-blur-md">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/55 mb-2">{item.label}</p>
                      <p className="text-sm text-white/75 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <p data-reveal className="text-white/60 font-light leading-relaxed border-l-2 border-white/25 pl-4 py-1">
                  Owned end-to-end delivery across frontend UX, backend APIs, Telegram workflows, AI integrations, payments, observability, and production deploys on Vercel and Railway.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {upsoundPreviews.map((preview) => (
                    <button
                      key={preview.src}
                      type="button"
                      data-reveal
                      onClick={() => setSelectedPreview(preview)}
                      className="group/preview glass-lite glass-lite-hover lg-press overflow-hidden rounded-[18px] p-1.5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
                      aria-label={`Open ${preview.title} preview`}
                    >
                      <span className="block overflow-hidden rounded-[13px]">
                        <Image
                          src={preview.src}
                          alt={preview.alt}
                          width={1900}
                          height={958}
                          sizes="(min-width: 768px) 14vw, 100vw"
                          className="aspect-video w-full object-cover opacity-85 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/preview:scale-[1.05] group-hover/preview:opacity-100"
                        />
                      </span>
                      <p className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-white/55">{preview.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience 1 */}
            <div id="deo-home-experience" className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full group scroll-mt-24">
              <div data-reveal className="md:text-right pl-12 md:pl-0 flex flex-col md:items-end">
                <h4 className="text-3xl font-bold font-mono">DEO HOME</h4>
                <p className="text-white/50 font-mono mt-1">Full-Stack Developer &amp; Low-Code AI Automation Engineer</p>
                <p className="text-white/50 font-mono text-sm mt-1 mb-4">April 2025 — May 2026</p>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <a href="https://deohome.online/" target="_blank" rel="noreferrer" className={pillLink}>
                    deohome.online
                  </a>
                  <a href="https://deooffice.ru/" target="_blank" rel="noreferrer" className={pillLink}>
                    deooffice.ru
                  </a>
                </div>
              </div>
              <div className="relative pl-12 md:pl-0">
                <RailNode />
                <p data-reveal className="text-white/75 font-light leading-relaxed mb-4">
                  Engineered and developed high-end furniture catalogs and commercial eCommerce platforms. Currently maintaining the platform and building AI-driven automation systems (n8n, OpenAI, APIs) to streamline internal operations, B2B sales, and eliminate manual workflows.
                </p>
                <div data-reveal className="glass-lite my-8 overflow-hidden rounded-[26px] p-2 group/img">
                  <div className="overflow-hidden rounded-[19px]">
                    <Image
                      src="/assets/pwa-portfolio.webp"
                      alt="DEO HOME PWA Portfolio"
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/img:scale-105"
                    />
                  </div>
                </div>
                <p data-reveal className="text-white/75 font-light leading-relaxed border-l-2 border-white/25 pl-4 py-1 italic">
                  &quot;A modern Progressive Web Application for a furniture brand — fast, installable, offline-ready, with a premium tablet-optimized UI and seamless SPA experience, delivering a native-app experience directly in the browser.&quot;
                </p>
              </div>
            </div>

            {/* Experience 2 */}
            <div id="naghashyan-experience" className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full group scroll-mt-24">
              <div data-reveal className="md:text-right pl-12 md:pl-0">
                <h4 className="text-3xl font-bold font-mono">Naghashyan Solutions</h4>
                <p className="text-white/50 font-mono mt-1">Frontend Developer (Intern)</p>
                <p className="text-white/50 font-mono text-sm mt-1">November 2022 — June 2023</p>
              </div>
              <div className="relative pl-12 md:pl-0">
                <RailNode />
                <p data-reveal className="text-white/75 font-light leading-relaxed">
                  Mastered core frontend principles (HTML, CSS, Responsive design). Expanded computational thinking and data structures utilizing C++ for algorithmic problem solving.
                </p>
              </div>
            </div>

            {/* Experience 3 */}
            <div id="npua-education" className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full group scroll-mt-24">
              <div data-reveal className="md:text-right pl-12 md:pl-0">
                <h4 className="text-3xl font-bold font-mono">NPUA</h4>
                <p className="text-white/50 font-mono mt-1">Software Engineering</p>
              </div>
              <div className="relative pl-12 md:pl-0">
                <RailNode />
                <p data-reveal className="text-white/75 font-light leading-relaxed">
                  Currently studying at the National Polytechnical University of Armenia.<br />
                  Pursuing a Bachelor of Applied Science with a focus on Software Engineering.
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
      {selectedPreview ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPreview.title} preview`}
          data-lenis-prevent
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            onClick={() => setSelectedPreview(null)}
            onMouseDown={() => setSelectedPreview(null)}
            onTouchStart={() => setSelectedPreview(null)}
            data-preview-backdrop
            tabIndex={-1}
            aria-label="Close preview backdrop"
          />
          <div ref={previewModalRef} className="relative z-10 w-full max-w-6xl">
            <GlassSurface tone="dark" className="overflow-hidden rounded-[30px] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.75)]">
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="glass-chip absolute left-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
              <div className="overflow-hidden rounded-[23px]">
                <Image
                  src={selectedPreview.src}
                  alt={selectedPreview.alt}
                  width={1900}
                  height={958}
                  sizes="90vw"
                  className="max-h-[82vh] w-full object-contain"
                />
              </div>
              <div className="px-4 pb-2 pt-3">
                <p className="font-mono text-xs uppercase tracking-widest text-white/65">{selectedPreview.title}</p>
              </div>
            </GlassSurface>
          </div>
        </div>
      ) : null}
    </div>
  );
}
