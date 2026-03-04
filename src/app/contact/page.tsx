"use client";

import dynamic from 'next/dynamic';
import { Github, Linkedin, Mail, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const NetworkBackground = dynamic(() => import('@/components/NetworkBackground'), { ssr: false });

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const items = gsap.utils.toArray('.contact-item');
        gsap.fromTo(items,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-[100dvh] bg-black text-white flex flex-col items-center justify-center overflow-hidden selection:bg-white selection:text-black">
            <NetworkBackground />

            {/* Return Button */}
            <Link href="/" className="fixed top-8 left-8 md:top-12 md:left-12 z-50 flex items-center gap-2 font-mono text-sm tracking-widest uppercase hover:text-white/70 transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Core
            </Link>

            <main className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-16 md:mt-0 py-20 flex flex-col items-center text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 contact-item">
                    ESTABLISH<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">CONNECTION</span>
                </h1>
                <p className="text-neutral-400 font-light text-lg mb-16 max-w-md contact-item">
                    Available for new opportunities. Access the standard communication protocols below.
                </p>

                <div className="flex flex-col gap-6 w-full max-w-sm">
                    {/* Email */}
                    <a href="mailto:ashseryoja@gmail.com" className="contact-item group relative flex items-center justify-between p-6 border border-white/20 rounded-lg hover:border-white hover:bg-white transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <Mail className="w-6 h-6 group-hover:text-black transition-colors" />
                            <span className="font-mono text-lg group-hover:text-black transition-colors">ashseryoja@gmail.com</span>
                        </div>
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/sergey-ashughyan-928350253/" target="_blank" rel="noreferrer" className="contact-item group relative flex items-center justify-between p-6 border border-white/20 rounded-lg hover:border-white hover:bg-white transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <Linkedin className="w-6 h-6 group-hover:text-black transition-colors" />
                            <span className="font-mono text-lg group-hover:text-black transition-colors">LinkedIn</span>
                        </div>
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/ashseryoja" target="_blank" rel="noreferrer" className="contact-item group relative flex items-center justify-between p-6 border border-white/20 rounded-lg hover:border-white hover:bg-white transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <Github className="w-6 h-6 group-hover:text-black transition-colors" />
                            <span className="font-mono text-lg group-hover:text-black transition-colors">GitHub</span>
                        </div>
                    </a>
                </div>
            </main>
        </div>
    );
}
