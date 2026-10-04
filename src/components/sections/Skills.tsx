import { BrainCircuit, Cloud, MonitorSmartphone, Server, Workflow, type LucideIcon } from "lucide-react";
import GlassSurface from "@/components/liquid/GlassSurface";
import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/content/profile";

const ICONS: Record<string, LucideIcon> = {
  "AI & LLM engineering": BrainCircuit,
  Backend: Server,
  Frontend: MonitorSmartphone,
  "Infrastructure & ops": Cloud,
  "Automation & tooling": Workflow,
};

export default function Skills() {
  const [primary, ...rest] = skills;
  const PrimaryIcon = ICONS[primary.group] ?? BrainCircuit;

  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 py-20 md:py-28">
      <SectionHeading id="skills-title" index="04" eyebrow="Skills" title="Tools I use in production">
        Grouped by where they sit in the system.
      </SectionHeading>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] lg:gap-6">
        <div data-parallax={0.08}>
          <GlassSurface data-reveal tone="clear" interactive className="h-full rounded-[30px]" contentClassName="h-full p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-white">{primary.group}</h3>
              <span className="glass-lite grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/75">
                <PrimaryIcon size={17} strokeWidth={1.6} aria-hidden="true" />
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {primary.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-white/85">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/80 shadow-[0_0_10px_2px_rgba(255,255,255,0.4)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassSurface>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6" data-parallax={0.18}>
          {rest.map((group) => {
            const Icon = ICONS[group.group] ?? Server;
            return (
              <GlassSurface key={group.group} data-reveal interactive className="rounded-[26px]" contentClassName="h-full p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-semibold text-white">{group.group}</h3>
                  <Icon size={16} strokeWidth={1.6} className="shrink-0 text-white/55" aria-hidden="true" />
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="glass-lite rounded-full px-2.5 py-1 font-mono text-[11px] text-white/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassSurface>
            );
          })}
        </div>
      </div>
    </section>
  );
}
