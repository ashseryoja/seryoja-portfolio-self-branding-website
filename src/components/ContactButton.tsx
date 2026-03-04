"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function ContactButton() {
    return (
        <Link
            href="/contact"
            className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 group flex items-center justify-center w-14 h-14 bg-white text-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] hover:scale-110 transition-all duration-300 animate-bounce"
            aria-label="Go to Contact Page"
        >
            <MessageSquare className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
    );
}
