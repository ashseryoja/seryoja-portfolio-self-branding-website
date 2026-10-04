"use client";

import { useRef, type ReactNode } from "react";
import { useLiquidMotion } from "@/components/liquid/useLiquidMotion";

/**
 * Client boundary for the page's declarative motion (data-intro, data-reveal,
 * data-parallax…). Everything inside can stay a server component.
 */
export default function MotionScope({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLiquidMotion(ref);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
