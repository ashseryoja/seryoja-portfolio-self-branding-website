# Sergey Ashughyan — AI Engineer portfolio

Live: **https://seryoja-portfolio.vercel.app**

Personal site with a featured case study (UpSound AI), AI projects, experience, skills and an
AI assistant that answers questions about my work.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP + Lenis · React Three Fiber ·
`@samasante/liquid-glass` · OpenAI API

## How it's put together

| Path | What it does |
| --- | --- |
| `src/content/profile.ts` | Single source of truth for every fact on the site: hero, key numbers, case study, projects, experience, skills, links. |
| `src/components/sections/` | Homepage sections. Server components where possible; `MotionScope` adds the scroll motion on the client. |
| `src/app/api/chat/route.ts` | The assistant's route handler. Accepts only user / assistant turns from the client, caps message length and history, never leaks internal errors. |
| `src/lib/persona/` | System prompt = hand-written voice and linking rules (`*.md`) + a profile rendered from `profile.ts`, so the assistant can't drift from the page. |
| `src/app/opengraph-image.tsx` | Link-preview image generated at build time from the same data. |
| `src/app/robots.ts`, `src/app/sitemap.ts` | Crawling rules and sitemap; the homepage also ships JSON-LD `Person` data. |

## Run locally

```bash
npm install
cp .env.example .env.local   # add OPENAI_API_KEY for the assistant
npm run dev
```

## Updating content

Edit `src/content/profile.ts` — the page, metadata, link preview and assistant all update from it.
Only claim what you can show: the UpSound AI numbers were checked against the product's git
history on 2 Oct 2026.
