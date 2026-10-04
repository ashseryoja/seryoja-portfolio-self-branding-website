import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "AI assistant",
  description: `Ask an AI assistant about ${profile.name}'s AI engineering experience, projects and stack. Answers are generated from his portfolio data.`,
  alternates: { canonical: "/chat" },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
