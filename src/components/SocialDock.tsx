"use client";

import { Glass, animateGlassValue, glassEase, glassValue, type GlassAnimation, type GlassOptics } from "@samasante/liquid-glass";
import { Home, MessageCircle, User, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import GlassSurface from "@/components/liquid/GlassSurface";

const items: Array<{ href: string; label: string; icon: LucideIcon }> = [
    { href: "/", label: "Main Page", icon: Home },
    { href: "/chat", label: "AI Chat Page", icon: MessageCircle },
    { href: "/contact", label: "Contact Page", icon: User },
];

// The selection "droplet": a lens that slides between items and magnifies
// the icon under it, like the iOS 26 tab bar.
const LENS_OPTICS: Partial<GlassOptics> = {
    mapSize: 256,
    strength: 0.14,
    depth: 1,
    curvature: 0.72,
    dispersion: 0.7,
    bend: 0.35,
    bendWidth: 0.18,
    frost: 0,
    brightness: 0.1,
    sheen: 0.75,
    sheenWidth: 3,
    glow: 0.32,
    specular: 1.4,
};

const LENS_WIDTH = 58;
const LENS_HEIGHT = 44;

export default function SocialDock() {
    const [hoverChat, setHoverChat] = useState(false);
    const [hovered, setHovered] = useState<number | null>(null);
    const pathname = usePathname();
    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
    const animation = useRef<GlassAnimation | null>(null);
    const lensX = useMemo(() => glassValue(0.5), []);

    const activeIndex = items.findIndex((item) => item.href === pathname);
    const targetIndex = hovered ?? activeIndex;

    // A tap's compatibility hover must not outlive the navigation it caused.
    useEffect(() => {
        setHovered(null);
        setHoverChat(false);
    }, [pathname]);

    const centerOf = useCallback((index: number) => {
        const nav = navRef.current;
        const item = itemRefs.current[index];
        if (!nav || !item || !nav.offsetWidth) return null;
        return (item.offsetLeft + item.offsetWidth / 2) / nav.offsetWidth;
    }, []);

    // Snap into place on first layout, glide with a soft overshoot afterwards.
    const placed = useRef(false);
    useEffect(() => {
        // No matching item (e.g. a 404): park the droplet just outside the bar.
        const target = targetIndex < 0 ? -0.3 : centerOf(targetIndex);
        if (target == null) return;
        animation.current?.stop();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!placed.current || reduced) {
            lensX.set(target);
            placed.current = true;
            return;
        }
        animation.current = animateGlassValue(lensX, target, { duration: 0.62, ease: glassEase });
    }, [centerOf, lensX, targetIndex]);

    useEffect(() => () => animation.current?.stop(), []);

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center">
            <div className="pointer-events-auto relative">
                {/* Hover text for AI Chat */}
                <div className={`pointer-events-none absolute bottom-full left-1/2 mb-4 -translate-x-1/2 whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] font-mono text-xs ${hoverChat ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}>
                    <span className="glass-chip block rounded-full px-3 py-1.5 text-white/80">&gt; init chat...</span>
                </div>

                {/* Container */}
                <GlassSurface tone="clear" className="rounded-full" contentClassName="p-1.5">
                    <Glass
                        size={[LENS_WIDTH, LENS_HEIGHT]}
                        radius={LENS_HEIGHT / 2}
                        center={{ x: lensX, y: 0.5 }}
                        optics={LENS_OPTICS}
                        pixelUnits
                        className="rounded-full"
                    >
                        <div ref={navRef} className="flex items-center gap-1.5" onPointerLeave={() => setHovered(null)}>
                            {items.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                const isChat = item.href === "/chat";
                                return (
                                    <Link
                                        key={item.href}
                                        ref={(node) => {
                                            itemRefs.current[index] = node;
                                        }}
                                        href={item.href}
                                        className={`grid h-11 w-[58px] place-items-center rounded-full transition-colors duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70 ${isActive ? 'text-white' : 'text-white/55 hover:text-white'}`}
                                        aria-label={item.label}
                                        onPointerEnter={(event) => {
                                            if (event.pointerType !== "mouse") return;
                                            setHovered(index);
                                            if (isChat) setHoverChat(true);
                                        }}
                                        onPointerLeave={(event) => {
                                            if (event.pointerType !== "mouse") return;
                                            if (isChat) setHoverChat(false);
                                        }}
                                        onFocus={(event) => {
                                            if (event.currentTarget.matches(":focus-visible")) setHovered(index);
                                        }}
                                        onBlur={() => setHovered(null)}
                                    >
                                        <Icon size={20} strokeWidth={isActive ? 2.1 : 1.8} />
                                    </Link>
                                );
                            })}
                        </div>
                    </Glass>
                </GlassSurface>
            </div>
        </div>
    );
}
