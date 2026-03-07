"use client";

import { Home, User } from "lucide-react";
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

                {/* AI Chat Page (n8n) */}
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
                        {/* Official n8n SVG icon */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" />
                        </svg>
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
