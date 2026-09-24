"use client";

import { Glass, type GlassOptics } from "@samasante/liquid-glass";
import { useCallback, type CSSProperties, type HTMLAttributes, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type GlassTone = "frost" | "clear" | "dark" | "bright";

/*
 * Optics are module-level constants so the displacement map is generated once
 * per size — a new object each render would force the library to re-rasterize.
 * Only Chromium bends the live page through these (backdrop-filter: url());
 * Safari and Firefox keep the frost, tint and rim.
 */
const TONE_OPTICS: Record<GlassTone, Partial<GlassOptics>> = {
  frost: {
    mapSize: 320,
    strength: 0.05,
    depth: 0.5,
    curvature: 0.28,
    bend: 0.55,
    bendWidth: 0.14,
    dispersion: 0.45,
    frost: 16,
    saturate: 1.55,
    sheen: 0.42,
    sheenWidth: 3,
    glow: 0.1,
    specular: 1,
  },
  clear: {
    mapSize: 256,
    strength: 0.08,
    depth: 0.6,
    curvature: 0.42,
    bend: 0.6,
    bendWidth: 0.18,
    dispersion: 0.6,
    frost: 3,
    saturate: 1.7,
    sheen: 0.55,
    sheenWidth: 3,
    glow: 0.16,
    specular: 1.15,
  },
  dark: {
    mapSize: 320,
    strength: 0.04,
    depth: 0.45,
    curvature: 0.22,
    bend: 0.45,
    bendWidth: 0.12,
    dispersion: 0.35,
    frost: 26,
    saturate: 1.35,
    sheen: 0.35,
    sheenWidth: 3,
    glow: 0.08,
    specular: 1,
  },
  bright: {
    mapSize: 256,
    strength: 0.06,
    depth: 0.55,
    curvature: 0.35,
    bend: 0.5,
    bendWidth: 0.16,
    dispersion: 0.4,
    frost: 8,
    saturate: 1.2,
    sheen: 0.6,
    sheenWidth: 3,
    glow: 0.2,
    specular: 1.2,
  },
};

/** Feeds the pointer position to `.lg-surface::after` (the moving light). */
export function trackGlassPointer(event: PointerEvent<HTMLElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--lg-x", `${event.clientX - rect.left}px`);
  target.style.setProperty("--lg-y", `${event.clientY - rect.top}px`);
}

type GlassSurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children?: ReactNode;
  tone?: GlassTone;
  /**
   * Bend the live page through the rim with the liquid-glass material
   * (backdrop-filter: url(), Chromium only). Off by default: over the
   * animated WebGL stage Chromium has to read the backdrop back for that SVG
   * filter every frame, which halves the frame rate on its own. The page's
   * real refraction lives in the in-place lenses (hero title, dock) instead.
   */
  refract?: boolean;
  /** Pointer-following light and brighter rim on hover. */
  interactive?: boolean;
  /** The library wrapper defaults to inline-block; layouts pick their own. */
  display?: CSSProperties["display"];
  contentClassName?: string;
  optics?: Partial<GlassOptics>;
};

export default function GlassSurface({
  children,
  tone = "frost",
  refract = false,
  interactive = false,
  display = "block",
  className,
  contentClassName,
  style,
  optics,
  onPointerMove,
  ...rest
}: GlassSurfaceProps) {
  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (interactive) trackGlassPointer(event);
      onPointerMove?.(event);
    },
    [interactive, onPointerMove],
  );

  if (!refract) {
    return (
      <div
        {...rest}
        data-tone={tone}
        data-interactive={interactive ? "true" : undefined}
        data-refract="false"
        className={cn("lg-surface", className)}
        style={{ display, ...style }}
        onPointerMove={handlePointerMove}
      >
        <div className={cn("lg-content", contentClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <Glass
      {...rest}
      data-tone={tone}
      data-interactive={interactive ? "true" : undefined}
      optics={optics ?? TONE_OPTICS[tone]}
      className={cn("lg-surface", className)}
      style={{ display, ...style }}
      onPointerMove={handlePointerMove}
    >
      <div className={cn("lg-content", contentClassName)}>{children}</div>
    </Glass>
  );
}
