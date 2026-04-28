# Inspiration Notes — linear.app

> **This is a design-study research artifact.** The values below are extracted from the live site for **note-taking purposes**. The implementation in `globals.css` uses ONLY the `Shifted` column on the right.

## Provenance

| Field | Value |
|---|---|
| Target | https://linear.app/ |
| Date studied | 2026-04-28 |
| robots.txt | ✅ ALLOWED for `/` (only `/api/`, `/cdn-cgi/` disallowed) |
| Legal acknowledgment | Confirmed by operator before extraction |
| Browser MCP | Playwright |
| Viewport | 1440 × 900 desktop |
| Page scroll height | 10,776px |

## Color Palette — Original vs Shifted (+27° hue)

The accent color is the only one with meaningful hue — all others are grayscale and remain effectively unchanged by the rotation (which is correct — gray has no hue to shift).

| Role | Count | Original | Shifted (+27°) | Hue change |
|---|---|---|---|---|
| `page-bg-light` | 955 | `rgb(247, 248, 248)` | `rgb(247, 248, 248)` | 180° → 207° (gray, no visible change) |
| `white` | 214 | `rgb(255, 255, 255)` | `rgb(255, 255, 255)` | n/a (white) |
| `muted-text` | 192 | `rgb(98, 102, 109)` | `rgb(99, 98, 109)` | 218° → 245° (near-gray, subtle warm shift) |
| `border-light` | 114 | `rgb(208, 214, 224)` | `rgb(209, 208, 224)` | 218° → 245° |
| `muted-text-2` | 68 | `rgb(138, 143, 152)` | `rgb(139, 138, 152)` | 219° → 246° |
| `surface-2` | 7 | `rgb(226, 228, 231)` | `rgb(226, 226, 231)` | 216° → 243° |
| `page-bg-dark` | 5 | `rgb(8, 9, 10)` | `rgb(8, 8, 10)` | 210° → 237° |
| `surface-dark` | 5 | `rgb(35, 37, 42)` | `rgb(36, 35, 42)` | 223° → 250° |
| **ACCENT** | 3 | **`rgb(94, 106, 210)`** (Linear indigo) | **`rgb(134, 94, 210)`** (violet) | **234° → 261°** ← visible shift |

The accent shift `indigo → violet` is the deliberate de-branding step. Linear's instantly-recognizable indigo accent is replaced with a visibly distinct violet that occupies the same role in the design system.

## Typography

**Original (NOT used):** `Inter Variable, SF Pro Display, -apple-system, ...`

**Generic substitution applied in our template:**
- Display / sans: **Geist Sans** (variable, similar geometric character)
- Body: **Geist Sans** (same family for consistency)
- Mono: **Geist Mono**

Linear actually uses Inter, which is open source. We deliberately substitute Geist anyway — the goal is "inspired-by", not "indistinguishable from". Geist is sufficiently similar in geometric character to convey the same design intent without being a 1:1 swap.

### Hierarchy patterns to mirror (size ratios)

| Slot | Linear's value | Pattern to apply |
|---|---|---|
| h1 | 64px / 64px line-height / 510 weight | display ≈ 4× body, tight leading, semi-bold |
| h2 | 48px / 48px / 510 | section-head ≈ 3× body, tight leading, semi-bold |
| h3 (card title) | 20px / 26.6px / 590 | sub-head ≈ 1.25× body, snug leading, near-bold |
| h3 (eyebrow) | 13px / 19.5px / 510 | eyebrow < body, looser leading, medium weight |
| body p | 15px / 24px / 400 | base 15px / 1.6 leading |
| small p | 14px / 21px / 400 | secondary 14px / 1.5 leading |

Note: 510 / 590 weights are an unusual choice — Linear is using variable-weight `Inter Variable`. We use Geist Variable's nearest analogues (500, 600).

## Spacing rhythm

- Base unit: appears to be 4px (most paddings/gaps land on 4 / 8 / 12 / 16 / 24 / 48 / 96 — classic 4px grid)
- Section vertical padding: ~96–128px on desktop
- Content max-width: ~1100–1200px
- Inter-element gap in feature cards: 16–24px

## Page topology (from `main`-level scan)

Page is a single very-tall vertical scroll (10,776px). Top-level structure (from offset analysis):

| Order | Class hint | offsetTop | Height | Likely role |
|---|---|---|---|---|
| 1 | nav (sticky) | 0 | 72 | Header / nav (sticky) |
| 2 | `LayoutContent_homepage` | 72 | 10,240 | Main content scroll container |
| 3 | `PageSection_root` (variant `Homepage`) | 2,483 | 1,206 | Repeating "section block" pattern with title + description + illustration |
| 4–N | `PageSection_*` instances | various | various | Same pattern repeating — alternating layout |

**Pattern observed:** Linear's homepage is built from a repeating `PageSection` component with predictable internal slots:
- `PageSection_header` (eyebrow + title + description)
- `PageSection_illustration` (large product mockup or animation)
- `PageSection_footer` (CTA / link out)

This is the kind of compositional pattern worth replicating in our template's `<PageSection>` component.

## Behaviors observed (notes only — to be confirmed in interaction sweep)

- Page is dark-mode dominant when initially loaded (hero is on dark surface), with light-surface mockup cards
- Scroll-driven section cadence — each section gets full attention before the next
- 5 console warnings on page load (likely third-party scripts) — no errors

## What is intentionally NOT captured here

- ❌ Verbatim copy / headline text from Linear
- ❌ Image src URLs from Linear's CDN
- ❌ SVG illustrations / product mockup images
- ❌ Logo / wordmark
- ❌ Favicon

The above were observed visually during navigation but are out of scope for our generated codebase. Reference screenshots in `docs/design-references/notes/linear.app/` are kept locally for design study and will not be deployed.

## De-branding decisions applied

| Layer | Decision |
|---|---|
| Accent color | `rgb(94, 106, 210)` indigo → `rgb(134, 94, 210)` violet (+27°) |
| Body / display font | Inter Variable → **Geist Sans Variable** |
| Logo | Generic monogram (target letter / project initial) — NOT traced from Linear |
| Favicon | Generic monogram — NOT extracted |
| Headline copy | Lorem ipsum / generic SaaS copy — NOT copied from Linear |
| Illustrations | Lucide icons / generic geometric SVG / Unsplash random — NO Linear assets |
