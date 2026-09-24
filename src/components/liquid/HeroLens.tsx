"use client";

import { Glass, glassValue, type GlassOptics } from "@samasante/liquid-glass";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

const LENS_OPTICS: Partial<GlassOptics> = {
  mapSize: 384,
  strength: 0.1,
  depth: 0.95,
  curvature: 0.62,
  dispersion: 0.45,
  bend: 0.42,
  bendWidth: 0.14,
  frost: 0,
  brightness: 0,
  sheen: 0.65,
  sheenWidth: 3,
  sheenFalloff: 1.5,
  glow: 0.12,
  specular: 1.3,
};

const clamp = (value: number, min: number, max: number) =>
  min > max ? (min + max) / 2 : Math.min(max, Math.max(min, value));

/**
 * A liquid-glass lens that drifts across its children and follows the pointer.
 * The lens refracts the live DOM in place (an SVG displacement filter on the
 * element itself), so it bends the real title in Chrome, Safari and Firefox.
 */
export default function HeroLens({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef(160);
  const x = useMemo(() => glassValue(0.7), []);
  const y = useMemo(() => glassValue(0.62), []);
  const [lens, setLens] = useState(160);
  const [height, setHeight] = useState<number>();

  // The library pins its source to the measured height, so feed it the
  // content's natural height whenever the title reflows.
  useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;

    let lastHeight = -1;
    const measure = () => {
      const contentHeight = content.offsetHeight;
      const width = container.offsetWidth;
      if (!contentHeight || !width) return;
      // Stepped so a live resize rebuilds the displacement map rarely.
      const next = Math.floor(Math.min(clamp(width * 0.2, 96, 212), contentHeight * 0.94) / 8) * 8;
      if (next === lensRef.current && contentHeight === lastHeight) return;
      lastHeight = contentHeight;
      lensRef.current = next;
      setLens(next);
      setHeight(contentHeight);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones re-filter the title at ~30fps instead of every frame; the drift
    // is slow enough that it reads just as smooth.
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const minInterval = coarse ? 32 : 0;
    let lastSet = -Infinity;
    // Out of range so the first frame always places the lens.
    let lastX = -1;
    let lastY = -1;
    let targetX = 0.7;
    let targetY = 0.62;
    let currentX = targetX;
    let currentY = targetY;
    let lastPointer = -Infinity;
    let frame = 0;
    let running = false;

    const handleMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const margin = 80;
      const inside =
        event.clientX > rect.left - margin &&
        event.clientX < rect.right + margin &&
        event.clientY > rect.top - margin &&
        event.clientY < rect.bottom + margin;
      if (!inside) return;
      lastPointer = performance.now();
      targetX = (event.clientX - rect.left) / rect.width;
      targetY = (event.clientY - rect.top) / rect.height;
    };

    const tick = (now: number) => {
      const width = container.offsetWidth || 1;
      const height = container.offsetHeight || 1;

      if (!reduced && now - lastPointer > 2600) {
        const t = now / 1000;
        targetX = 0.5 + 0.42 * Math.sin(t * 0.21);
        targetY = 0.5 + 0.34 * Math.sin(t * 0.33 + 1.2);
      }

      const ease = reduced ? 1 : 0.075;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      const halfX = lensRef.current / 2 / width;
      const halfY = lensRef.current / 2 / height;
      const nextX = clamp(currentX, halfX, 1 - halfX);
      const nextY = clamp(currentY, halfY, 1 - halfY);
      // Only touch the filter when the lens actually moved.
      const moved = Math.abs(nextX - lastX) > 0.0004 || Math.abs(nextY - lastY) > 0.0004;
      if (moved && now - lastSet >= minInterval) {
        x.set(nextX);
        y.set(nextY);
        lastX = nextX;
        lastY = nextY;
        lastSet = now;
      }

      frame = running ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const visibility = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (entry?.isIntersecting) start();
      else stop();
    });
    visibility.observe(container);
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleMove, { passive: true });

    return () => {
      stop();
      visibility.disconnect();
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleMove);
    };
  }, [x, y]);

  return (
    <Glass
      size={lens}
      radius={lens / 2}
      center={{ x, y }}
      optics={LENS_OPTICS}
      pixelUnits
      className={className}
      style={height ? { height } : undefined}
    >
      <div ref={containerRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
      <div ref={contentRef}>{children}</div>
    </Glass>
  );
}
