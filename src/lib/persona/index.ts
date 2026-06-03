import fs from "node:fs";
import path from "node:path";

const PERSONA_DIR = path.join(process.cwd(), "src", "lib", "persona");

const FILE_ORDER = [
  "style.md",
  "site-navigation.md",
  "about.md",
  "skills.md",
  "experience.md",
  "builds.md",
];

let cached: string | null = null;

export function getSystemPrompt(): string {
  if (process.env.NODE_ENV === "production" && cached) return cached;

  const sections = FILE_ORDER.map((file) => {
    const full = path.join(PERSONA_DIR, file);
    return fs.readFileSync(full, "utf-8").trim();
  });

  const prompt = sections.join("\n\n---\n\n");
  cached = prompt;
  return prompt;
}
