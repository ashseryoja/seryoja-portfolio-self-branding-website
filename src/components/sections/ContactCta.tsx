import { ArrowUpRight, Download, Mail } from "lucide-react";
import GlassSurface from "@/components/liquid/GlassSurface";
import SocialIcon from "@/components/SocialIcon";
import { profile, socials } from "@/content/profile";

export default function ContactCta() {
  const secondary = socials.filter((social) => social.id !== "email");

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 pb-10 pt-20 md:pt-28">
      <GlassSurface data-reveal tone="clear" className="rounded-[36px]" contentClassName="px-6 py-12 text-center sm:px-12 sm:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/50">
          <span className="tabular-nums text-white/35">07</span> · Contact
        </p>
        <h2 id="contact-title" className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl">
          Hiring an AI engineer? Let’s talk.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
          I’m open to AI Engineer roles. Email is the fastest way to reach me — the CV has the full details.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="lg-press inline-flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#ffffff_0%,#e4e6ec_100%)] px-6 py-3.5 font-mono text-[13px] text-black shadow-[inset_0_1px_0_#fff,inset_0_-1px_0_rgba(0,0,0,0.1),0_16px_36px_-16px_rgba(255,255,255,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-sm"
          >
            <Mail size={16} aria-hidden="true" />
            {profile.email}
          </a>
          <a
            href={profile.cv.href}
            download={profile.cv.fileName}
            className="glass-lite glass-lite-hover lg-press inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:text-sm"
          >
            Download CV
            <Download size={15} aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {secondary.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full font-mono text-xs text-white/65 transition-colors hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              >
                <SocialIcon id={social.id} size={15} strokeWidth={1.7} />
                {social.label}
                <span className="text-white/35">{social.value}</span>
                <ArrowUpRight size={12} className="text-white/35 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </GlassSurface>

      <footer className="mt-10 flex flex-col items-center justify-between gap-3 font-mono text-[11px] text-white/40 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <a
          href="https://github.com/ashseryoja/seryoja-portfolio-self-branding-website"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-white/80"
        >
          Source of this site on GitHub ↗
        </a>
      </footer>
    </section>
  );
}
