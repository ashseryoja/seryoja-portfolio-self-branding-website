import { Github, Linkedin, Mail, Send, type LucideProps } from "lucide-react";
import type { SocialId } from "@/content/profile";

const ICONS = { email: Mail, linkedin: Linkedin, github: Github, telegram: Send } as const;

export default function SocialIcon({ id, ...props }: { id: SocialId } & LucideProps) {
  const Icon = ICONS[id];
  return <Icon aria-hidden="true" {...props} />;
}
