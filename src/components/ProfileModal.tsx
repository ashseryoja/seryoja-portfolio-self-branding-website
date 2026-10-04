"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Download, Gamepad2, Mail, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlassSurface from "@/components/liquid/GlassSurface";
import SocialIcon from "@/components/SocialIcon";
import { profile, socials } from "@/content/profile";
import { cn } from "@/lib/cn";

const LIQUID_EASE = [0.22, 1, 0.36, 1] as const;

/*
 * The modal sheet re-tints its own glass: a soft top-lit dome over the dark
 * veil and a deeper drop shadow so it floats above the dimmed page. Set inline
 * so it outranks the tone rule in globals.css.
 */
const SHEET_STYLE = {
    "--glass-fill":
        "radial-gradient(90% 55% at 50% 0%, rgba(255, 255, 255, 0.1), transparent 70%), linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.012) 100%)",
    "--glass-shadow":
        "0 60px 140px -48px rgba(0, 0, 0, 0.95), 0 26px 60px -30px rgba(0, 0, 0, 0.8)",
} as CSSProperties;

/*
 * Small round glass controls inside the sheet. Tailwind-only (no .glass-lite)
 * so the absolute positioning and colour transitions are not overridden.
 */
const GLASS_ICON_BUTTON =
    "rounded-full p-2 text-white/60 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_0_0_1px_rgba(255,255,255,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_0_0_1px_rgba(255,255,255,0.16),0_10px_24px_-14px_rgba(0,0,0,0.9)] transition-[color,background-color,box-shadow,transform] duration-500 ease-[var(--ease-liquid)] hover:-translate-y-px active:translate-y-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/60";

const SOCIAL_ROW =
    "glass-lite glass-lite-hover flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-white hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/60 group";

export default function ProfileModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'socials' | 'dino'>('socials');

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setView('socials'), 500);
    };

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                setTimeout(() => setView('socials'), 500);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    return (
        <>
            <AnimatePresence>
                {/* Profile Trigger Button & Callout Container */}
                {!isOpen && (
                    <div className="fixed top-6 left-6 z-50">
                        <motion.button
                            onClick={() => setIsOpen(true)}
                            aria-label={`Open ${profile.name}'s contact card`}
                            aria-haspopup="dialog"
                            className="relative w-12 h-12 rounded-full group shrink-0 transition-transform duration-500 ease-[var(--ease-liquid)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                            style={{ borderRadius: 9999 }}
                        >
                            {/* 8-second Intro Pulse Animation using Framer Motion */}
                            <motion.div
                                initial={{ scale: 1, opacity: 0.8 }}
                                animate={{ scale: 1.8, opacity: 0 }}
                                transition={{ duration: 2, repeat: 3, ease: "easeOut" }}
                                className="absolute inset-0 rounded-full border-[1.5px] border-white/80 shadow-[0_0_18px_rgba(255,255,255,0.25)] pointer-events-none"
                            />

                            {/* Static Border */}
                            <div className="absolute inset-[3px] rounded-full border border-white/15 group-hover:border-white/45 transition-colors duration-500 ease-[var(--ease-liquid)] z-10 pointer-events-none"></div>

                            {/* Liquid glass orb */}
                            <GlassSurface
                                tone="clear"
                                interactive
                                className="w-full h-full rounded-full p-[3px]"
                                contentClassName="w-full h-full"
                            >
                                <motion.div className="w-full h-full relative z-0 overflow-hidden" style={{ borderRadius: 9999 }}>
                                    <Image
                                        src={profile.photo}
                                        alt=""
                                        fill
                                        sizes="48px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-[var(--ease-liquid)]"
                                    />
                                    <span
                                        aria-hidden
                                        className="absolute inset-0 rounded-full bg-[radial-gradient(120%_85%_at_30%_0%,rgba(255,255,255,0.3),transparent_55%)] pointer-events-none"
                                    />
                                </motion.div>
                            </GlassSurface>
                        </motion.button>

                    </div>
                )}
            </AnimatePresence>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="profile-card-title"
                    >

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: LIQUID_EASE }}
                            className="absolute inset-0 bg-[#040406]/60 backdrop-blur-md backdrop-saturate-150 cursor-pointer"
                            onClick={handleClose}
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                maxWidth: view === 'dino' ? '48rem' : '24rem',
                                minHeight: view === 'dino' ? '500px' : 'auto',
                            }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ duration: 0.4, ease: LIQUID_EASE }}
                            className="relative w-full max-w-sm flex flex-col z-10 cursor-default"
                            style={{ borderRadius: 32 }}
                        >
                            {/* Liquid glass sheet (visual layer + content host) */}
                            <GlassSurface
                                tone="dark"
                                interactive
                                display="flex"
                                className="flex-1 w-full flex-col rounded-[32px] overflow-hidden"
                                contentClassName="flex-1 w-full p-8 flex flex-col items-center"
                                style={SHEET_STYLE}
                            >

                                {/* Top Controls */}
                                {view === 'dino' && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setView('socials')}
                                        aria-label="Back to contact card"
                                        className={cn(GLASS_ICON_BUTTON, "absolute top-4 left-4 z-20 flex items-center gap-2 sm:pr-4")}
                                    >
                                        <ArrowLeft size={20} />
                                        <span className="font-mono text-xs hidden sm:block">Back</span>
                                    </motion.button>
                                )}

                                {/* Close Button */}
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                                    exit={{ opacity: 0 }}
                                    onClick={handleClose}
                                    aria-label="Close contact card"
                                    className={cn(GLASS_ICON_BUTTON, "absolute top-4 right-4 z-30")}
                                >
                                    <X size={20} />
                                </motion.button>

                                <AnimatePresence mode="wait">
                                    {view === 'socials' ? (
                                        <motion.div
                                            key="socials-view"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                                            className="w-full flex flex-col items-center"
                                        >
                                            {/* Profile Image */}
                                            <motion.div
                                                layoutId="profile-image"
                                                className="relative w-24 h-24 overflow-hidden border border-white/25 mb-6 shrink-0 shadow-[0_0_0_5px_rgba(255,255,255,0.04),0_0_0_6px_rgba(255,255,255,0.09),0_24px_48px_-20px_rgba(0,0,0,0.95)]"
                                                style={{ borderRadius: 9999 }}
                                            >
                                                <Image
                                                    src={profile.photo}
                                                    alt={profile.name}
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover"
                                                />
                                                <span
                                                    aria-hidden
                                                    className="absolute inset-0 rounded-full bg-[radial-gradient(120%_85%_at_30%_0%,rgba(255,255,255,0.24),transparent_55%)] pointer-events-none"
                                                />
                                            </motion.div>

                                            <h2 id="profile-card-title" className="text-2xl font-semibold mb-1 text-white tracking-tight">{profile.name}</h2>
                                            <p className="text-white/85 text-base">{profile.role}</p>
                                            <p className="mt-2 mb-5 flex items-center gap-1.5 font-mono text-xs text-white/50">
                                                <MapPin size={12} aria-hidden="true" />
                                                {profile.location} · {profile.timezone}
                                            </p>
                                            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-300/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200/90 shadow-[inset_0_0_0_1px_rgba(110,231,183,0.22)]">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                                                {profile.availability}
                                            </p>

                                            {/* Primary actions */}
                                            <div className="w-full grid grid-cols-2 gap-2.5 mb-3 relative z-20">
                                                <a
                                                    href={`mailto:${profile.email}`}
                                                    className="lg-press flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#e9ebf1_100%)] px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-black shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.1),0_12px_24px_-14px_rgba(0,0,0,0.85)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                                                >
                                                    <Mail size={15} aria-hidden="true" />
                                                    Email
                                                </a>
                                                <a
                                                    href={profile.cv.href}
                                                    download={profile.cv.fileName}
                                                    className="glass-lite glass-lite-hover lg-press flex items-center justify-center gap-2 rounded-full px-4 py-3 font-mono text-xs uppercase tracking-wider text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                                                >
                                                    <Download size={15} aria-hidden="true" />
                                                    CV
                                                </a>
                                            </div>

                                            {/* Profiles */}
                                            <ul className="w-full space-y-2.5 mb-6 relative z-20">
                                                {socials
                                                    .filter((social) => social.id !== "email")
                                                    .map((social) => (
                                                        <li key={social.id}>
                                                            <a href={social.href} target="_blank" rel="noreferrer" className={SOCIAL_ROW}>
                                                                <SocialIcon id={social.id} size={18} />
                                                                <span className="font-mono text-sm font-semibold">{social.label}</span>
                                                                <span className="ml-auto truncate font-mono text-xs text-white/45">{social.value}</span>
                                                                <ArrowUpRight size={14} className="shrink-0 text-white/40 transition-colors group-hover:text-white" aria-hidden="true" />
                                                            </a>
                                                        </li>
                                                    ))}
                                            </ul>

                                            {/* Easter egg, kept out of the way */}
                                            <button
                                                onClick={() => setView('dino')}
                                                className="relative z-20 inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white/70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/60"
                                            >
                                                <Gamepad2 size={12} aria-hidden="true" />
                                                Offline mode
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="dino-view"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 pt-16 pb-8"
                                        >
                                            <h2 className="font-mono text-lg font-bold text-center mb-6 tracking-widest text-[#fff]">SYSTEM OFFLINE</h2>
                                            <div className="glass-lite w-full max-w-2xl h-64 rounded-2xl overflow-hidden relative group">
                                                <div className="absolute inset-0 rounded-[inherit] bg-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_0_0_1px_rgba(255,255,255,0.1)] z-10 pointer-events-none group-focus-within:bg-transparent"></div>
                                                <iframe
                                                    src="/dino/index.html"
                                                    className="w-full h-full opacity-80 mix-blend-screen"
                                                    style={{ filter: "invert(1) hue-rotate(180deg) contrast(1.2)" }}
                                                    title="Dino Game"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </GlassSurface>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
