import GithubActivity from "@/components/GithubActivity";
import MotionScope from "@/components/liquid/MotionScope";
import TopNav from "@/components/TopNav";
import CaseStudy from "@/components/sections/CaseStudy";
import ContactCta from "@/components/sections/ContactCta";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import WebWork from "@/components/sections/WebWork";
import type { Metadata } from "next";
import { caseStudy, education, profile, site, skills, socials } from "@/content/profile";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Structured data so search engines and recruiters' tools read the page as a person profile.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.summary,
  url: site.url,
  image: `${site.url}${profile.photo}`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Yerevan", addressCountry: "AM" },
  worksFor: { "@type": "Organization", name: caseStudy.name, url: caseStudy.url },
  alumniOf: { "@type": "CollegeOrUniversity", name: education[0].school },
  knowsLanguage: profile.languages.map((language) => language.name),
  knowsAbout: skills[0].items,
  sameAs: socials.filter((social) => social.id !== "email").map((social) => social.href),
};

export default function Home() {
  return (
    <MotionScope className="relative min-h-screen bg-transparent text-white">
      <TopNav />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-48 pt-24 selection:bg-white selection:text-black sm:px-6 sm:pt-28">
        <Hero />
        <Highlights />
        <CaseStudy />
        <Projects />
        <Experience />
        <Skills />
        <WebWork />
        <GithubActivity />
        <ContactCta />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </MotionScope>
  );
}
