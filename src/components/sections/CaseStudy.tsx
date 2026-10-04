"use client";

import Image from "next/image";
import { ArrowUpRight, Check, ChevronDown, Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import GlassSurface from "@/components/liquid/GlassSurface";
import SectionHeading from "@/components/SectionHeading";
import { caseStudy } from "@/content/profile";

type Screenshot = (typeof caseStudy.screenshots)[number];

const label = "font-mono text-[10px] uppercase tracking-[0.22em] text-white/50";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className={label}>{title}</h3>
      <div className="mt-2 text-[15px] leading-relaxed text-white/75 sm:text-base">{children}</div>
    </div>
  );
}

function Architecture() {
  return (
    <GlassSurface data-reveal tone="dark" className="h-full rounded-[30px]" contentClassName="flex h-full flex-col p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className={label}>System architecture</h3>
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" aria-hidden="true" />
          Built by me
        </p>
      </div>
      <ol className="mt-6" aria-label="UpSound AI architecture, from clients to data">
        {caseStudy.architecture.map((tier, index) => (
          <li key={tier.tier}>
            {index > 0 ? (
              <div className="ml-[5.5rem] flex h-6 w-4 flex-col items-center sm:ml-24" aria-hidden="true">
                <span className="h-full w-px bg-gradient-to-b from-white/5 to-white/35" />
                <ChevronDown size={11} className="-mt-1.5 text-white/40" />
              </div>
            ) : null}
            <div className="flex items-start gap-3">
              <span className="w-[4.75rem] shrink-0 pt-[7px] font-mono text-[9px] uppercase leading-tight tracking-[0.16em] text-white/40 sm:w-[5.25rem] sm:text-[10px]">
                {tier.tier}
              </span>
              <ul className="flex min-w-0 flex-1 flex-wrap gap-1.5">
                {tier.nodes.map((node) => (
                  <li
                    key={node.label}
                    className={
                      node.mine
                        ? "flex items-center gap-1.5 rounded-[10px] bg-white/[0.12] px-2.5 py-1.5 text-xs leading-snug text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_0_0_1px_rgba(255,255,255,0.22),0_0_18px_-6px_rgba(255,255,255,0.35)]"
                        : "glass-lite rounded-[10px] px-2.5 py-1.5 text-xs leading-snug text-white/60"
                    }
                  >
                    {node.mine ? (
                      <span className="h-1 w-1 shrink-0 rounded-full bg-white" aria-hidden="true" />
                    ) : null}
                    {node.label}
                    {node.mine ? <span className="sr-only"> (built by me)</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-auto pt-6 font-mono text-[10px] leading-relaxed text-white/40">{caseStudy.scale}</p>
    </GlassSurface>
  );
}

export default function CaseStudy() {
  const [selected, setSelected] = useState<Screenshot | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    const handlePointerDown = (event: PointerEvent) => {
      const modal = modalRef.current;
      if (modal && event.target instanceof Node && !modal.contains(event.target)) setSelected(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.body.style.overflow = "";
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section id="case-study" aria-labelledby="case-study-title" className="scroll-mt-24 py-20 md:py-28">
      <SectionHeading
        id="case-study-title"
        index="01"
        eyebrow="Featured case study"
        title={
          <>
            {caseStudy.name}
            <span className="text-white/45"> — {caseStudy.tagline}</span>
          </>
        }
      >
        {caseStudy.ownership}
      </SectionHeading>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-6">
        <GlassSurface data-reveal className="rounded-[30px]" contentClassName="p-6 sm:p-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-white/10 pb-6 sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-1">
              <dt className={label}>Role</dt>
              <dd className="mt-1.5 text-sm text-white/90">{caseStudy.role}</dd>
            </div>
            <div>
              <dt className={label}>Period</dt>
              <dd className="mt-1.5 text-sm text-white/90">{caseStudy.period}</dd>
            </div>
            <div>
              <dt className={label}>Product</dt>
              <dd className="mt-1.5 text-sm">
                <a
                  href={caseStudy.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-white/90 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
                >
                  {caseStudy.urlLabel}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-6 space-y-6">
            <Block title="Problem">{caseStudy.problem}</Block>
            <Block title="What I built">{caseStudy.solution}</Block>
            <Block title="Results">
              <ul className="space-y-2">
                {caseStudy.results.map((result) => (
                  <li key={result} className="flex gap-3">
                    <Check size={16} className="mt-[5px] shrink-0 text-emerald-300/90" aria-hidden="true" />
                    <span className="text-white/85">{result}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </GlassSurface>

        <Architecture />
      </div>

      <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-6">
        {caseStudy.highlights.map((highlight, index) => (
          <li key={highlight.title}>
            <GlassSurface data-reveal interactive className="h-full rounded-[26px]" contentClassName="h-full p-6 sm:p-7">
              <p className="font-mono text-[11px] tabular-nums text-white/40">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em] text-white">{highlight.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-[15px]">{highlight.body}</p>
            </GlassSurface>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <div data-reveal className="lg:max-w-md">
          <h3 className={label}>Stack</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {caseStudy.stack.map((item) => (
              <li key={item} className="glass-lite rounded-full px-3 py-1 font-mono text-[11px] text-white/75">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-[56%]">
          <h3 data-reveal className={label}>
            Product screens
          </h3>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {caseStudy.screenshots.map((shot) => (
              <li key={shot.src}>
                <button
                  type="button"
                  data-reveal
                  onClick={(event) => {
                    openerRef.current = event.currentTarget;
                    setSelected(shot);
                  }}
                  className="group/shot glass-lite glass-lite-hover lg-press block w-full overflow-hidden rounded-[18px] p-1.5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                  aria-label={`Enlarge screenshot: ${shot.title}`}
                >
                  <span className="relative block overflow-hidden rounded-[13px]">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={1900}
                      height={958}
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 100vw"
                      className="aspect-video w-full object-cover object-left-top opacity-90 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.04] group-hover/shot:opacity-100"
                    />
                    <span className="glass-chip absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full text-white/80 opacity-0 transition-opacity duration-500 group-hover/shot:opacity-100">
                      <Maximize2 size={12} aria-hidden="true" />
                    </span>
                  </span>
                  <span className="block px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-white/55">{shot.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The page content is a stacking context below the dock; portal to <body> to sit above it. */}
      {selected ? createPortal(
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} screenshot`}
          data-lenis-prevent
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xl" aria-hidden="true" />
          <div ref={modalRef} className="relative z-10 w-full max-w-6xl">
            <GlassSurface tone="dark" className="overflow-hidden rounded-[30px] p-2 shadow-[0_40px_120px_rgba(0,0,0,0.75)]">
              <button
                ref={closeRef}
                type="button"
                onClick={() => setSelected(null)}
                className="glass-chip absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                aria-label="Close screenshot"
              >
                <X size={18} aria-hidden="true" />
              </button>
              <div className="overflow-hidden rounded-[23px]">
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  width={1900}
                  height={958}
                  sizes="90vw"
                  className="max-h-[82vh] w-full object-contain"
                />
              </div>
              <p className="px-4 pb-2 pt-3 font-mono text-xs uppercase tracking-widest text-white/65">
                UpSound AI · {selected.title}
              </p>
            </GlassSurface>
          </div>
        </div>,
        document.body,
      ) : null}
    </section>
  );
}
