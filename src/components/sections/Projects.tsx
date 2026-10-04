import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import GlassSurface from "@/components/liquid/GlassSurface";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/content/profile";

/** Stand-in visual for the portfolio assistant: what a visitor actually sees in /chat. */
function ChatPreview() {
  return (
    <div className="relative flex aspect-[2/1] flex-col justify-center gap-3 overflow-hidden rounded-[22px] bg-white/[0.03] px-5 sm:px-7" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_0%,rgba(120,140,255,0.16),transparent_70%)]" />
      <p className="relative ml-auto max-w-[78%] rounded-[18px] rounded-tr-[6px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(230,232,239,0.9))] px-3.5 py-2 text-[12px] leading-snug text-[#08080b] sm:text-[13px]">
        What happens at UpSound when an image provider goes down?
      </p>
      <p className="glass-lite relative max-w-[86%] rounded-[18px] rounded-tl-[6px] px-3.5 py-2 text-[12px] leading-snug text-white/85 sm:text-[13px]">
        Generation fails over to the next of three providers. My Redis circuit breaker opens after 2 failures in 5 minutes…
      </p>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 py-20 md:py-28">
      <SectionHeading id="projects-title" index="02" eyebrow="AI projects" title="More AI systems I’ve designed and shipped">
        Agents, vision pipelines and LLM automations — each card names the mechanism that makes it reliable.
      </SectionHeading>

      <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {projects.map((project, index) => (
          <li key={project.id} id={project.id} className="scroll-mt-24" data-parallax={index % 2 ? 0.14 : 0.04}>
            <GlassSurface
              data-reveal
              interactive
              className="h-full rounded-[30px]"
              contentClassName="flex h-full flex-col p-2.5"
            >
              {project.image ? (
                <div className="relative aspect-[2/1] overflow-hidden rounded-[22px] bg-[#16161b]">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className={`object-cover opacity-90 ${project.image.position ?? "object-center"}`}
                  />
                </div>
              ) : (
                <ChatPreview />
              )}

              <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-5 sm:px-5 sm:pb-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                  {project.kind} · {project.year}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">{project.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{project.summary}</p>

                <ul className="mt-4 space-y-2.5">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                  <ul className="flex flex-wrap gap-1.5" aria-label={`${project.name} stack`}>
                    {project.stack.map((item) => (
                      <li key={item} className="glass-lite rounded-full px-2.5 py-1 font-mono text-[10px] text-white/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {project.link ? (
                    <Link
                      href={project.link.href}
                      className="lg-press inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#e4e6ec_100%)] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-black shadow-[inset_0_1px_0_#fff,0_10px_24px_-14px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      {project.link.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  ) : project.note ? (
                    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                      <Lock size={11} aria-hidden="true" />
                      {project.note}
                    </span>
                  ) : null}
                </div>
              </div>
            </GlassSurface>
          </li>
        ))}
      </ul>
    </section>
  );
}
