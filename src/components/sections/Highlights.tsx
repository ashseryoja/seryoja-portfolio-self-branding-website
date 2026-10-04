import GlassSurface from "@/components/liquid/GlassSurface";
import { highlights } from "@/content/profile";

export default function Highlights() {
  return (
    <section aria-label="Key numbers" className="pb-24 md:pb-32">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {highlights.map((item, index) => (
          <li key={item.label} data-parallax={index % 2 ? 0.12 : 0.05}>
            <GlassSurface data-reveal className="h-full rounded-[24px]" contentClassName="flex h-full flex-col p-5 sm:p-6">
              <p className="font-mono text-[28px] font-medium leading-none tabular-nums tracking-tight text-white sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">{item.label}</p>
              <p className="mt-2 text-[13px] leading-snug text-white/65 sm:text-sm">{item.detail}</p>
            </GlassSurface>
          </li>
        ))}
      </ul>
    </section>
  );
}
