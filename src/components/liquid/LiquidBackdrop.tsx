"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

const GlassScene = dynamic(() => import("./GlassScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

/**
 * The fixed stage behind every page: a WebGL aurora with floating glass bodies,
 * a dot lattice and film grain. Each layer scrolls at its own rate, which is
 * what gives the glass panels above something to bend.
 */
export default function LiquidBackdrop() {
  const pathname = usePathname();
  const dotsRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setWebgl(supportsWebGL());
  }, []);

  useEffect(() => {
    const dots = dotsRef.current;
    if (!dots) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = window.scrollY;
    let last = Number.NaN;
    let frame = 0;

    const loop = () => {
      current += (window.scrollY - current) * 0.14;
      // Reduced motion keeps the lattice still behind the content.
      const offset = reduced ? 0 : -((current * 0.22) % 28);
      if (Math.abs(offset - last) > 0.01) {
        dots.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        last = offset;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#040406]">
      <div className="lg-aurora" />
      {webgl ? (
        <div className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}>
          <SceneBoundary>
            <GlassScene home={pathname === "/"} onReady={() => setReady(true)} />
          </SceneBoundary>
        </div>
      ) : null}
      <div className="lg-dots-mask">
        <div ref={dotsRef} className="lg-dots" />
      </div>
      <div className="lg-vignette" />
      <div className="lg-grain" />
    </div>
  );
}
