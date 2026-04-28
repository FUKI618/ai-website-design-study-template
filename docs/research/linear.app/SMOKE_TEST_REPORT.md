# Smoke Test Report — `/design-study https://linear.app`

**Date:** 2026-04-28
**Branch:** `smoke-test/linear-app`
**Scope tested:** Pre-flight + Phase 1 (Reconnaissance + Hue-shift demo). NOT a full pipeline run — no components built, no builders dispatched.

## What worked ✅

| Phase / Check | Result |
|---|---|
| robots.txt fetch | ✅ Linear's robots.txt allows `/`. Skill correctly identifies that `/api/` and `/cdn-cgi/` would be off-limits. |
| Legal acknowledgment | ✅ Operator (user) explicitly chose target with full understanding of design-study nature via UI question |
| Browser MCP detection | ✅ Playwright MCP detected and used |
| Page navigation | ✅ Loaded `https://linear.app/` at 1440×900 |
| Dominant color extraction | ✅ Top 15 colors captured with frequency counts |
| Typography pattern extraction | ✅ Heading hierarchy (64px / 48px / 20px) and weight pattern (510, 590) captured cleanly |
| Page topology scan | ✅ Identified the repeating `PageSection_*` component pattern — the central reusable abstraction in Linear's design |
| Hue-shift palette generation | ✅ +27° rotation applied. Grayscale colors correctly preserved (no perceptible change). Linear's signature indigo accent `rgb(94, 106, 210)` shifted cleanly to violet `rgb(134, 94, 210)` — visibly distinct |
| Distinctness check | ✅ The shifted accent is unmistakably different from Linear's brand color while preserving the same role in the palette |

## Issues found 🟡

### 1. Playwright MCP root-path constraint

**What happened:** Tried to save the desktop screenshot directly to `/Users/fuki/Code/legal-website-cloner/docs/design-references/notes/linear.app/desktop-1440.png`. Playwright MCP refused — its allowed roots are scoped to the calling Claude Code session's CWD (`/Users/fuki/Code/Test0406/main` in this smoke test).

**Workaround applied:** Saved to allowed root, then `mv` to target.

**Skill defect:** Phase 1 instructions say "Save to `docs/design-references/notes/<hostname>/`" but don't account for the case where the browser MCP's filesystem boundary is scoped to a different project. **Fix needed in SKILL.md:** add a note that screenshots may need to be saved to the MCP's allowed root and moved into place via Bash, especially when the design-study session is run from a workspace that's not the project root.

### 2. Dominant-color extraction is biased toward inner mockup surfaces

**What happened:** The top-counted background color was `rgb(247, 248, 248)` (light gray, 955 occurrences). But visually, Linear's homepage **is dark-mode dominant** — the page background is `rgb(8, 9, 10)` (only 5 occurrences in the count). The light gray dominated because Linear's product mockup cards (which are nested deeply with many elements) have light surfaces.

**Skill defect:** The current extraction script counts colors uniformly across all elements without weighting by area / DOM depth / visibility. **Fix needed:** SKILL.md's color extraction script should also capture `document.body`'s computed `backgroundColor` and the `<main>` container's, treat those as authoritative for "page background", and use the count-based extraction for accents only.

### 3. Typography weights `510` and `590` are non-standard

**What happened:** Linear uses Inter Variable with custom weights (510, 590) that don't map cleanly to standard 100/200/.../900 scale.

**Not really a defect** — but worth a note in INSPIRATION_NOTES.md: when substituting Geist for Inter, round to the nearest standard weight (510 → 500, 590 → 600). I did this correctly in the notes.

## Pipeline breakthrough demonstrated

The accent hue-shift output is the strongest evidence that the design-study posture works:

| | Linear (target) | This template (output) |
|---|---|---|
| Accent | `rgb(94, 106, 210)` indigo | `rgb(134, 94, 210)` violet |
| Visual relationship | — | Same saturation, same lightness, +27° hue |
| Recognizability | **Linear's signature accent** | **Clearly NOT Linear** |
| Functional equivalence | Highlight / link / CTA color | Highlight / link / CTA color |

A user looking at both palettes side-by-side would describe the relationship as *"the violet version reminds me of Linear's design language without being Linear's brand"* — which is the exact target output of a design-study tool.

## What was NOT tested in this smoke test

These remain unverified and require either a longer test or real-use feedback:

- **Mandatory interaction sweep** (scroll behaviors, click handlers, hover states) — Phase 1 mid-section
- **Per-component spec writing** (Phase 3, Step 2)
- **Worktree-based parallel builders** (Phase 3, Step 3)
- **Phase 5 Pattern Verification** (does the assembly actually look "clearly different"?)
- **DISCLAIMER.md generation** (Phase 5 completion)
- **Multi-URL handling** (single target tested only)

## Recommendation

The skill's **front-half pipeline is sound**. The two issues found (MCP root constraint + page-bg detection) are both addressable by tightening SKILL.md's instructions — neither is a fundamental design flaw.

**Next-best smoke test:** run the full pipeline against a smaller, single-section target (e.g., a one-page landing) so the worktree-based builder dispatch is exercised end-to-end without 4+ hours of build time.

## Artifacts produced by this smoke test

- `docs/design-references/notes/linear.app/desktop-1440.png` (1.3MB, full-page reference screenshot — local research only)
- `docs/research/linear.app/INSPIRATION_NOTES.md` (palette comparison + typography mapping + topology + de-branding decisions)
- `docs/research/linear.app/SMOKE_TEST_REPORT.md` (this file)

No code was generated. No `globals.css` was modified. No components were built. The smoke test deliberately stopped at the boundary of "research artifacts" so the skill's structural claims could be verified independently.
