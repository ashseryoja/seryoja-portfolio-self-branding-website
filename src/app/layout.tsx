import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SocialDock from "@/components/SocialDock";
import ProfileModal from "@/components/ProfileModal";
import LiquidBackdrop from "@/components/liquid/LiquidBackdrop";
import SmoothScroll from "@/components/liquid/SmoothScroll";
import { profile, site } from "@/content/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${profile.name}`,
  },
  description: site.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  manifest: "/manifest.json",
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: profile.name,
    locale: "en_US",
    type: "profile",
    firstName: profile.firstName,
    lastName: profile.lastName,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <head>
        {/* Lets CSS hold hero elements for their entrance before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#040406] text-white font-sans overflow-x-hidden min-h-screen flex flex-col`}>
        <LiquidBackdrop />
        <SmoothScroll />
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
        <ProfileModal />
        <SocialDock />
      </body>
    </html>
  );
}
