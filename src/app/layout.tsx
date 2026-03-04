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
  openGraph: {
    title: "Sergey Ashughyan | Developer & Automation Architect",
    description: "Monochrome portfolio of Sergey Ashughyan - Full Stack Web Developer and n8n Automation Specialist.",
    url: "https://ashseryoja.github.io/seryoja-portfolio-self-branding-website/",
    siteName: "Sergey Ashughyan",
    images: [
      {
        url: "/assets/link-preview.jpeg",
        width: 1200,
        height: 630,
        alt: "Sergey Ashughyan Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergey Ashughyan | Developer & Automation Architect",
    description: "Monochrome portfolio of Sergey Ashughyan - Full Stack Web Developer and n8n Automation Specialist.",
    images: ["/assets/link-preview.jpeg"],
  },
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
