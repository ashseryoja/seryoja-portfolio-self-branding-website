import { Download, MapPin } from "lucide-react";
import type { Metadata } from "next";
import GlassSurface from "@/components/liquid/GlassSurface";
import SocialIcon from "@/components/SocialIcon";
import { profile, socials } from "@/content/profile";

export const metadata: Metadata = {
    title: "Contact",
    description: `Contact ${profile.name}, AI Engineer in ${profile.location}. ${profile.availability}.`,
    alternates: { canonical: "/contact" },
};

const rowLink =
    "group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[22px] p-4 outline-none focus-visible:ring-1 focus-visible:ring-white/60 sm:px-5";

export default function ContactPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 pb-32 pt-24 overflow-hidden relative">
            <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">

                {/* Header — soft halo behind the title, gradient hairline beneath the copy */}
                <div className="relative mb-10 text-center before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-56 before:w-[min(40rem,100vw)] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[radial-gradient(closest-side,rgba(170,185,255,0.14),rgba(170,185,255,0.04)_55%,transparent)] before:blur-2xl after:mx-auto after:mt-9 after:block after:h-px after:w-28 after:bg-gradient-to-r after:from-transparent after:via-white/35 after:to-transparent">
                    <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-300/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200/90 shadow-[inset_0_0_0_1px_rgba(110,231,183,0.22)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                        {profile.availability}
                    </p>
                    <h1 className="mb-5 text-5xl font-semibold leading-none tracking-[-0.04em] text-white md:text-7xl">
                        <span className="text-chrome">Let’s talk</span>
                    </h1>
                    <p className="mx-auto max-w-md font-sans text-[15px] leading-relaxed text-white/70 md:text-base">
                        Hiring for an AI Engineer role, or need an LLM feature taken to production? Email is the fastest way to reach me.
                    </p>
                    <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-xs text-white/45">
                        <MapPin size={12} aria-hidden="true" />
                        {profile.location} · {profile.timezone}
                    </p>
                </div>

                {/* Contact Links */}
                <ul className="w-full flex flex-col gap-3 sm:gap-3.5">
                    {socials.map((contact) => (
                        <li key={contact.id}>
                            <GlassSurface
                                tone={contact.id === "email" ? "clear" : "frost"}
                                interactive
                                className="w-full rounded-[22px] hover:[--glass-veil:rgba(14,14,20,0.2)] focus-within:[--glass-veil:rgba(14,14,20,0.2)] hover:shadow-[0_40px_80px_-34px_rgba(0,0,0,0.9),0_14px_30px_-16px_rgba(0,0,0,0.65)] motion-safe:hover:-translate-y-0.5 motion-safe:focus-within:-translate-y-0.5"
                            >
                                <a
                                    href={contact.href}
                                    target={contact.id === "email" ? undefined : "_blank"}
                                    rel={contact.id === "email" ? undefined : "noopener noreferrer"}
                                    className={rowLink}
                                >
                                    {/* A single specular glint travelling across the glass */}
                                    <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -translate-x-[120%] -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-none group-hover:translate-x-[220%] group-hover:transition-transform group-hover:duration-[1400ms] group-hover:ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-visible:translate-x-[220%] group-focus-visible:transition-transform group-focus-visible:duration-[1400ms] group-focus-visible:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:hidden" />

                                    <div className="relative z-10 flex min-w-0 items-center gap-4">
                                        <div className="glass-lite flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white/70 group-hover:bg-white/[0.06] group-hover:text-white group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_0_0_1px_rgba(255,255,255,0.16),0_10px_24px_-14px_rgba(0,0,0,0.9)] group-focus-visible:text-white [&>svg]:transition-[color,transform] [&>svg]:duration-500 [&>svg]:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:[&>svg]:scale-[1.08]">
                                            <SocialIcon id={contact.id} className="h-5 w-5" />
                                        </div>
                                        <div className="flex min-w-0 flex-col">
                                            <span className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                                                {contact.label}
                                                {contact.id === "email" ? <span className="ml-2 normal-case tracking-normal text-emerald-200/70">preferred</span> : null}
                                            </span>
                                            <span className="truncate font-mono text-sm text-white/90 transition-[letter-spacing,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:tracking-wide group-hover:text-white sm:text-[15px]">
                                                {contact.value}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-white/30 transition-[color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-white/[0.08] group-hover:text-white group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_0_0_1px_rgba(255,255,255,0.12)] group-focus-visible:bg-white/[0.08] group-focus-visible:text-white">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="-translate-x-5 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </a>
                            </GlassSurface>
                        </li>
                    ))}
                </ul>

                <a
                    href={profile.cv.href}
                    download={profile.cv.fileName}
                    className="glass-lite glass-lite-hover lg-press mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-wider text-white/85 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                >
                    <Download size={14} aria-hidden="true" />
                    Download CV (PDF)
                </a>
            </div>
        </div>
    );
}
