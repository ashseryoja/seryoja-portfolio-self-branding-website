"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Smoothly scrolls to an element id, honouring its scroll-margin. */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

const isScrollLocked = () =>
  document.body.style.overflow === "hidden" ||
  document.body.classList.contains("overflow-hidden") ||
  document.documentElement.classList.contains("overflow-hidden");

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // The chat is a fixed, full-screen terminal with its own scroll area.
    if (pathname === "/chat") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Lenis only smooths wheels; on touch-only devices it would just intercept
    // touchmove (and block pinch-zoom in modals while stopped).
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
      wheelMultiplier: 0.95,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Modals lock the page through body overflow; pause the smoother with them.
    const syncLock = () => {
      if (isScrollLocked()) lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style", "class"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    syncLock();

    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [pathname]);

  return null;
}
