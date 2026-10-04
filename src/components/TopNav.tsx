"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import GlassSurface from "@/components/liquid/GlassSurface";
import { cn } from "@/lib/cn";
import { profile } from "@/content/profile";

const LINKS = [
  { id: "case-study", label: "Case study" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

/** Desktop section navigation; phones use the dock and the page flow. */
export default function TopNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActive(LINKS.find((link) => visible.has(link.id))?.id ?? null);
      },
      // A thin band just above the middle of the viewport decides the active section.
      { rootMargin: "-40% 0px -55% 0px" },
    );

    LINKS.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="pointer-events-none fixed right-6 top-6 z-40 hidden lg:block">
      <GlassSurface tone="clear" display="flex" className="pointer-events-auto rounded-full" contentClassName="flex items-center gap-1 p-1.5">
        <ul className="flex items-center gap-0.5">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className={cn(
                  "block rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-[color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60",
                  active === link.id
                    ? "bg-white/[0.1] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                    : "text-white/60 hover:text-white",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.cv.href}
          download={profile.cv.fileName}
          className="lg-press ml-1 inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#e4e6ec_100%)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-black shadow-[inset_0_1px_0_#fff,0_8px_20px_-10px_rgba(0,0,0,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          CV
          <Download size={13} aria-hidden="true" />
        </a>
      </GlassSurface>
    </nav>
  );
}
