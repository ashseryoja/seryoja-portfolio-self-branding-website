import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SocialDock from "@/components/SocialDock";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Sergey Ashughyan | Developer & Automation Architect",
  description: "Monochrome portfolio of Sergey Ashughyan - Full Stack Web Developer and n8n Automation Specialist.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white font-sans overflow-x-hidden min-h-screen flex flex-col`}>
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
        <SocialDock />
      </body>
    </html>
  );
}
