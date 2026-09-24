"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { Github, Linkedin, Send, Instagram, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlassSurface from "@/components/liquid/GlassSurface";
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
    "glass-lite glass-lite-hover flex items-center gap-4 w-full px-4 py-3 rounded-2xl text-white hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/60 group";

export default function ProfileModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<'socials' | 'dino'>('socials');

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => setView('socials'), 500);
    };

    return (
        <>
            <AnimatePresence>
                {/* Profile Trigger Button & Callout Container */}
                {!isOpen && (
                    <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
                        <motion.button
                            onClick={() => setIsOpen(true)}
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
                                        src="/assets/profile.webp"
                                        alt="Sergey Ashughyan"
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

                        {/* Animated 'Click Here' SVG + Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, 0] }}
                            transition={{
                                duration: 8,
                                times: [0, 0.05, 0.95, 1], // Fades in quickly, stays for 7+ seconds, fades out at the end of 8s
                                ease: "easeInOut"
                            }}
                            className="flex items-center gap-2 pointer-events-none"
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white/90 relative top-px drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
                                style={{
                                    animation: "bounce-horizontal 1.5s infinite"
                                }}
                            >
                                <style>
                                    {`
                                        @keyframes bounce-horizontal {
                                            0%, 100% { transform: translateX(0); }
                                            50% { transform: translateX(-25%); }
                                        }
                                    `}
                                </style>
                                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                            </svg>
                            <span className="glass-chip rounded-full px-3 py-1.5 font-mono text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap overflow-hidden">
                                Click Here
                            </span>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

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
                                                    src="/assets/profile.webp"
                                                    alt="Sergey Ashughyan"
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover"
                                                />
                                                <span
                                                    aria-hidden
                                                    className="absolute inset-0 rounded-full bg-[radial-gradient(120%_85%_at_30%_0%,rgba(255,255,255,0.24),transparent_55%)] pointer-events-none"
                                                />
                                            </motion.div>

                                            <h3 className="text-2xl font-bold font-mono mb-2 text-white tracking-tight">Sergey Ashughyan</h3>
                                            <p className="text-white/60 font-mono text-sm leading-relaxed mb-8 text-center pt-1">
                                                Software Engineer & Low Code AI Automation Architect
                                            </p>

                                            {/* Social Links List */}
                                            <div className="w-full space-y-3 mb-8 relative z-20">
                                                <a href="https://github.com/ashseryoja" target="_blank" rel="noreferrer" className={SOCIAL_ROW}>
                                                    <Github size={20} />
                                                    <span className="font-mono text-sm font-bold">GitHub</span>
                                                </a>

                                                <a href="https://www.linkedin.com/in/sergey-ashughyan-928350253/" target="_blank" rel="noreferrer" className={SOCIAL_ROW}>
                                                    <Linkedin size={20} />
                                                    <span className="font-mono text-sm font-bold">LinkedIn</span>
                                                </a>

                                                <a href="https://t.me/ashseryoja" target="_blank" rel="noreferrer" className={SOCIAL_ROW}>
                                                    <Send size={20} />
                                                    <span className="font-mono text-sm font-bold">Telegram</span>
                                                </a>

                                                <a href="https://instagram.com/ash.seryoja?igsh=MXA1Mm1mZWFlYzF6ag%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className={SOCIAL_ROW}>
                                                    <Instagram size={20} />
                                                    <span className="font-mono text-sm font-bold">Instagram</span>
                                                </a>
                                            </div>

                                            {/* Secret Button Placeholder */}
                                            <div className="w-full relative z-20">
                                                <button
                                                    onClick={() => setView('dino')}
                                                    className="lg-press w-full px-5 py-3.5 bg-[linear-gradient(180deg,#ffffff_0%,#e9ebf1_100%)] text-black font-mono font-bold rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.35),0_16px_36px_-16px_rgba(255,255,255,0.45),0_12px_24px_-14px_rgba(0,0,0,0.85)] flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                                                >
                                                    ??? (Secret Mechanism)
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="dino-view"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 pt-16 pb-8"
                                        >
                                            <h3 className="font-mono text-lg font-bold text-center mb-6 tracking-widest text-[#fff]">SYSTEM OFFLINE</h3>
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
