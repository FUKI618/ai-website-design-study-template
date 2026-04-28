# Disclaimer

This project was generated using the [AI Website Design-Study Template](https://github.com/FUKI618/ai-website-design-study-template) — a tool that extracts **structural design patterns** from a public website and builds an **inspired-by**, structurally-similar but visibly distinct Next.js codebase.

## What this project IS

A starting-point template whose layout, spacing rhythm, typography hierarchy, and interaction patterns were **informed by** a design study of the reference target listed below. The structural decisions (column counts, section composition, vertical rhythm, hover/transition behaviors) follow patterns observed in the target.

## What this project IS NOT

- Not a copy of the design-study target
- Not affiliated with, endorsed by, or sponsored by the target site or its operators

## Safeguards Applied During Generation

The generating tool enforces these rules. They were applied to this project:

- ✅ **No text was copied verbatim** from the target. All copy is Lorem ipsum, paraphrased generic copy, or placeholder SaaS-style copy
- ✅ **No images, videos, SVG illustrations, or favicons** were downloaded from the target. The hero "product UI" and feature icons are drawn entirely with primitives (Lucide icons + plain divs); no external image fetches
- ✅ **No logo or brand mark** was traced or copied. The logo slot uses a generic monogram placeholder (`<D>` with a violet square)
- ✅ **No favicon or OG image** was extracted from the target. `src/app/icon.svg` is a generated monogram
- ✅ **Color palette was hue-shifted** by **+27°** from the target's palette. Linear's signature indigo accent `rgb(94, 106, 210)` becomes violet `rgb(134, 94, 210)`. Original and shifted values are recorded in `docs/research/linear.app/INSPIRATION_NOTES.md`
- ✅ **Generic fonts substituted**: Linear's `Inter Variable` → **Geist Sans Variable** (display + body), **Geist Mono** (mono code-like text)
- ✅ **`robots.txt` checked** for the target before extraction — automation was permitted (`/api/`, `/cdn-cgi/` would have been off-limits, but neither was accessed)
- ✅ **Legal acknowledgment confirmed** by the operator before generation began

## Provenance

| Field | Value |
|---|---|
| Design-study target | https://linear.app/ |
| Date of study | 2026-04-28 |
| Hue shift applied | +27° (indigo → violet for the accent color) |
| Generic fonts used | Geist Sans (body + display), Geist Mono (code) |
| Reference screenshot | `docs/design-references/notes/linear.app/desktop-1440.png` (kept as local research; not deployed via `public/`) |
| Generated demo screenshot | `docs/design-references/notes/linear.app/demo-linear-inspired-final-1440.png` |

## Distinctness Verification

A side-by-side comparison of `desktop-1440.png` (Linear, original) and `demo-linear-inspired-final-1440.png` (this project) confirms:

- **Different accent color** — Linear's indigo vs. this project's violet
- **Different copy** — Linear's actual marketing language vs. Lorem ipsum + generic SaaS phrasing
- **Different "product UI" mock** — Linear's actual product screenshots vs. this project's generic issue-tracker mockup with made-up DSN-NNN identifiers
- **Different brand mark** — Linear's wordmark vs. this project's `<D>` monogram in a violet square
- **No favicon overlap** — different generated SVG

The two pages share **structural patterns** (sticky nav, hero with mock-UI hero block, alternating section padding, feature grid, gradient-glow CTA, multi-column footer) but are visibly distinct in every brand-bearing layer.

## Removing References

If you intend to ship this project publicly:

1. The `docs/design-references/notes/linear.app/` directory is local research. It is NOT served by `public/` and will not be deployed by `next build`. You may delete it before pushing if you do not want any reference to the target preserved in the repo.
2. The `docs/research/linear.app/` directory contains `INSPIRATION_NOTES.md` and `SMOKE_TEST_REPORT.md` documenting the study process. These are useful as audit trail; keep them if you value provenance, delete them if you prefer to ship without it.
3. Customize further. The template is intentionally inspired-by, but the more you adjust spacing, copy, and structure, the more distinct your project becomes.
4. Consider replacing the `<D>` placeholder monogram with your own brand mark before public launch.

## Notice

The AI Website Design-Study Template's safeguards reduce — but do not eliminate — every conceivable legal risk. If your use of this output could be construed as competing with the reference target, or could create market confusion, consult a qualified attorney before publishing.
