import type { ReactNode } from "react";
import GlassSurface from "@/components/liquid/GlassSurface";

/** Glass eyebrow pill + a plain-language title, so a skim reads the page by its headings. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  id,
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-center gap-4">
        <GlassSurface
          data-reveal
          tone="clear"
          display="inline-flex"
          className="shrink-0 rounded-full"
          contentClassName="flex items-center gap-2.5 px-4 py-2 sm:px-5"
        >
          <span className="font-mono text-[11px] tabular-nums text-white/45">{index}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/85 sm:text-xs">{eyebrow}</span>
        </GlassSurface>
        <div data-reveal className="hairline-r h-px flex-1" aria-hidden="true" />
      </div>
      <h2 id={id} data-reveal className="mt-6 max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {children ? (
        <p data-reveal className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
          {children}
        </p>
      ) : null}
    </header>
  );
}
