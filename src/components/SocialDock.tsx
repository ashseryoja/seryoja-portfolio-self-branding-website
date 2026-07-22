"use client";

import { Home, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SocialDock() {
    const [hoverChat, setHoverChat] = useState(false);
    const pathname = usePathname();

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
            {/* Container */}
            <div className="flex items-center gap-6 px-6 py-3 rounded-full border border-white/20 bg-black/80 backdrop-blur-md">

                {/* Main Page */}
                <Link
                    href="/"
                    className={`p-2 transition-colors rounded-full ${pathname === '/' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                    aria-label="Main Page"
                >
                    <Home size={20} />
                </Link>

                {/* AI Chat Page */}
                <div
                    className="relative flex items-center"
                    onMouseEnter={() => setHoverChat(true)}
                    onMouseLeave={() => setHoverChat(false)}
                >
                    {/* Hover text for AI Chat */}
                    <div className={`absolute bottom-full mb-4 left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden transition-all duration-300 font-mono text-xs ${hoverChat ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 pointer-events-none'}`}>
                        <span className="text-white/70">&gt; init chat...</span>
                    </div>

                    <Link
                        href="/chat"
                        className={`p-2 transition-colors rounded-full flex items-center justify-center ${pathname === '/chat' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                        aria-label="AI Chat Page"
                    >
                        <MessageCircle size={20} />
                    </Link>
                </div>

                {/* Contact Page */}
                <Link
                    href="/contact"
                    className={`p-2 transition-colors rounded-full ${pathname === '/contact' ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                    aria-label="Contact Page"
                >
                    <User size={20} />
                </Link>
            </div>
        </div>
    );
}
