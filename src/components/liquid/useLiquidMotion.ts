"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";

/*
 * Declarative motion for a page, driven by data attributes:
 *
 *   data-intro            — hero entrance (staggered, on load)
 *   data-intro-line       — a title line rising out of its mask
 *   data-reveal           — fades up the first time it enters the viewport
 *   data-parallax="n"     — scroll parallax, n × 80px each way (md and up)
 *   data-parallax-img     — image drifting inside its clipped frame
 *   data-hero-drift="n"   — lifts away as the hero scrolls out
 *   data-timeline-progress / data-timeline-node — the experience rail
 *
 * Glass surfaces only ever get their own opacity/transform animated: an
 * ancestor with opacity < 1 would become the backdrop root and blank the
 * refraction for the length of the animation.
 *
 * Entrances move the individual `translate` property rather than `transform`:
 * glass, cards and pills keep a CSS transition on `transform` for their hover
 * lift, and a tween on the same property would be smeared by it.
 */
export function useLiquidMotion(scope: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const intro = gsap.utils.toArray<HTMLElement>("[data-intro]", root);
      const introLines = gsap.utils.toArray<HTMLElement>("[data-intro-line]", root);

      // If the CSS fallback already revealed the hero (slow hydration), don't
      // hide and replay it; otherwise take over from the fallback entirely.
      const late = intro.length > 0 && getComputedStyle(intro[0]).opacity === "1";
      gsap.set([...intro, ...introLines], { animation: "none" });

      if (reduced) {
        gsap.set(intro, { opacity: 1 });
        gsap.set(introLines, { yPercent: 0, y: 0 });
        gsap.set(root.querySelectorAll("[data-timeline-progress]"), { scaleY: 1 });
        root.querySelectorAll("[data-timeline-node]").forEach((node) => node.classList.add("is-lit"));
        return;
      }

      if (late) {
        gsap.set(intro, { opacity: 1 });
        gsap.set(introLines, { yPercent: 0, y: 0 });
      } else {
        const timeline = gsap.timeline({ delay: 0.12 });
        if (introLines.length) {
          timeline.fromTo(
            introLines,
            { yPercent: 115, y: 0 },
            { yPercent: 0, y: 0, duration: 1.5, ease: "expo.out", stagger: 0.12 },
            0,
          );
        }
        if (intro.length) {
          timeline.fromTo(
            intro,
            { opacity: 0, translate: "0px 26px" },
            { opacity: 1, translate: "0px 0px", duration: 1.3, ease: "expo.out", stagger: 0.08, clearProps: "translate" },
            0.1,
          );
        }
      }

      // Opacity only (not autoAlpha): unrevealed content stays focusable and
      // readable by assistive tech; focusing it scrolls it in and reveals it.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      gsap.set(reveals, { opacity: 0, translate: "0px 44px" });
      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            translate: "0px 0px",
            duration: 1.25,
            ease: "expo.out",
            stagger: 0.09,
            overwrite: true,
            clearProps: "translate",
          }),
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax-img]", root).forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: image.parentElement ?? image, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      const hero = root.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        gsap.utils.toArray<HTMLElement>("[data-hero-drift]", root).forEach((element) => {
          const drift = parseFloat(element.dataset.heroDrift ?? "0");
          gsap.to(element, {
            y: -drift * 180,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          });
        });
      }

      root.querySelectorAll<HTMLElement>("[data-timeline-progress]").forEach((progress) => {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: progress.parentElement ?? progress,
              start: "top 62%",
              end: "bottom 62%",
              scrub: 0.5,
            },
          },
        );
      });

      root.querySelectorAll<HTMLElement>("[data-timeline-node]").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 62%",
          onEnter: () => node.classList.add("is-lit"),
          onLeaveBack: () => node.classList.remove("is-lit"),
        });
      });

      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]", root).forEach((element) => {
          const amount = parseFloat(element.dataset.parallax ?? "0");
          gsap.fromTo(
            element,
            { y: amount * 80 },
            {
              y: -amount * 80,
              ease: "none",
              scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.8 },
            },
          );
        });
      });
    }, root);

    const revealOnFocus = (event: FocusEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-reveal]") : null;
      if (target && Number(getComputedStyle(target).opacity) < 1) {
        gsap.to(target, { opacity: 1, translate: "0px 0px", duration: 0.4, overwrite: true, clearProps: "translate" });
      }
    };
    root.addEventListener("focusin", revealOnFocus);

    return () => {
      root.removeEventListener("focusin", revealOnFocus);
      mm.revert();
      ctx.revert();
    };
  }, [scope]);
}
