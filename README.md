# AI Website Design-Study Template

<a href="https://github.com/FUKI618/ai-website-design-study-template/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License" /></a>

A reusable template for **studying the design patterns** of a public website and building an **inspired-by** Next.js codebase using AI coding agents.

> **This is not a website cloner.** It does not produce a copy. The output is structurally-similar but visibly distinct: the target's layout/rhythm/composition informs the work, but all content (text, images, icons, logos) is replaced with placeholders, the color palette is hue-shifted 20–40°, and brand fonts are swapped for generic equivalents. See [`LEGAL.md`](./LEGAL.md) for the rationale.

This is a fork of [`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template) modified to **prevent the legal risks** of cloning while preserving the value of pattern study. See [`LEGAL.md`](./LEGAL.md) for a full diff of behavior.

**Recommended: [Claude Code](https://docs.anthropic.com/en/docs/claude-code) with Opus 4.6** — but works with a variety of AI coding agents.

Point it at a URL, run `/design-study`, and your AI agent will inspect the site, extract structural design patterns, write component specs, and dispatch parallel builders to construct an inspired-by template.

## Quick Start — pick the launch path that fits

There are three ways to invoke `/design-study`. They differ only in how the skill is registered with your AI agent.

### Path A — One-line bootstrap (zsh helper)

Drop this function into your `~/.zshrc` once:

```bash
design-study() {
  if [ -z "$1" ]; then print -u2 "usage: design-study <target-url>"; return 1; fi
  local slug="$(date +%Y%m%d-%H%M)-$(echo "$1" | sed -E 's|^https?://||; s|/.*||; s|[^a-zA-Z0-9]|-|g' | cut -c1-32)"
  local dir="$HOME/Code/studies/$slug"
  mkdir -p "$HOME/Code/studies"
  [ -d "$dir" ] && { print -u2 "exists: $dir"; return 1; }
  git clone --quiet https://github.com/FUKI618/ai-website-design-study-template.git "$dir" || return 1
  cd "$dir" || return 1
  npm install --silent --no-fund --no-audit || return 1
  print "✓ ready. in Claude Code, type:  /design-study $1"
  print "         then ack with:  I understand — proceed with the design study."
  claude
}
```

Then any time you want to study a site:

```bash
design-study https://target.example/
```

→ fresh study repo cloned under `~/Code/studies/<date-slug>/`, deps installed, Claude Code launched in that directory. You then type the slash command shown.

### Path B — User-scope skill (run `/design-study` from anywhere)

If you want `/design-study` available globally in every Claude Code session (regardless of which directory it was launched from), symlink the skill into your user-scope:

```bash
git clone https://github.com/FUKI618/ai-website-design-study-template.git ~/Code/ai-website-design-study-template
mkdir -p ~/.claude/skills
ln -sf ~/Code/ai-website-design-study-template/.claude/skills/design-study ~/.claude/skills/design-study
```

Restart Claude Code. The slash command is now globally available. **Caveat:** the skill needs a properly-scaffolded Next.js project (this template) to write into; running it in an unrelated directory will fail at the `npm run build` pre-flight. Combine with Path A or use `gh repo create --template …` first.

### Path C — Project-local (classic)

Treat this repo as a one-off scaffold:

```bash
gh repo create my-study --template FUKI618/ai-website-design-study-template --clone
cd my-study
npm install
claude --chrome
# in Claude Code:
/design-study <target-url>
```

When prompted, reply with the exact ack: **`I understand — proceed with the design study.`**

> Using a different agent? Open `AGENTS.md` for project instructions — most agents pick it up automatically.

## Supported Platforms

| Agent                                                         | Status                     |
| ------------------------------------------------------------- | -------------------------- |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | **Recommended** — Opus 4.6 |
| [Codex CLI](https://github.com/openai/codex)                  | Supported                  |
| [OpenCode](https://opencode.ai/)                              | Supported                  |
| [GitHub Copilot](https://github.com/features/copilot)         | Supported                  |
| [Cursor](https://cursor.com/)                                 | Supported                  |
| [Windsurf](https://codeium.com/windsurf)                      | Supported                  |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli)     | Supported                  |
| [Cline](https://github.com/cline/cline)                       | Supported                  |
| [Roo Code](https://github.com/RooCodeInc/Roo-Code)            | Supported                  |
| [Continue](https://continue.dev/)                             | Supported                  |
| [Amazon Q](https://aws.amazon.com/q/developer/)               | Supported                  |
| [Augment Code](https://www.augmentcode.com/)                  | Supported                  |
| [Aider](https://aider.chat/)                                  | Supported                  |

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- An AI coding agent (see [Supported Platforms](#supported-platforms))

## Tech Stack

- **Next.js 16** — App Router, React 19, TypeScript strict
- **shadcn/ui** — Radix primitives + Tailwind CSS v4
- **Tailwind CSS v4** — oklch design tokens (hue-shifted from target)
- **Lucide React** — icons (the only icon source — no extracted SVGs from target)

## Verified Pipeline

The skill's pre-flight + reconnaissance phases were smoke-tested against `linear.app` on 2026-04-28. The hue-shift correctly transformed Linear's signature indigo accent (`rgb(94, 106, 210)`) into a clearly distinct violet (`rgb(134, 94, 210)`) at +27°, with grayscale tiers preserved as expected. Two SKILL.md improvements were surfaced and applied during the run.

Full report and artifacts: [`docs/research/linear.app/SMOKE_TEST_REPORT.md`](./docs/research/linear.app/SMOKE_TEST_REPORT.md), [`docs/research/linear.app/INSPIRATION_NOTES.md`](./docs/research/linear.app/INSPIRATION_NOTES.md).

## How It Works

The `/design-study` skill runs a multi-phase pipeline with **mandatory legal pre-flight**:

0. **Pre-flight gate** — explicit user acknowledgment + `robots.txt` check + URL validation
1. **Reconnaissance** — screenshots (kept as local research notes, not shipped), structural pattern extraction, interaction sweep (scroll, click, hover, responsive)
2. **Foundation** — applies generic fonts, hue-shifted palette, placeholder monogram favicon. **No assets downloaded from target.**
3. **Component Specs** — writes detailed spec files (`docs/research/components/`) capturing layout/spacing/typography patterns and behaviors. Specs use **Content Schema** (shape of content), not verbatim text. Specs use **Asset Strategy** (Unsplash random / Lucide), not target downloads.
4. **Parallel Build** — dispatches builder agents in git worktrees, one per section/component. Each builder receives hard-rule reminders: placeholder content only, no target references.
5. **Assembly & Pattern Verification** — merges worktrees, wires up the page, verifies the output looks **clearly different** from the target (any failure = fix the palette shift / copy / imagery further). Emits `DISCLAIMER.md` recording the safeguards applied.

Each builder agent receives the full component specification inline — exact `getComputedStyle()` values for layout, interaction models, multi-state structural patterns, responsive breakpoints. Brand attributes are filtered out at the spec layer.

## Hard Rules (the skill enforces these)

The skill refuses to proceed or fixes builder output that violates any of:

1. No text fragment > 5 consecutive words copied verbatim
2. No image/video/SVG/favicon/logo downloaded from target
3. No exact target color palette (always hue-shifted 20–40°)
4. No target brand fonts (generic equivalents only)
5. No traced or copied logos (placeholder monogram only)
6. No favicons / OG images from target

See [`LEGAL.md`](./LEGAL.md) for the full posture and rationale.

## Use Cases

- **Self-owned site rebuild with a fresh take** — port your own site to a modern stack while the de-branding pass forces a deliberate refresh, not a stale 1:1 copy
- **Design study / education** — deconstruct how production sites achieve specific layouts, animations, and responsive behavior by working with real code, with no risk of accidental infringement
- **Inspired-by alternatives** — start a new product whose design is informed by a reference you admire, with a built-in audit trail (`DISCLAIMER.md`) showing you did so transformatively
- **Design language exploration** — point it at multiple sites in the same style space (e.g., several SaaS landing pages) to extract a shared pattern vocabulary

## Not Intended For

- **Cloning third-party sites for deployment.** The skill refuses; do not work around the safeguards
- **Phishing or impersonation.** Forbidden
- **Sites whose `robots.txt` disallows automation.** The skill refuses
- **Passing off someone's design as your own.** The output is *inspired by*, and the auto-generated `DISCLAIMER.md` documents it

## Project Structure

```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Lucide icon registry (NO target SVGs)
  lib/utils.ts      # cn() utility
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  seo/              # Generic monogram favicon (NO target downloads)
docs/
  research/         # INSPIRATION_NOTES.md, BEHAVIORS.md, PAGE_TOPOLOGY.md, components/
  design-references/
    notes/          # Reference screenshots — local research only, not deployed
templates/
  DISCLAIMER.md     # Emitted into generated projects on completion
scripts/
  sync-agent-rules.sh  # Regenerate agent instruction files from AGENTS.md
  sync-skills.mjs      # Regenerate /design-study for all platforms from SKILL.md
AGENTS.md           # Agent instructions (single source of truth)
CLAUDE.md           # Claude Code config (imports AGENTS.md)
GEMINI.md           # Gemini CLI config (imports AGENTS.md)
LEGAL.md            # Project legal posture
```

## Commands

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint check
npm run typecheck # TypeScript check
npm run check  # Run lint + typecheck + build
```

### If using docker

```bash
docker compose up app --build # build and run the app
docker compose up dev --build # run the app in dev mode on port 3001
```

## Updating for Other Platforms

Two source-of-truth files power all platform support. Edit the source, then run the sync script:

| What                  | Source of truth                          | Sync command                       |
| --------------------- | ---------------------------------------- | ---------------------------------- |
| Project instructions  | `AGENTS.md`                              | `bash scripts/sync-agent-rules.sh` |
| `/design-study` skill | `.claude/skills/design-study/SKILL.md`   | `node scripts/sync-skills.mjs`     |

Each script regenerates the platform-specific copies automatically.

## Acknowledgments

Original architecture: [`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template) (MIT). The pipeline (recon → spec → parallel-builders → merge) and the Next.js + shadcn/ui scaffold are inherited from upstream. Modifications in this fork are scoped to the legal posture, the skill's content/asset/brand handling, and the addition of `LEGAL.md` / `DISCLAIMER.md` artifacts.

## License

MIT (inherited from upstream)
