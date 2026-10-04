import fs from "node:fs";
import path from "node:path";
import {
  caseStudy,
  education,
  experience,
  highlights,
  profile,
  projects,
  skills,
  socials,
  webProjects,
} from "@/content/profile";

const PERSONA_DIR = path.join(process.cwd(), "src", "lib", "persona");

// Hand-written guidance: voice, linking rules, background.
const FILE_ORDER = ["style.md", "site-navigation.md", "about.md"];

const list = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");

/**
 * The factual half of the prompt is rendered from src/content/profile.ts — the
 * same data that renders the homepage — so the assistant can't drift from it.
 */
export function buildProfileMarkdown(): string {
  const contact = socials.map((social) => `- ${social.label}: ${social.value} (${social.href})`).join("\n");

  const roles = experience
    .map(
      (job) =>
        `## ${job.company} — ${job.role}\n*${[job.period, job.companyNote].filter(Boolean).join(" · ")}*\n${list(job.bullets)}` +
        (job.links?.length ? `\nLinks: ${job.links.map((link) => link.href).join(", ")}` : ""),
    )
    .join("\n\n");

  const study = education.map((item) => `- ${item.degree}, ${item.school} (${item.period})`).join("\n");

  const caseStudyMd = [
    `# Featured case study: ${caseStudy.name}`,
    `${caseStudy.tagline}. Role: ${caseStudy.role}, ${caseStudy.period}. ${caseStudy.ownership}`,
    `Problem: ${caseStudy.problem}`,
    `What I built: ${caseStudy.solution}`,
    `Results:\n${list(caseStudy.results)}`,
    caseStudy.highlights.map((item) => `### ${item.title}\n${item.body}`).join("\n\n"),
    `Architecture (★ = built by me): ${caseStudy.architecture
      .map((tier) => `${tier.tier}: ${tier.nodes.map((node) => (node.mine ? `${node.label} ★` : node.label)).join(", ")}`)
      .join(" → ")}`,
    caseStudy.scale,
    `Stack: ${caseStudy.stack.join(", ")}`,
    `Live: ${caseStudy.url}`,
  ].join("\n\n");

  const projectsMd = projects
    .map(
      (project) =>
        `## ${project.name} (${project.kind}, ${project.year})\n${project.summary}\n${list(project.bullets)}\nStack: ${project.stack.join(", ")}` +
        (project.note ? `\nStatus: ${project.note}` : "") +
        (project.link ? `\nLink: ${project.link.href}` : ""),
    )
    .join("\n\n");

  const webMd = webProjects.map((item) => `- ${item.name} — ${item.description} (${item.href})`).join("\n");

  return [
    `# Professional profile`,
    `${profile.name} — ${profile.role}. ${profile.focus}.`,
    profile.summary,
    `Availability: ${profile.availability}. Work format, start date, notice period and compensation are not published — ask by email. Location: ${profile.location}, ${profile.timezone}.`,
    `Languages: ${profile.languages.map((language) => `${language.name} (${language.level})`).join(", ")}.`,
    `CV (PDF): ${profile.cv.href}`,
    `Contact:\n${contact}`,
    `Key numbers:\n${list(highlights.map((item) => `${item.value} ${item.label} — ${item.detail}`))}`,
    caseStudyMd,
    `# Other AI projects\n\n${projectsMd}`,
    `# Experience\n\n${roles}`,
    `# Education\n${study}`,
    `# Skills\n${skills.map((group) => `- ${group.group}: ${group.items.join(", ")}`).join("\n")}`,
    `# Websites built for clients\n${webMd}`,
  ].join("\n\n");
}

let cached: string | null = null;

export function getSystemPrompt(): string {
  if (process.env.NODE_ENV === "production" && cached) return cached;

  const sections = FILE_ORDER.map((file) => fs.readFileSync(path.join(PERSONA_DIR, file), "utf-8").trim());
  const prompt = [...sections, buildProfileMarkdown()].join("\n\n---\n\n");
  cached = prompt;
  return prompt;
}
