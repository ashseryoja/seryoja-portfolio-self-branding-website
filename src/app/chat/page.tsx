"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "system-1",
            role: "assistant",
            content: "Terminal initialized. How can I assist you today?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const containerRef = useRef<HTMLDivElement>(null);

    // Dynamic visualViewport tracking to counter-act iOS Safari panning the fixed header off-screen
    useEffect(() => {
        if (!window.visualViewport) return;

        const vp = window.visualViewport;
        const updateLayout = () => {
            if (containerRef.current) {
                // OffsetTop measures how far Safari panned the layout viewport up
                // We set 'top' to this exact offset to lock it to the visible screen edge
                containerRef.current.style.top = `${vp.offsetTop}px`;
                containerRef.current.style.height = `${vp.height}px`;
            }
            // Ensure messages are scrolled to bottom as view shrinks
            setTimeout(scrollToBottom, 50);
        };

        vp.addEventListener("resize", updateLayout);
        vp.addEventListener("scroll", updateLayout);
        window.addEventListener("scroll", updateLayout);

        // Initial layout calculation
        updateLayout();

        return () => {
            vp.removeEventListener("resize", updateLayout);
            vp.removeEventListener("scroll", updateLayout);
            window.removeEventListener("scroll", updateLayout);
        };
    }, []);

    // Strict iOS Safari background scroll and pan prevention
    useEffect(() => {
        const preventPan = (e: TouchEvent) => {
            const scrollArea = document.getElementById("chat-scroll-area");
            // If dragging inside the chat area, allow normal scroll
            if (scrollArea && scrollArea.contains(e.target as Node)) {
                return;
            }
            // Otherwise, prevent dragging the background/layout viewport
            if (e.cancelable) {
                e.preventDefault();
            }
        };

        // Use passive: false to allow preventDefault to work
        document.addEventListener("touchmove", preventPan, { passive: false });
        // Also strictly lock the HTML/Body tags globally just in case
        document.documentElement.classList.add("overflow-hidden");
        document.body.classList.add("overflow-hidden");

        return () => {
            document.removeEventListener("touchmove", preventPan);
            document.documentElement.classList.remove("overflow-hidden");
            document.body.classList.remove("overflow-hidden");
        };
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Send payload to Next.js API Route which proxies to n8n webhook
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Fallback robust payload structure that most n8n templates expect
                body: JSON.stringify({
                    chatInput: userMessage.content,
                    message: userMessage.content,
                    query: userMessage.content,
                    sessionId: "user-session-" + Math.floor(Math.random() * 10000)
                }),
            });

            const data = await res.json();

            // Handle the structured response from our Next.js API route ({ reply: "..." })
            // as well as providing safety fallbacks if data is an array
            let textOutput = "Error: Could not parse response.";

            if (Array.isArray(data)) {
                textOutput = data[0]?.reply || data[0]?.output || "Message not found in array response.";
            } else if (data.reply) {
                textOutput = data.reply;
            } else if (data.output) {
                textOutput = data.output;
            } else if (typeof data === "string") {
                textOutput = data;
            } else if (data.error) {
                textOutput = `[System Error]: ${data.error}`;
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: textOutput,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now().toString(), role: "assistant", content: "Connection to n8n node lost. Please try again." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed left-0 w-full flex flex-col bg-black text-white overflow-hidden z-[40]"
            style={{ height: "100dvh", top: 0 }}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[#000000] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

            {/* Header */}
            <header className="shrink-0 relative z-10 flex items-center justify-center px-6 h-24 border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="flex items-center gap-3 md:ml-0">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <Terminal size={18} className="text-white/70" />
                    </div>
                    <div>
                        <h1 className="font-mono text-sm font-bold tracking-tight">n8n_Agent_Session</h1>
                        <p className="text-[10px] sm:text-xs font-mono text-white/40 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            System Online
                        </p>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div
                id="chat-scroll-area"
                className="flex-1 overflow-y-auto overscroll-none relative z-10 p-4 sm:p-6 space-y-6 scroll-smooth"
            >
                <div className="max-w-3xl mx-auto space-y-6">
                    <AnimatePresence initial={false}>
                        {messages.map((m) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} w-full`}
                            >
                                <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>

                                    {/* Avatar */}
                                    <div className="shrink-0 mt-1">
                                        {m.role === "user" ? (
                                            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono text-xs font-bold">
                                                U
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full border border-white/20 bg-black overflow-hidden relative flex items-center justify-center">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
                                                    <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className={`px-4 py-3 rounded-2xl border flex flex-col ${m.role === "user" ? "bg-white text-black border-transparent rounded-tr-sm" : "bg-white/[0.03] border-white/10 text-white rounded-tl-sm backdrop-blur-sm"}`}>
                                        <p className="text-sm font-sans leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Loading Indicator */}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start w-full"
                            >
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full border border-white/20 bg-black overflow-hidden shrink-0 mt-1 flex items-center justify-center">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/40">
                                            <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631" />
                                        </svg>
                                    </div>
                                    <div className="px-4 py-3 sm:py-4 rounded-2xl border bg-white/[0.03] border-white/10 rounded-tl-sm flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_0ms]"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_150ms]"></span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[bounce_1s_infinite_300ms]"></span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} className="h-4" /> {/* Spacer */}
                </div>
            </div>

            {/* Input Dock */}
            <div className="shrink-0 relative z-10 p-4 pb-28 lg:pb-8 bg-gradient-to-t from-black via-black to-transparent">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-3xl mx-auto relative flex items-center"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Initialize command..."
                        disabled={isLoading}
                        className="w-full bg-white/[0.05] border border-white/10 focus:border-white/30 rounded-full py-4 pl-6 pr-14 text-base sm:text-sm font-sans text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all disabled:opacity-50 backdrop-blur-md shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)]"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 p-2 bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                    >
                        <Send size={18} className="translate-x-[1px] -translate-y-[1px]" />
                    </button>
                </form>
            </div>
        </div>
    );
}
