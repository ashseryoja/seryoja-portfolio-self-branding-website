import { Github, Linkedin, Mail, Send, Instagram } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Sergey Ashughyan",
    description: "Connect with Sergey Ashughyan - Full Stack Web Developer and n8n Automation Specialist.",
};

const contacts = [
    {
        name: "Email",
        value: "ashseryoja@gmail.com",
        href: "mailto:ashseryoja@gmail.com",
        icon: <Mail className="w-5 h-5" />,
    },
    {
        name: "Telegram",
        value: "@ashseryoja",
        href: "https://t.me/ashseryoja",
        icon: <Send className="w-5 h-5 -ml-0.5" />,
    },
    {
        name: "Instagram",
        value: "@ash.seryoja",
        href: "https://www.instagram.com/ash.seryoja?igsh=MXA1Mm1mZWFlYzF6ag%3D%3D&utm_source=qr",
        icon: <Instagram className="w-5 h-5" />,
    },
    {
        name: "LinkedIn",
        value: "Sergey Ashughyan",
        href: "https://www.linkedin.com/in/sergey-ashughyan-928350253/",
        icon: <Linkedin className="w-5 h-5" />,
    },
    {
        name: "GitHub",
        value: "ashseryoja",
        href: "https://github.com/ashseryoja",
        icon: <Github className="w-5 h-5" />,
    },
];

export default function ContactPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 pb-24 pt-20 overflow-hidden relative">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[#000000] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

            <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tighter mb-4 text-white">
                        <span className="text-white/50">/</span>connect
                    </h1>
                    <p className="text-white/60 font-sans max-w-sm mx-auto text-sm">
                        Reach out for collaborations, workflow automation architecture, or full-stack development inquiries.
                    </p>
                </div>

                {/* Contact Links */}
                <div className="w-full flex flex-col gap-4">
                    {contacts.map((contact) => (
                        <a
                            key={contact.name}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative w-full flex items-center justify-between p-4 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Gradient Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="p-3 bg-black flex items-center justify-center rounded-xl border border-white/10 text-white/70 group-hover:text-white transition-colors">
                                    {contact.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-mono text-xs text-white/40 uppercase tracking-wider mb-1">
                                        {contact.name}
                                    </span>
                                    <span className="font-mono text-sm text-white group-hover:tracking-wide transition-all duration-300">
                                        {contact.value}
                                    </span>
                                </div>
                            </div>

                            <div className="text-white/30 group-hover:text-white transition-colors relative z-10">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </div>
    );
}
