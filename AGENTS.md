<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Website Design-Study Template

## What This Is

A reusable template for **studying the design patterns** of public websites and building **inspired-by** Next.js codebases — NOT a website cloner. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded — just run `/design-study <url1> [<url2> ...]`.

The skill extracts layout, spacing rhythm, typography hierarchy, component composition, and interaction patterns from a target site. It then builds a structurally-similar but visibly distinct template using **placeholder content** (Lorem ipsum / Unsplash / Lucide / Geist), a **hue-shifted color palette** (20–40° rotation from the target's), and **generic fonts** (never brand fonts).

The output is a starting point for the user's own design — not a copy.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React (default and only — no SVGs extracted from target)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **Deployment:** Vercel

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style

- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Design Principles

- **Pattern fidelity, not pixel fidelity** — match layout, spacing rhythm, typography hierarchy, and interaction model. Colors and content are deliberately distinct.
- **Placeholder content only** — Lorem ipsum / generic SaaS copy; Unsplash random imagery; Lucide icons; monogram placeholder logos. Never copy text > 5 words verbatim. Never download assets from the target.
- **Hue-shifted palette** — extract the target's palette to understand intent, then shift hue 20–40° for the actual implementation. Original and shifted values are recorded in `docs/research/INSPIRATION_NOTES.md` for transparency.
- **Generic fonts** — Geist / Inter / Source Serif 4 / JetBrains Mono. Never the target's brand font.
- **De-branded output** — no logos, no favicons, no OG images extracted from target. Build a placeholder monogram instead.
- **Beauty-first** — every pixel matters, but the pixels are *yours*.

## Hard Rules (the skill enforces these)

The `/design-study` skill must refuse to proceed if any of these would be violated:

1. No verbatim copy of any text fragment longer than 5 consecutive words
2. No asset downloads from the target (images, videos, SVGs, favicons, logos)
3. No exact target color palette — always hue-shifted
4. No target brand fonts — generic equivalents only
5. No traced or copied logos / brand marks
6. No favicons or OG images from target

The skill also performs a `robots.txt` check and a legal acknowledgment gate before proceeding. See `LEGAL.md` for the full rationale.

## Project Structure

```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Lucide-based icon registry (NO target SVGs)
  lib/
    utils.ts        # cn() utility (shadcn)
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  seo/              # Generic monogram favicon, generic OG image
                    # NOTE: no /images or /videos extracted from target
docs/
  research/         # INSPIRATION_NOTES.md, BEHAVIORS.md, PAGE_TOPOLOGY.md, components/
  design-references/
    notes/          # Reference screenshots — NOT shipped, NOT in public/
templates/
  DISCLAIMER.md     # Template emitted into generated projects on completion
LEGAL.md            # Project legal posture and what is/isn't allowed
```

## MOST IMPORTANT NOTES

- When launching agent teams, ALWAYS have each teammate work in their own worktree branch and merge at the end. As orchestrator you have full context — resolve merge conflicts intelligently.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files.
- After editing `.claude/skills/design-study/SKILL.md`, run `node scripts/sync-skills.mjs` to regenerate the skill for all platforms.
- After completing a design study, the skill MUST emit a `DISCLAIMER.md` into the generated project root using `templates/DISCLAIMER.md` as a base. Fill in target URL(s), date, hue shift applied, fonts substituted, and de-branding confirmations.

@docs/research/INSPECTION_GUIDE.md
