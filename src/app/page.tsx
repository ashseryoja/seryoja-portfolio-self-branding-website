"use client";

import dynamic from 'next/dynamic';
import Image from "next/image";
const NetworkBackground = dynamic(() => import('@/components/NetworkBackground'), { ssr: false });
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Kinetic Reveal for sections
    const sections = gsap.utils.toArray<HTMLElement>('.reveal-section');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50, skewY: 5 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen text-white bg-transparent">
      <NetworkBackground />

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-48 selection:bg-white selection:text-black">

        {/* HERO SECTION */}
        <section className="min-h-[80vh] flex flex-col justify-center reveal-section">
          <h2 className="font-mono text-sm tracking-[0.3em] uppercase opacity-70 mb-4 animate-pulse">
            Junior Full Stack Web Developer & Low Code AI Automation Architect
          </h2>
          <h1 className="text-[12vw] sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] hover:animate-glitch transition-all cursor-default break-words">
            SERGEY<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">ASHUGHYAN</span>
          </h1>
          <p className="max-w-2xl text-xl font-light leading-relaxed text-neutral-400 mb-8">
            I build AI agents and automation systems with <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">n8n</span>, along with high-performance web applications.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/cv/sergey_cv.pdf"
              download="sergey_cv.pdf"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 bg-white/5 hover:bg-white hover:text-black font-mono text-sm uppercase tracking-wider transition-all duration-300 w-fit"
            >
              Download CV
            </a>
          </div>
        </section>

        {/* SKILLS GRID */}
        <section className="min-h-screen flex flex-col justify-center py-20 reveal-section">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-white/20 flex-1"></div>
            <h3 className="font-mono text-xl tracking-widest uppercase text-white/80">The Skills Grid</h3>
            <div className="h-px bg-white/20 w-12"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-white/10 p-8 rounded-sm hover:border-white/40 transition-colors group invert-hover">
              <h4 className="text-2xl font-bold mb-6 font-mono border-b border-white/10 pb-4 group-hover:border-black/20">Frontend</h4>
              <ul className="space-y-4 font-light text-lg">
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> React.js & Next.js</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> JavaScript / TypeScript</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> HTML, CSS, SCSS, Tailwind</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> PWA & WebGL (Three.js/GSAP)</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> WordPress Architecture</li>
              </ul>
            </div>

            <div className="border border-white/10 p-8 rounded-sm hover:border-white/40 transition-colors group invert-hover">
              <h4 className="text-2xl font-bold mb-6 font-mono border-b border-white/10 pb-4 group-hover:border-black/20">Backend & Automation</h4>
              <ul className="space-y-4 font-light text-lg">
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> <strong>n8n</strong> (Low-Code AI Automation)</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> API Integration & Webhooks</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> Node.js Ecosystem</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> C++ / Algorithmic Development</li>
                <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-white group-hover:bg-black transition-colors"></span> Git / Vercel Deployments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* THE LOG / EXPERIENCE */}
        <section className="py-20 reveal-section relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/10 md:left-1/2"></div>

          <div className="flex items-center gap-4 mb-20 relative z-10 w-full justify-center">
            <h3 className="font-mono text-xl tracking-widest uppercase text-white/80 bg-black px-4">The Log</h3>
          </div>

          <div className="space-y-24">
            {/* Experience 0: AI & Automation */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full group">
              <div className="md:text-right pl-12 md:pl-0 flex flex-col md:items-end">
                <h4 className="text-3xl font-bold font-mono">Ai automation low code engineer</h4>
                <p className="text-neutral-500 font-mono mt-1 mb-4">n8n automations</p>
                <div className="mt-6 border border-white/10 rounded-lg overflow-hidden relative group/img bg-white/5 w-full max-w-sm">
                  <Image
                    src="/log/n8n.jpg"
                    alt="n8n AI Automation Workflows"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover group-hover/img:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
              <div className="relative pl-12 md:pl-0">
                <div className="absolute left-[-2.25rem] md:left-[-2.5rem] top-2 w-4 h-4 rounded-full bg-black border-2 border-white group-hover:scale-125 transition-transform z-10"></div>
                <h5 className="font-bold font-mono text-lg mb-2">AI & Automation</h5>
                <p className="font-mono text-white/70 mb-2">Core Focus</p>
                <p className="text-neutral-300 font-light leading-relaxed mb-6">
                  I build AI-driven automation systems (n8n, OpenAI, APIs) to streamline operations and eliminate manual work.
                </p>

                <h5 className="font-bold font-mono text-lg mb-2">Featured Projects</h5>
                <ul className="space-y-4 text-neutral-300 font-light leading-relaxed mb-6">
                  <li className="flex gap-2">
                    <span className="text-white/50">•</span>
                    <span><strong>AI Inventory Manager:</strong> A smart Telegram bot (OpenAI + WordPress API) to instantly add, update, or fetch product data via natural language.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white/50">•</span>
                    <span><strong>Automated PDF Quotes:</strong> A B2B sales bot that instantly generates professional PDF proposals by extracting live product images and pricing from the database.</span>
                  </li>
                </ul>

              </div>
            </div>

            {/* Experience 1 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full group">
              <div className="md:text-right pl-12 md:pl-0 flex flex-col md:items-end">
                <h4 className="text-3xl font-bold font-mono">DEO HOME</h4>
                <p className="text-neutral-500 font-mono mt-1 mb-4">Full-stack Developer</p>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <a href="https://deohome.online/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono border border-white/20 py-1 px-3 rounded hover:bg-white hover:text-black transition-colors">
                    deohome.online
                  </a>
                  <a href="https://deooffice.ru/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-mono border border-white/20 py-1 px-3 rounded hover:bg-white hover:text-black transition-colors">
                    deooffice.ru
                  </a>
                </div>
              </div>
              <div className="relative pl-12 md:pl-0">
                <div className="absolute left-[-2.25rem] md:left-[-2.5rem] top-2 w-4 h-4 rounded-full bg-black border-2 border-white group-hover:scale-125 transition-transform z-10"></div>
                <p className="text-neutral-300 font-light leading-relaxed mb-4">
                  Engineered and single-handedly developed a high-End furniture catalog and commercial eCommerce platform. Maintained optimal performance using React concepts alongside customized WordPress database solutions.
                </p>
                <div className="my-8 border border-white/10 rounded-lg overflow-hidden relative group/img bg-white/5">
                  <Image
                    src="/assets/pwa-portfolio.webp"
                    alt="DEO HOME PWA Portfolio"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover group-hover/img:scale-105 transition-all duration-700"
                  />
                </div>
                <p className="text-neutral-300 font-light leading-relaxed border-l-2 border-white/20 pl-4 py-1 italic">
                  &quot;A modern Progressive Web Application for a furniture brand — fast, installable, offline-ready, with a premium tablet-optimized UI and seamless SPA experience, delivering a native-app experience directly in the browser.&quot;
                </p>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full group">
              <div className="md:text-right pl-12 md:pl-0">
                <h4 className="text-3xl font-bold font-mono">Naghashyan Solutions</h4>
                <p className="text-neutral-500 font-mono mt-1">Frontend Developer (Intern)</p>
              </div>
              <div className="relative pl-12 md:pl-0">
                <div className="absolute left-[-2.25rem] md:left-[-2.5rem] top-2 w-4 h-4 rounded-full bg-black border-2 border-white group-hover:scale-125 transition-transform z-10"></div>
                <p className="text-neutral-300 font-light leading-relaxed">
                  Mastered core frontend principles (HTML, CSS, Responsive design). Expanded computational thinking and data structures utilizing C++ for algorithmic problem solving.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* EDUCATION & ACADEMY */}
        <section className="py-20 reveal-section">
          <div className="flex items-center gap-4 mb-16">
            <h3 className="flex items-center gap-3 font-mono text-xl tracking-widest uppercase text-white/80">
              <GraduationCap className="w-6 h-6" />
              The Academy
            </h3>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full group">
            <div className="md:text-right border-l-2 md:border-l-0 md:border-r-2 border-white/10 pl-6 md:pl-0 md:pr-6">
              <h4 className="text-3xl font-bold font-mono">NPUA</h4>
              <p className="text-white font-mono mt-1">Software Engineering</p>
              <p className="text-neutral-500 font-mono text-sm mt-1">2022 - 2027</p>
            </div>
            <div className="pt-2 md:pt-0">
              <p className="text-neutral-300 font-light leading-relaxed">
                Currently studying at the National Polytechnical University of Armenia.<br />
                Pursuing a Bachelor of Applied Science with a focus on Software Engineering.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
