# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.0] - 2026-04-28 — Three-Tier LP Stack: Exa + design-study + ClickHouse

This release wires the template into a complete landing-page workflow. Each layer is independent and the analytics layer degrades gracefully when not configured.

### Added — Layer 3: ClickHouse analytics

Cookie-less, server-side event tracking is now built in:

- `src/lib/clickhouse.ts` — lazy server-side client; returns null when env vars are missing
- `src/lib/analytics.ts` — client-side `track()`, `trackPageView()`, `trackCta()` using `navigator.sendBeacon` (fire-and-forget, never throws)
- `src/app/api/track/route.ts` — Node-runtime route handler that ingests events into ClickHouse; 204 no-op when credentials are not configured
- `db/migrations/001_events.sql` — `events` table (`MergeTree`, partitioned by month, 180-day TTL) plus a `events_daily` materialized view for rollup queries
- `.env.example` — documents `CLICKHOUSE_URL`, `CLICKHOUSE_USER`, `CLICKHOUSE_PASSWORD`, `CLICKHOUSE_DATABASE`, `CLICKHOUSE_EVENTS_TABLE`
- New dependency: `@clickhouse/client@^1.18.3`

**Graceful degradation:** with no env vars, `/api/track` returns 204 and `npm run build` still passes. The template ships analytics-ready but credential-free.

### Added — Layer 1: Phase 0.5 Exa Research

`SKILL.md` now has a Phase 0.5 between the legal pre-flight and Phase 1 reconnaissance:

- Detects the Exa MCP plugin (`mcp__plugin_exa_exa__*`) and skips silently if not installed
- Runs 2–3 focused *category* searches (never the target itself)
- Saves paraphrased findings to `docs/research/<hostname>/EXA_RESEARCH.md`
- Output feeds Phase 3 component specs as the "Content Schema" so placeholder copy reflects category conventions instead of pure Lorem ipsum

Hard rules added: paraphrase only, never quote verbatim; numbers found via Exa become "shape" of placeholder stats (illustrative numbers, not exact); the target's own pages remain out of scope even when surfaced by Exa.

### Added — Documentation

- `STACK.md` — the three-tier walkthrough with ClickHouse Cloud setup, Docker self-host instructions, useful SQL queries (top events, session funnel, CTA leaderboard), and graceful-degradation guarantees
- README gains a "Three-tier LP stack" section linking out to `STACK.md`

### Changed

- `SKILL.md` Phase 4 now instructs builders to wire `trackPageView` and `trackCta` from `@/lib/analytics` when assembling the page

Re-ran `scripts/sync-skills.mjs` to propagate to all 9 platform skill files.

## [0.4.2] - 2026-04-28 — Bilingual Triggers & Pre-Flight

### Changed (skill description / triggers)

`SKILL.md` `description:` field expanded so the skill auto-triggers on natural-language requests in both English and Japanese — including casual wordings the user is likely to actually type.

**English triggers** (existing + added): "clone this site", "copy this LP", "copy this landing page", "rebuild this page", "replicate this site", "make a copy of this site", plus the prior "design study of", "inspired by this site", "extract layout patterns from", "study the design of".

**Japanese triggers (new)**:
- 「このLPをコピーして」
- 「このサイトをコピーして」
- 「このサイトをクローンして」
- 「このページを再現して」
- 「このサイトを真似して」
- 「このサイトみたいなのを作って」
- 「このデザインを参考にして」
- 「このページを移植して」
- 「このランディングページを真似して作って」
- 「○○のサイトみたいなのが欲しい」
- 「このサイトをパクって」

Despite the casual phrasing of these triggers, the skill always re-frames the work as a design study with placeholder content and hue-shifted palette — it will not produce a clone. The pre-flight legal acknowledgment surfaces this reframing to the user before any extraction begins.

### Changed (legal pre-flight)

Phase 0 / Legal Acknowledgment now presents in the language the user invoked the skill in (English or Japanese), with both ack phrases accepted:
- `"I understand — proceed with the design study."`
- 「理解しました — デザインスタディとして進めてください」

After acknowledgment, the skill internally re-frames any "clone / copy / 真似 / コピー" wording in the original request as "design study" for the rest of the session.

Re-ran `scripts/sync-skills.mjs` to propagate to all 9 platform skill files.

## [0.4.1] - 2026-04-28 — Smoke-Test Validation & Audit Fixes

### Fixed (skill)

Surfaced and addressed during a smoke-test run against `linear.app`:

- **Browser MCP filesystem boundary** — Phase 1 / Screenshots in SKILL.md now documents that browser MCP servers scope file-write roots to the calling Claude Code session's CWD. Includes the `mv`-from-MCP-root workaround and recommends running the skill from the project root.
- **Color extraction bias** — Phase 1 / Color palette extraction now runs in two parts: (A) authoritative `html`/`body`/`main` background capture as ground truth, (B) count-based top-15 for accent and surface tiers. Without this, sites with a dark page background but light internal product-mockup cards (such as Linear) were misidentified as light-themed.

Re-ran `scripts/sync-skills.mjs` to propagate both fixes to all 9 platform skill files.

### Fixed (dependencies)

- `next` bumped from `16.2.1` → `^16.2.4` (resolves `path-to-regexp` HIGH ReDoS via npm audit fix)
- Added `overrides` for `postcss` `^8.5.10` (resolves CSS Stringify XSS without downgrading `next` to a pre-9.x major)
- `npm audit` now reports **0 vulnerabilities** (was 2 high + 4 moderate at fork time)

### Added

- `.github/workflows/ci.yml` gains a `workflow_dispatch` trigger so the fork's CI can be triggered manually via `gh workflow run CI`
- Smoke-test artifacts committed for transparency:
  - `docs/research/linear.app/SMOKE_TEST_REPORT.md`
  - `docs/research/linear.app/INSPIRATION_NOTES.md`
  - `docs/design-references/notes/linear.app/desktop-1440.png`
- README gains a "Verified Pipeline" section linking to the smoke-test report

## [0.4.0] - 2026-04-28 — Design-Study Fork

### Fork divergence

Forked from [`JCodesMore/ai-website-cloner-template@25dc8ef`](https://github.com/JCodesMore/ai-website-cloner-template) and pivoted from a website cloner to a **design-study tool**. Output is now a structurally-similar but visibly distinct inspired-by template, never a clone. See [`LEGAL.md`](./LEGAL.md) for the rationale and full behavior diff.

### Added
- `LEGAL.md` documenting the fork's legal posture, allowed/disallowed uses, and the full behavior diff vs. upstream
- `templates/DISCLAIMER.md` template emitted into every generated project on completion, recording target URL, hue shift applied, font substitutions, and the safeguards confirmed during generation
- Mandatory legal pre-flight in the skill — explicit user acknowledgment + `robots.txt` check before any extraction begins
- Hard rules enforcement in the skill: no verbatim copy > 5 words, no asset downloads, hue-shifted palette only, generic fonts only, no logo tracing, no favicon extraction
- `INSPIRATION_NOTES.md` artifact capturing original-vs-shifted palette and font-mapping decisions for transparency

### Changed
- Renamed skill: `/clone-website` → `/design-study`
- Skill source path: `.claude/skills/clone-website/SKILL.md` → `.claude/skills/design-study/SKILL.md`
- Phase 5 renamed: "Visual QA Diff" → "Pattern Verification" — output must look **clearly different** from target (the inverse of the original's pixel-perfect goal)
- Component spec template: replaced "Text Content (verbatim)" with "Content Schema" (shape only); replaced "Assets" with "Asset Strategy" (Unsplash/Lucide/generic)
- Foundation phase: no asset downloads from target; generates placeholder monogram favicon; generic fonts only
- Color extraction: target palette captured AS NOTES, then hue-shifted 20–40° before being written to `globals.css`
- Package metadata, README, AGENTS.md updated to reflect the design-study positioning

### Removed
- Asset download script pattern from the skill (no `scripts/download-assets.mjs` to be generated against target)
- Verbatim text extraction guidance — replaced with paraphrasing and Lorem ipsum guidance
- "Real Content, Real Assets" guiding principle — replaced with "Generic Content Only"

## [0.3.1] - 2026-03-29 — upstream

### Changed (upstream baseline)
- Raised the project Node.js baseline to 24 across local development, CI, Docker, and contributor-facing documentation

## [0.3.1] - 2026-03-29

### Fixed
- `sync-agent-rules.sh` failing to resolve `@file` imports on Windows due to CRLF line endings — platform instruction files now correctly inline the Inspection Guide content

## [0.3.0] - 2026-03-29

### Added
- Multi-URL support for `/clone-website` — clone multiple sites in a single command with parallel processing and isolated output
- CI quality gates via GitHub Actions — automated lint, typecheck, and build on every push and PR
- `npm run typecheck` and `npm run check` scripts for local quality validation
- `.gitattributes` for cross-platform line ending normalization
- `.nvmrc` to pin Node.js 20 for contributor consistency

### Changed
- Streamlined PR template — removed redundant checklist items and screenshots section
- Improved project description and README — clearer use cases, limitations, and modern wording
- Refined documentation and agent rules across all platforms for clarity and consistency
- Fixed CRLF handling in `sync-skills.mjs` for reliable Windows operation

### Removed
- Outdated use case from README documentation

## [0.2.0] - 2026-03-28

### Added
- Multi-platform AI agent support: Claude Code, Codex CLI, OpenCode, GitHub Copilot, Cursor, Windsurf, Gemini CLI, Cline/Roo Code, Continue, Amazon Q, Augment Code, Aider
- Platform-specific instruction files and `/clone-website` skill for each supported agent
- `scripts/sync-agent-rules.sh` to regenerate platform instruction files from AGENTS.md
- `scripts/sync-skills.mjs` to regenerate `/clone-website` skill across all platforms
- GEMINI.md for Gemini CLI configuration
- Supported Platforms table in README
- "Updating for Other Platforms" documentation section in README

### Changed
- README now describes the project as multi-agent (Claude Code recommended, not required)
- AGENTS.md updated with sync script reminders

## [0.1.1] - 2026-03-28

### Added
- Bug report and feature request issue templates
- Pull request template with checklist
- CHANGELOG.md following Keep a Changelog format
- Package.json metadata (description, repository, homepage, keywords, engines)

### Fixed
- LICENSE copyright holder now attributed to JCodesMore

## [0.1.0] - 2026-03-28

### Added
- Initial template scaffold for website reverse-engineering with Claude Code
- `/clone-website` skill for full-site cloning pipeline
- `/build-from-spec` and `/customize` skills
- Parallel builder agents with git worktree isolation
- Chrome MCP integration for design token extraction
- Comprehensive inspection guide and project structure documentation
- Next.js 16 + shadcn/ui + Tailwind CSS v4 base scaffold
- MIT license
- README with badges, demo section, quick start, and star history

[Unreleased]: https://github.com/FUKI618/ai-website-design-study-template/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/FUKI618/ai-website-design-study-template/compare/v0.4.2...v0.5.0
[0.4.2]: https://github.com/FUKI618/ai-website-design-study-template/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/FUKI618/ai-website-design-study-template/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/FUKI618/ai-website-design-study-template/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/JCodesMore/ai-website-cloner-template/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/JCodesMore/ai-website-cloner-template/releases/tag/v0.1.0
