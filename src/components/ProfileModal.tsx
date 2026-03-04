"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Send, Instagram, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
                {/* Profile Trigger Button */}
                {!isOpen && (
                    <motion.button
                        layoutId="profile-container"
                        onClick={() => setIsOpen(true)}
                        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 hover:border-white transition-colors group bg-black"
                        style={{ borderRadius: 9999 }}
                    >
                        <motion.div layoutId="profile-image" className="w-full h-full relative" style={{ borderRadius: 9999 }}>
                            <Image
                                src="/assets/profile.webp"
                                alt="Sergey Ashughyan"
                                fill
                                sizes="48px"
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </motion.div>
                    </motion.button>
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
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                            onClick={handleClose}
                        />

                        {/* Modal Container */}
                        <motion.div
                            layoutId="profile-container"
                            className="relative w-full max-w-sm bg-black border border-white/20 p-8 flex flex-col items-center z-10 overflow-hidden cursor-default"
                            animate={{
                                maxWidth: view === 'dino' ? '48rem' : '24rem',
                                minHeight: view === 'dino' ? '500px' : 'auto',
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            style={{ borderRadius: 24 }}
                        >

                            {/* Top Controls */}
                            {view === 'dino' && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setView('socials')}
                                    className="absolute top-4 left-4 p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10 z-20 flex items-center gap-2"
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
                                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10 z-30"
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
                                            className="relative w-24 h-24 overflow-hidden border-2 border-white/20 mb-6 shrink-0"
                                            style={{ borderRadius: 9999 }}
                                        >
                                            <Image
                                                src="/assets/profile.webp"
                                                alt="Sergey Ashughyan"
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        </motion.div>

                                        <h3 className="text-2xl font-bold font-mono mb-2">Sergey Ashughyan</h3>
                                        <p className="text-neutral-400 font-mono text-sm mb-8 text-center pt-1">
                                            Software Engineer & Low Code AI Automation Architect
                                        </p>

                                        {/* Social Links List */}
                                        <div className="w-full space-y-3 mb-8 relative z-20">
                                            <a href="https://github.com/ashseryoja" target="_blank" rel="noreferrer" className="flex items-center gap-4 w-full p-3 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all group">
                                                <Github size={20} />
                                                <span className="font-mono text-sm font-bold">GitHub</span>
                                            </a>

                                            <a href="https://www.linkedin.com/in/sergey-ashughyan-928350253/" target="_blank" rel="noreferrer" className="flex items-center gap-4 w-full p-3 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all group">
                                                <Linkedin size={20} />
                                                <span className="font-mono text-sm font-bold">LinkedIn</span>
                                            </a>

                                            <a href="https://t.me/ashseryoja" target="_blank" rel="noreferrer" className="flex items-center gap-4 w-full p-3 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all group">
                                                <Send size={20} />
                                                <span className="font-mono text-sm font-bold">Telegram</span>
                                            </a>

                                            <a href="https://instagram.com/ash.seryoja?igsh=MXA1Mm1mZWFlYzF6ag%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="flex items-center gap-4 w-full p-3 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all group">
                                                <Instagram size={20} />
                                                <span className="font-mono text-sm font-bold">Instagram</span>
                                            </a>
                                        </div>

                                        {/* Secret Button Placeholder */}
                                        <div className="w-full relative z-20">
                                            <button
                                                onClick={() => setView('dino')}
                                                className="w-full p-3 bg-white text-black font-mono font-bold rounded-xl hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2"
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
                                        <div className="w-full max-w-2xl h-64 border border-white/20 rounded-xl overflow-hidden bg-white/5 relative group">
                                            <div className="absolute inset-0 bg-transparent z-10 pointer-events-none group-focus-within:bg-transparent"></div>
                                            <iframe
                                                src="https://wayou.github.io/t-rex-runner/"
                                                className="w-full h-full opacity-80 mix-blend-screen"
                                                style={{ filter: "invert(1) hue-rotate(180deg) contrast(1.2)" }}
                                                title="Dino Game"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
