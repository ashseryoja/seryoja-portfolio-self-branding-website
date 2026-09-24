"use client";

import Image from "next/image";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { trackGlassPointer } from "@/components/liquid/GlassSurface";

const websiteProjects = [
  {
    id: "beze-website",
    name: "BEZE",
    label: "Website · 01",
    description:
      "A multilingual digital storefront for a Yerevan pastry studio — immersive art direction, an animated catalogue and product-led navigation.",
    image: "/assets/beze-project.webp",
    imageAlt: "BEZE strawberry mille-feuille collection",
    imagePosition: "object-[center_62%]",
    href: "https://beze-delta.vercel.app/",
    tags: ["Multilingual", "Catalogue", "Art direction"],
  },
  {
    id: "dizzit-ai-website",
    name: "Dizzit AI",
    label: "Independent product · 02",
    description:
      "My product for interior designers: one workspace for render enhancement, style transfer, new views, materials, presentations and photo-to-3D.",
    image: "/assets/dizzit-ui-project.webp",
    imageAlt: "Dizzit AI interior design workspace with before-and-after render editor",
    imagePosition: "object-top",
    href: "https://dizzit-ai.vercel.app/",
    tags: ["AI workspace", "Interior design", "SaaS"],
  },
  {
    id: "three-dimension-website",
    name: "3Dimension",
    label: "Website · 03",
    description:
      "An interactive studio website for photorealistic furniture 3D — with live material configuration, web 3D and AR-ready assets.",
    image: "/assets/three-dimension-project.jpg",
    imageAlt: "3Dimension furniture studio website",
    imagePosition: "object-center",
    href: "https://three-dimension-ten.vercel.app/",
    tags: ["Web 3D", "Configurator", "Furniture"],
  },
  {
    id: "upsound-ai-website",
    name: "UpSound AI",
    label: "AI product · 04",
    description:
      "An end-to-end AI platform for independent musicians — track analysis, cover concepts, Reels scenarios, playlist pitching and release planning.",
    image: "/assets/upsound-ai-playlist-pitching.jpg",
    imageAlt: "UpSound AI playlist pitching workspace",
    imagePosition: "object-left",
    href: "https://www.upsound.ai/",
    tags: ["Music tech", "AI platform", "SaaS"],
  },
  {
    id: "deohome-website",
    name: "DEO HOME",
    label: "E-commerce · 05",
    description:
      "A premium furniture catalogue and commerce experience built as a fast, installable PWA, optimized for tablet sales and offline browsing.",
    image: "/assets/pwa-portfolio.webp",
    imageAlt: "DEO HOME furniture catalogue displayed across tablet devices",
    imagePosition: "object-center",
    href: "https://deohome.online/",
    tags: ["E-commerce", "PWA", "Furniture"],
  },
] as const;

type Project = (typeof websiteProjects)[number];

const LIQUID_SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 } as const;

const roundButton =
  "grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/75 transition-[color,background,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/70";

/**
 * Compact glass rows that open into a square detail card. The row and the card
 * share layout ids, so the row itself grows into the card and folds back.
 */
export default function ProjectShowcase() {
  const [activeId, setActiveId] = useState<Project["id"] | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const active = websiteProjects.find((project) => project.id === activeId) ?? null;
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  // The page content is its own stacking context below the dock; the card
  // renders into <body> so it can rise above everything.
  useEffect(() => setPortalTarget(document.body), []);

  useEffect(() => {
    if (!activeId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [activeId]);

  return (
    <>
      <div className="flex flex-col gap-3">
        {websiteProjects.map((project) => (
          <div key={project.id} id={project.id} className="scroll-mt-24">
            <motion.div
              layoutId={`project-${project.id}`}
              transition={LIQUID_SPRING}
              data-reveal
              data-tone="frost"
              data-refract="false"
              data-interactive="true"
              onPointerMove={trackGlassPointer}
              className="lg-surface group"
              style={{ borderRadius: 22 }}
            >
              <div className="lg-content flex items-center gap-3 p-2.5 sm:gap-4 sm:p-3 md:gap-5">
                <motion.div
                  layoutId={`project-media-${project.id}`}
                  transition={LIQUID_SPRING}
                  className="relative h-14 w-20 shrink-0 overflow-hidden bg-white/[0.04] sm:h-16 sm:w-24 md:h-[72px] md:w-32"
                  style={{ borderRadius: 14 }}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="128px"
                    className={`object-cover opacity-85 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:opacity-100 ${project.imagePosition}`}
                  />
                </motion.div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-[9px] uppercase tracking-[0.22em] text-white/55">{project.label}</p>
                  <motion.h5
                    layoutId={`project-title-${project.id}`}
                    transition={LIQUID_SPRING}
                    className="mt-1 w-fit max-w-full truncate text-lg font-semibold tracking-[-0.03em] text-white sm:text-2xl"
                  >
                    {project.name}
                  </motion.h5>
                </div>

                <div className="hidden shrink-0 gap-2 lg:flex">
                  {project.tags.map((tag) => (
                    <span key={tag} className="glass-lite rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/55">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  {/* The whole row opens the card: the button's ::after stretches over it. */}
                  <button
                    type="button"
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setActiveId(project.id);
                    }}
                    aria-label={`Show details for ${project.name}`}
                    aria-haspopup="dialog"
                    className={`${roundButton} glass-lite glass-lite-hover !static after:absolute after:inset-0 after:rounded-[22px] after:content-['']`}
                  >
                    <Plus size={17} strokeWidth={1.8} className="transition-transform duration-500 group-hover:rotate-90" aria-hidden="true" />
                  </button>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name} website`}
                    className={`${roundButton} relative z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] hover:bg-white hover:text-black`}
                  >
                    <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {portalTarget ? createPortal(
      <AnimatePresence>
        {active ? (
          <motion.div
            key="project-scrim"
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setActiveId(null)}
            aria-hidden="true"
          />
        ) : null}
        {active ? (
          <div key="project-dialog" className="pointer-events-none fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              layoutId={`project-${active.id}`}
              transition={LIQUID_SPRING}
              role="dialog"
              aria-modal="true"
              data-lenis-prevent
              aria-labelledby={`project-title-${active.id}`}
              data-tone="dark"
              data-refract="false"
              className="lg-surface pointer-events-auto flex max-h-[calc(100svh-2rem)] w-full max-w-[min(620px,calc(100svh-2rem))] flex-col overflow-hidden"
              style={{ borderRadius: 32 }}
            >
              <div className="lg-content flex min-h-0 flex-1 flex-col p-2.5">
                <motion.div
                  layoutId={`project-media-${active.id}`}
                  transition={LIQUID_SPRING}
                  className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-white/[0.04] sm:aspect-[16/10]"
                  style={{ borderRadius: 24 }}
                >
                  <Image
                    src={active.image}
                    alt={active.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 640px) 600px, 100vw"
                    className={`object-cover ${active.imagePosition}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
                  <motion.div
                    className="absolute inset-x-3 top-3 flex items-start justify-between gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  >
                    <span className="glass-chip rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/85">
                      {active.label}
                    </span>
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={() => setActiveId(null)}
                      aria-label="Close project details"
                      className="glass-chip grid h-10 w-10 place-items-center rounded-full text-white/85 transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
                    >
                      <X size={17} aria-hidden="true" />
                    </button>
                  </motion.div>
                </motion.div>

                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3.5 pb-3.5 pt-5 sm:px-5 sm:pb-5" data-lenis-prevent>
                  <motion.h5
                    layoutId={`project-title-${active.id}`}
                    transition={LIQUID_SPRING}
                    id={`project-title-${active.id}`}
                    className="w-fit text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl"
                  >
                    {active.name}
                  </motion.h5>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.16, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  >
                    <p className="mt-3 text-sm font-light leading-relaxed text-white/75 sm:text-base">{active.description}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {active.tags.map((tag) => (
                          <span key={tag} className="glass-lite rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/65">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={active.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${active.name} website`}
                        className="lg-press inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#e4e6ec_100%)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-black shadow-[inset_0_1px_0_#fff,inset_0_-1px_0_rgba(0,0,0,0.1),0_12px_28px_-14px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      >
                        Open website
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>,
      portalTarget,
      ) : null}
    </>
  );
}
