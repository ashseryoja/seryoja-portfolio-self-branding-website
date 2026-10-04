import { ExternalLink, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { education, experience } from "@/content/profile";

const pillLink =
  "glass-lite glass-lite-hover lg-press inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-white/80 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60";

function RailNode() {
  return (
    <div
      data-timeline-node
      className="timeline-node absolute left-[7.5px] top-1 z-10 h-4 w-4 rounded-full md:left-[calc(50%-0.5rem)]"
      aria-hidden="true"
    />
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 py-20 md:py-28">
      <SectionHeading id="experience-title" index="03" eyebrow="Experience" title="Where I’ve shipped production systems" />

      <div className="relative">
        <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/10 md:left-1/2" aria-hidden="true">
          <div
            data-timeline-progress
            className="absolute inset-0 origin-top bg-gradient-to-b from-white via-white/60 to-white/10 shadow-[0_0_14px_1px_rgba(255,255,255,0.55)]"
          />
        </div>

        <ol className="space-y-16 md:space-y-20">
          {experience.map((job) => (
            <li key={job.id} id={job.id} className="relative grid w-full scroll-mt-24 grid-cols-1 gap-5 md:grid-cols-2 md:gap-16">
              <RailNode />
              <div data-reveal className="flex flex-col pl-12 md:items-end md:pl-0 md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">{job.period}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">{job.company}</h3>
                <p className="mt-1 text-base text-white/85">{job.role}</p>
                {job.companyNote ? <p className="mt-1 text-sm text-white/50">{job.companyNote}</p> : null}
                {job.links?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                    {job.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={pillLink}>
                        {link.label}
                        <ExternalLink size={11} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="pl-12 md:pl-0">
                <ul data-reveal className="space-y-3">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                      <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-white/60" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}

          {education.map((item) => (
            <li key={item.id} id={item.id} className="relative grid w-full scroll-mt-24 grid-cols-1 gap-5 md:grid-cols-2 md:gap-16">
              <RailNode />
              <div data-reveal className="flex flex-col pl-12 md:items-end md:pl-0 md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">{item.period}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">Education</h3>
              </div>
              <div className="pl-12 md:pl-0">
                <div data-reveal className="flex gap-3">
                  <GraduationCap size={18} className="mt-0.5 shrink-0 text-white/55" aria-hidden="true" />
                  <div>
                    <p className="text-base text-white/90">{item.degree}</p>
                    <p className="mt-1 text-sm text-white/55">{item.school}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
