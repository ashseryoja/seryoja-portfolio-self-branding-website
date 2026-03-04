"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

export default function SocialDock() {
    const [hoverGithub, setHoverGithub] = useState(false);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            {/* Container */}
            <div className="flex items-center gap-6 px-6 py-3 rounded-full border border-white/20 bg-black/80 backdrop-blur-md">

                {/* GitHub with inline commit stream hover */}
                <div
                    className="relative flex items-center"
                    onMouseEnter={() => setHoverGithub(true)}
                    onMouseLeave={() => setHoverGithub(false)}
                >
                    {/* Commit Stream Animation */}
                    <div className={`absolute bottom-full mb-4 left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden transition-all duration-300 font-mono text-xs ${hoverGithub ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0 pointer-events-none'}`}>
                        <span className="animate-pulse">&gt; git push origin main...</span>
                    </div>

                    <a
                        href="https://github.com/ashseryoja"
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 transition-colors invert-hover rounded-full"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                </div>

                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/sergey-ashughyan-928350253/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 transition-colors invert-hover rounded-full"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={20} />
                </a>

                {/* Generic Contact / Email */}
                <a
                    href="mailto:ashseryoja@gmail.com"
                    className="p-2 transition-colors invert-hover rounded-full"
                    aria-label="Email"
                >
                    <Mail size={20} />
                </a>
            </div>
        </div>
    );
}
