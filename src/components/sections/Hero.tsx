import { ArrowDownRight, Download } from "lucide-react";
import GlassSurface from "@/components/liquid/GlassSurface";
import HeroLens from "@/components/liquid/HeroLens";
import SocialIcon from "@/components/SocialIcon";
import { heroFacts, profile, socials } from "@/content/profile";

const ctaBase =
  "inline-flex w-fit items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-wider focus:outline-none sm:gap-2.5 sm:px-7 sm:py-3.5 sm:text-sm";

export default function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="flex min-h-[calc(100svh-6rem)] flex-col justify-center pb-20 sm:min-h-[calc(100svh-8rem)] sm:pb-14 md:pb-6"
    >
      <div data-hero-drift="0.55" className="mb-5 sm:mb-6">
        <GlassSurface
          data-intro
          tone="clear"
          display="inline-flex"
          className="max-w-full rounded-[18px] sm:rounded-full"
          contentClassName="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5"
        >
          <span
            className="status-dot h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300 text-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]"
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 sm:text-xs">{profile.availability}</span>
        </GlassSurface>
      </div>

      <HeroLens className="mb-5 w-fit max-w-full sm:mb-6">
        <h1
          id="hero-title"
          className="cursor-default break-words text-[12vw] font-bold leading-[0.9] tracking-tighter sm:text-6xl md:text-8xl lg:text-[7.5rem]"
        >
          <span className="block overflow-hidden pb-[0.05em]">
            <span data-intro-line className="block">
              SERGEY
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.07em]">
            <span data-intro-line className="block text-chrome">
              ASHUGHYAN
            </span>
          </span>
          <span className="sr-only">, {profile.role}</span>
        </h1>
      </HeroLens>

      <div data-hero-drift="0.3">
        <p data-intro className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl md:text-4xl">
          {profile.role}
          <span className="text-white/45"> — production LLM systems</span>
        </p>
        <p data-intro className="mt-4 max-w-[46rem] text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
          {profile.pitch}
        </p>
      </div>

      <div data-hero-drift="0.16" className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
        <GlassSurface data-intro tone="bright" display="inline-flex" interactive className="lg-press rounded-full">
          <a
            href="#case-study"
            className={`${ctaBase} focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
          >
            <span className="sm:hidden">Case study</span>
            <span className="hidden sm:inline">View case study</span>
            <ArrowDownRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
          </a>
        </GlassSurface>
        <GlassSurface data-intro tone="clear" display="inline-flex" interactive className="lg-press rounded-full">
          <a
            href={profile.cv.href}
            download={profile.cv.fileName}
            aria-label="Download CV (PDF)"
            className={`${ctaBase} text-white focus-visible:ring-2 focus-visible:ring-white/60`}
          >
            <span className="sm:hidden">CV</span>
            <span className="hidden sm:inline">Download CV</span>
            <Download className="h-3.5 w-3.5 sm:h-[15px] sm:w-[15px]" aria-hidden="true" />
          </a>
        </GlassSurface>
        <ul data-intro className="flex items-center gap-2" aria-label="Contact links">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target={social.id === "email" ? undefined : "_blank"}
                rel={social.id === "email" ? undefined : "noreferrer"}
                aria-label={`${social.label}: ${social.value}`}
                title={social.label}
                className="glass-lite glass-lite-hover lg-press grid h-11 w-11 place-items-center rounded-full text-white/70 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60 sm:h-12 sm:w-12"
              >
                <SocialIcon id={social.id} size={17} strokeWidth={1.7} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <dl data-hero-drift="0.08" className="mt-9 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-5 sm:mt-10 lg:grid-cols-4">
        {heroFacts.map((fact) => (
          <div key={fact.label} data-intro className="border-l border-white/15 pl-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{fact.label}</dt>
            <dd className="mt-1.5 text-sm leading-snug text-white/85">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
