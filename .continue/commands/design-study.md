---
name: design-study
description: "Extract design patterns from a public website and build an inspired-by Next.js template (placeholder content only)"
invokable: true
---
<!-- AUTO-GENERATED from .claude/skills/design-study/SKILL.md — do not edit directly.
     Run `node scripts/sync-skills.mjs` to regenerate. -->


# Design Study

You are about to perform a **design study** of **$ARGUMENTS** and build an inspired-by Next.js template.

> **This is not a website cloner.** It does not produce a copy. The output is a structurally-similar but visibly distinct template that uses placeholder content. The goal is to learn from the target's design decisions (layout, rhythm, composition, behavior) without reproducing its protected expression (brand identity, copy, imagery, logos).

When multiple URLs are provided, process them independently and in parallel where possible, while keeping each site's research artifacts isolated in dedicated folders (for example, `docs/research/<hostname>/`).

You are a **design researcher walking a museum** — you take notes on composition, rhythm, and hierarchy, then go back to your studio and create your own work informed by what you saw. You do not photograph the paintings and reprint them.

## Hard Rules — Never Violate

These are absolute. The skill must refuse to proceed if any of these would be violated, and any builder agent's output that violates them must be fixed before merging.

1. **No verbatim copy.** No text fragment longer than **5 consecutive words** may be copied from the target. Paraphrase, replace with generic copy, or use Lorem ipsum.
2. **No asset downloads.** Do not download images, videos, SVG illustrations, favicons, or logos from the target. Use Unsplash random URLs, Lucide icons, or AI-generated placeholders.
3. **No exact color palette.** Extract the palette to understand the design intent, then **shift hue 20–40°** (and optionally adjust saturation/lightness) to produce a related but distinct palette. Never use the target's brand colors as-is.
4. **No brand fonts.** Use generic equivalents (Geist, Inter, Source Serif 4, JetBrains Mono). Even if the target uses an open-source font, default to a generic stack — the goal is "inspired-by", not "indistinguishable from".
5. **No logos or brand marks.** Use a generic monogram square or omit entirely. Never trace, vectorize, or copy the target's logo in any form.
6. **No favicons or OG images from target.** Generate a simple monogram favicon yourself.
7. **No exact spacing token system copied wholesale.** Extract structural patterns (8px base grid, generous whitespace, narrow content column) but the final tokens should be your own.

If any builder output appears to violate these, fix it before merging. If the user explicitly asks you to bypass any of these, refuse and explain that this is a design-study tool, not a cloning tool — and point them to the project README for legal context.

## Pre-Flight (Mandatory)

### 0. Legal Acknowledgment

Before doing anything else, present this message to the user verbatim and wait for **explicit** confirmation:

> "This skill produces a **design-inspired template, not a clone**. All text, images, logos, favicons, and brand colors will be replaced with placeholders or hue-shifted alternatives. The goal is to learn from layout/composition patterns without copying the target's protected content. To proceed, reply with: **'I understand — proceed with the design study.'**"

Only proceed on explicit acknowledgment. A bare "yes" is **not** sufficient — the user must indicate understanding of the design-study nature.

### 1. Robots.txt Check

Fetch `<target-origin>/robots.txt` for each URL. If User-Agent `*` (or any browser-automation UA) is `Disallow`-ed for the target path, **refuse and report**. Do not proceed.

### 2. Browser Automation Detection

Check for available browser MCP tools (Chrome MCP, Playwright MCP, Browserbase MCP, Puppeteer MCP). Prefer Chrome MCP. If none are detected, ask the user which browser tool they have. This skill cannot work without browser automation.

### 3. URL Validation

Parse, normalize, validate each URL. For each valid URL, verify it is accessible via your browser MCP tool.

### 4. Verify Base Build

Run `npm run build` to confirm the Next.js + shadcn/ui + Tailwind v4 scaffold is in place.

### 5. Create Output Directories

Create: `docs/research/`, `docs/research/components/`, `docs/design-references/notes/`. For multiple targets, create per-site folders like `docs/research/<hostname>/`.

> Note: there is **no** `public/images/` step from the target. The generated project does not contain any binary asset extracted from the target.

## Scope Defaults

- **Fidelity level:** **Pattern fidelity, not pixel fidelity.** Match layout grid, vertical rhythm, component composition, interaction model. Colors, content, and imagery are deliberately distinct.
- **In scope:** Layout structure, responsive breakpoints, component composition (e.g., "hero with offset image, three-column features grid, alternating sections"), typography hierarchy patterns (size ratios, line-height patterns), spacing rhythm (base unit, section padding cadence), animation/interaction patterns (scroll-driven, hover effects, scroll snap, IntersectionObserver mechanics).
- **Out of scope:** Brand replication, content copying, asset replication, favicon copying, real backend, authentication, real-time features, accessibility audit.
- **Customization:** Encouraged. The output is a starting point for the user's own design.

## Guiding Principles

### 1. Pattern, Not Copy

Your job is to identify **why** the target's design works (composition decisions, rhythm, hierarchy, interaction choices) and reproduce **those decisions** with the user's own content. The output should be recognizable to a designer as "in the same family" but never as "the same site."

### 2. Small Tasks, Perfect Patterns

When an agent gets "build the entire features section," it glosses over details. When it gets a single focused component with exact CSS values for layout/spacing/typography (everything except brand), it nails the pattern.

Look at each section and judge its complexity. A simple banner with a heading and a button? One agent. A complex section with 3 different card variants, each with unique hover states? One agent per card variant plus one for the section wrapper.

**Complexity budget rule:** If a builder prompt exceeds ~150 lines of spec content, the section is too complex for one agent. Break it down.

### 3. Generic Content Only

Use:
- **Lorem ipsum** or generic SaaS-style copy ("Build faster with our platform", "Trusted by teams worldwide")
- **Unsplash random images** via `https://images.unsplash.com/photo-...` or `https://source.unsplash.com/random/<size>/?<keyword>`
- **Lucide React icons** (already installed) — for any iconography
- **Generic monogram** for any logo/brand mark slot
- **Geist / Inter / Source Serif 4** for typography

Never run `element.textContent` and copy verbatim. Never run image-download scripts pointed at the target. If you find yourself wanting to "preserve the original copy because it's good," paraphrase it instead.

### 4. Foundation First (with shifted palette)

Foundation is sequential and non-negotiable:
- Global CSS uses **YOUR shifted palette** — never the target's exact colors
- TypeScript types use generic content-schema names
- Fonts are generic equivalents
- Brand mark is a placeholder

Document the original palette and the shifted palette in `docs/research/INSPIRATION_NOTES.md` for transparency.

### 5. Extract How It Looks AND How It Behaves

Animations, scroll behaviors, hover states, interaction models are **not** protected expression and are valuable to learn from. Extract them rigorously.

For every interactive element, extract:
- **Appearance** (exact computed CSS via `getComputedStyle()`) — this is structural, not branded
- **Behavior** (what changes, what triggers it, transition duration/easing)

Examples of behaviors worth capturing:
- Navbar that shrinks/changes on scroll past threshold
- Elements animating into view (fade-up, slide-in, stagger delays)
- Scroll-snap sections (`scroll-snap-type`)
- Parallax layers
- Hover transitions with specific easing
- Dropdowns/modals/accordions enter/exit animations
- Scroll-driven progress indicators
- Auto-playing carousels
- Tabbed/pill content cycling
- Scroll-driven tab/accordion switching (IntersectionObserver, NOT click handlers)
- Smooth scroll libraries (Lenis, Locomotive Scroll — check for `.lenis` class)

### 6. Identify the Interaction Model Before Building

The single most expensive mistake is building click-based UI when the original is scroll-driven, or vice versa. Before writing any builder prompt for an interactive section, definitively answer: **Is this section driven by clicks, scrolls, hovers, time, or some combination?**

How to determine:
1. **Don't click first.** Scroll through slowly and observe if things change on their own.
2. If they do, it's scroll-driven. Identify the mechanism (IntersectionObserver, scroll-snap, position: sticky, animation-timeline, JS scroll listeners).
3. If nothing changes on scroll, click/hover to test for click/hover-driven interactivity.
4. Document explicitly in the spec: "INTERACTION MODEL: scroll-driven with IntersectionObserver" or similar.

### 7. Spec Files Are the Source of Truth

Every component gets a spec file in `docs/research/components/` BEFORE any builder is dispatched. The spec file is the contract. Builders receive spec contents inline; the file persists as an auditable artifact.

The spec file is **not optional**.

### 8. Build Must Always Compile

Every builder agent verifies `npx tsc --noEmit` passes before finishing. After merging worktrees, verify `npm run build` passes. A broken build is never acceptable.

## Phase 1: Reconnaissance

Navigate to the target URL with browser MCP. **All extraction in this phase produces research notes — none of it is copied directly into the project.**

### Screenshots

- Take full-page screenshots at desktop (1440px) and mobile (390px)
- Save to `docs/design-references/notes/<hostname>/` as **reference only**
- These are NOT included in `public/` and are NOT shipped with the generated project

> **MCP filesystem boundary note:** Browser MCP servers (Chrome MCP, Playwright MCP, Browserbase MCP) typically scope their allowed file-write roots to the **calling Claude Code session's CWD** — NOT to arbitrary absolute paths. If your skill session was started outside this project's directory, the MCP will refuse to write screenshots into `docs/design-references/notes/<hostname>/`.
>
> **Workaround:** save the screenshot to the MCP's allowed root with a relative filename (e.g. `linear-desktop-1440.png`), then move it into place via Bash:
> ```bash
> mkdir -p docs/design-references/notes/<hostname>/
> mv <mcp-allowed-root>/linear-desktop-1440.png docs/design-references/notes/<hostname>/desktop-1440.png
> ```
> Prefer running the design-study skill from the template's project root so the MCP root coincides with the target output directory and no move is needed.

### Global Extraction (For Inspiration Notes Only)

Save findings to `docs/research/INSPIRATION_NOTES.md`. This file documents the research process and the deliberate shifts applied — keep it for transparency.

**Color palette (extract → shift → use shifted):**

The extraction has TWO parts. Run BOTH and merge the results — count-based extraction alone is biased toward whatever surfaces have the most nested elements (typically inner mockup cards), and will misidentify the page's actual background.

```javascript
// Run via browser MCP — extract dominant colors AND authoritative page surfaces
(function () {
  // PART A — authoritative page surfaces (treat these as ground truth for "page bg")
  const authoritative = {
    htmlBg: getComputedStyle(document.documentElement).backgroundColor,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    mainBg: document.querySelector('main')
      ? getComputedStyle(document.querySelector('main')).backgroundColor
      : null,
    bodyColor: getComputedStyle(document.body).color,
  };

  // PART B — count-based extraction (good for accent / surface tiers)
  const elements = [...document.querySelectorAll('*')].slice(0, 500);
  const counts = {};
  elements.forEach((el) => {
    const cs = getComputedStyle(el);
    ['color', 'backgroundColor', 'borderColor'].forEach((p) => {
      const v = cs[p];
      if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent')
        counts[v] = (counts[v] || 0) + 1;
    });
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);

  return JSON.stringify({ authoritative, top }, null, 2);
})();
```

**Interpretation rules:**

1. **Page background = `authoritative.bodyBg` (or `mainBg` if `bodyBg` is `rgba(0,0,0,0)`/transparent).** The count-based top color is NOT the page background — it's whichever surface tier has the deepest DOM. (Example failure mode: a site with a dark page bg but light product-mockup cards will surface the light-card color as #1 in the count, which is wrong for "page bg".)
2. **Accent and secondary surfaces** are picked from `top[]`, excluding values already classified as page bg, body text, or pure black/white.
3. For each color you decide to use: rotate hue **20–40°** (you choose the direction — pick what creates a coherent shifted palette), optionally adjust saturation by ±10%, lightness by ±5%.
4. **Grayscale colors** (saturation < 5%) won't change perceptibly under hue rotation — that's correct, leave them. The shift is meaningful only for chromatic colors (the brand accent, gradient stops, illustration tints).
5. Record both original and shifted values in `INSPIRATION_NOTES.md` with their semantic role (page-bg / accent / muted-text / etc.). Apply ONLY the shifted palette to `globals.css`.

**Typography pattern (not the actual fonts):**
- Note the heading-to-body ratio (e.g., "h1 is ~4x body, h2 is ~2.5x body, body is 16px/1.6")
- Note the typeface category — but USE A GENERIC EQUIVALENT:
  - Geometric sans → `Geist Sans`
  - Humanist sans → `Inter`
  - Serif → `Source Serif 4`
  - Mono → `Geist Mono` or `JetBrains Mono`
- Document the chosen mapping in `INSPIRATION_NOTES.md`

**Spacing rhythm:**
- Base unit (4px / 8px / 16px)
- Vertical section padding patterns
- Content max-width pattern
- Inter-element gap patterns

**Layout structure:**
- Single column / multi-column / sticky sidebar
- Section composition pattern (alternating / sequential / magazine-style)
- Z-index layering (sticky nav, fixed CTAs, etc.)

### Mandatory Interaction Sweep

This is a dedicated pass. Its purpose is to discover behaviors invisible in static screenshots.

**Scroll sweep:** Scroll slowly top to bottom. At each section, pause and observe:
- Header changes? Record scroll position trigger.
- Animate-in elements? Record which and animation type.
- Auto-switching sidebar/tabs? Record mechanism.
- Scroll-snap points? Record containers.
- Smooth scroll library? Check for non-native scrolling.

**Click sweep:** Click every interactive element (buttons, tabs, pills, links, cards). Record what changes — modals, dropdowns, content swaps. For tabs/pills: click each one and record per-state structure (NOT verbatim content).

**Hover sweep:** Hover over interactive elements. Record property changes (color, scale, shadow, opacity) and transition timing.

**Responsive sweep:** Test at 1440 / 768 / 390. Record breakpoint behavior changes.

Save all findings to `docs/research/BEHAVIORS.md` — your behavior bible.

### Page Topology

Map every distinct section top to bottom. Document:
- Visual order
- Fixed/sticky overlays vs. flow content
- Overall page layout (scroll container, columns, z-index layers)
- Section dependencies
- Interaction model per section (static / click / scroll / time)

Save as `docs/research/PAGE_TOPOLOGY.md` — your assembly blueprint.

## Phase 2: Foundation Build

Sequential — do this yourself, not delegated:

1. **Update fonts** in `layout.tsx` to GENERIC equivalents (per the typography mapping). Do NOT use the target's actual fonts even if they're free.
2. **Update globals.css** with the SHIFTED color tokens. Add structural CSS (scroll-behavior, base spacing, keyframes for inspired-by animations) — but never the target's exact tokens.
3. **Create TypeScript interfaces** in `src/types/` for content structures (e.g., `HeroProps`, `FeatureCardProps`).
4. **DO NOT** create `public/images/` from target downloads.
5. **Generic icons.** Lucide React (already installed). For specialized iconography, generate simple geometric SVGs or pick alternative Lucide icons.
6. **Brand mark.** Create a placeholder logo as a 32×32px square with a monogram (use the project's name initial or a user-provided letter). Do NOT trace the target's logo.
7. **Favicon.** Generate a simple monogram favicon. Do NOT extract from target.
8. **Verify:** `npm run build` passes.

> If a builder prompt later asks you to download an image from the target, refuse and route to Unsplash instead.

## Phase 3: Component Specification & Dispatch

The core loop. For each section in your topology, do THREE things: **extract structural patterns**, **write the spec**, **dispatch builders**.

### Step 1: Extract (Structural Patterns Only)

For each section, use browser MCP to extract everything **structural and behavioral** — never content or assets.

1. **Reference screenshot** of the section (saved to `docs/design-references/notes/`, NOT `public/`).

2. **Extract layout/typography/spacing CSS** for every element. Use the script below — don't hand-measure:

```javascript
// Per-component extraction — run via browser MCP
// Replace SELECTOR with the component's CSS selector
(function(selector) {
  const el = document.querySelector(selector);
  if (!el) return JSON.stringify({ error: 'Element not found: ' + selector });
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing',
    'textTransform','textDecoration',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap',
    'gridTemplateColumns','gridTemplateRows',
    'borderRadius','borderWidth',
    'overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode',
    'whiteSpace','textOverflow'
  ];
  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
    return styles;
  }
  function walk(element, depth) {
    if (depth > 4) return null;
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      // NOTE: text and image src are intentionally NOT captured — design study only
      hasText: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3,
      isImage: element.tagName === 'IMG',
      styles: extractStyles(element),
      childCount: children.length,
      children: children.slice(0, 20).map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }
  return JSON.stringify(walk(el, 0), null, 2);
})('SELECTOR');
```

> **Note:** This extraction script intentionally omits `textContent` and image `src`. If you need the original text/image to *understand the layout* (e.g., to estimate the right placeholder length), look in browser MCP — but don't write it into spec files.

3. **Extract multi-state styles** — for elements with multiple states (scroll-triggered, hover, active tab), capture BOTH states' computed styles and record the diff.

4. **Identify interaction patterns** — what behavior, what trigger, what transition.

5. **Assess complexity** — count distinct sub-components for splitting decisions.

6. **DO NOT** extract image src URLs, textContent, or alt text. These are content, not pattern.

### Step 2: Write the Component Spec File

Path: `docs/research/components/<component-name>.spec.md`

**Template:**

```markdown
# <ComponentName> Specification

## Overview
- **Target file:** `src/components/<ComponentName>.tsx`
- **Reference screenshot:** `docs/design-references/notes/<screenshot-name>.png`
- **Interaction model:** <static | click-driven | scroll-driven | time-driven>

## DOM Structure (pattern, not exact)
<Describe the element hierarchy — what contains what>

## Computed Styles (structural — exact values)

### Container
- display: ...
- padding: ...
- maxWidth: ...
- (every relevant LAYOUT/SPACING/TYPOGRAPHY property — NEVER brand colors as-is)

### <Child element 1>
- fontSize: ...
- (every relevant STRUCTURAL property)

### <Child element N>
...

## States & Behaviors

### <Behavior name, e.g., "Scroll-triggered floating mode">
- **Trigger:** <exact mechanism — scroll position 50px, IntersectionObserver rootMargin "-30% 0px", click on .tab-button, hover>
- **State A (before):** maxWidth: 100vw, boxShadow: none, borderRadius: 0
- **State B (after):** maxWidth: 1200px, boxShadow: 0 4px 20px rgba(...shifted...), borderRadius: 16px
- **Transition:** all 0.3s ease
- **Implementation:** <CSS transition + scroll listener | IntersectionObserver | etc.>

### Hover states
- **<Element>:** <property>: <before> → <after>, transition: <value>

## Content Schema (NOT verbatim — describe the SHAPE of content)
- Headline: 4-7 words, action-oriented (placeholder: "Build something amazing today")
- Subhead: 1-2 sentences, value-prop framing (placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
- Cards: 3 items
  - Title: 2-4 words
  - Description: 1 sentence
  - Icon: Lucide React (suggest: ZapIcon, ShieldIcon, ChartIcon)
- CTA: button label 2-3 words ("Get started", "Try free")

## Asset Strategy (NO downloads from target)
- Hero image: Unsplash random `https://images.unsplash.com/photo-...` query: "abstract,gradient" 1200×600
- Card icons: Lucide React (`<ZapIcon>`, `<ShieldIcon>`, `<ChartIcon>`)
- Decorative SVG: generate simple geometric shape OR omit
- Logo slot: monogram placeholder
- **NO assets downloaded from target**

## Brand Strip (deliberate de-branding)
- Original logo: NOT included → placeholder monogram
- Original brand colors: hue-shifted by N° (see `INSPIRATION_NOTES.md`)
- Original typeface: replaced with <generic font name>
- Original copy: paraphrased / replaced with placeholder

## Responsive Behavior
- **Desktop (1440px):** <layout description>
- **Tablet (768px):** <what changes>
- **Mobile (390px):** <what changes>
- **Breakpoint:** layout switches at ~<N>px
```

Fill every section. Mark "N/A" only after careful thought.

### Step 3: Dispatch Builders

Based on complexity, dispatch builder agent(s) in worktree(s):

- **Simple section (1-2 sub-components):** one builder gets the whole section
- **Complex section (3+ sub-components):** one agent per sub-component, plus one for the wrapper (sub-components first)

**Each builder agent receives:**
- Full spec file content inline
- Path to reference screenshot in `docs/design-references/notes/`
- Shared imports (`icons.tsx`, `cn()`, shadcn primitives)
- Target file path
- **Hard rules reminder:** "Use placeholder content only. Do not reference the target site for text or imagery. Do not extract anything from the target."
- Verify with `npx tsc --noEmit` before finishing

**Don't wait.** Dispatch and move to the next section's extraction in parallel.

### Step 4: Merge

As builders complete, merge worktree branches into main. Resolve conflicts using your full context. Verify `npm run build` after each merge.

## Phase 4: Page Assembly

Wire everything together in `src/app/page.tsx`:
- Import all section components
- Implement page-level layout from your topology doc
- Connect placeholder content to component props
- Implement page-level behaviors (scroll snap, scroll-driven animations, smooth scroll)
- Verify: `npm run build` passes

## Phase 5: Pattern Verification (replaces Visual QA Diff)

**Do NOT do a side-by-side comparison expecting them to look identical.** They should NOT look identical. Instead:

1. **Layout pattern check** — does the section order, column structure, and rhythm match the target's pattern?
2. **Distinctness check (CRITICAL)** — does the output look **clearly different** from the target?
   - Different (shifted) color palette ✓
   - Different copy / Lorem ipsum ✓
   - Different (Unsplash / generic) imagery ✓
   - No logo or generic monogram ✓
3. **Quality check** — does the design feel polished and intentional, or does it look like a stripped-down clone? If it looks stripped, customize further (vary spacing slightly, adjust component sizes, swap section order).
4. **Build verification** — `npm run build` clean

**If the output is too similar to the target, it has failed.** Adjust palette shift further, replace copy more aggressively, vary layout details, or swap component arrangements.

## Pre-Dispatch Checklist

Before dispatching ANY builder:

- [ ] Spec file written with all sections filled
- [ ] Every CSS value in spec is from `getComputedStyle()`, not estimated
- [ ] Spec uses **Content Schema** (NOT verbatim text)
- [ ] Spec uses **Asset Strategy** (external/generic sources, NOT target downloads)
- [ ] **Brand Strip** section is filled (original brand assets are excluded)
- [ ] Color palette in `globals.css` is hue-shifted (verify against `INSPIRATION_NOTES.md`)
- [ ] Fonts are generic (Geist / Inter / Source Serif 4 / etc.), NOT target's brand font
- [ ] Logo slot uses placeholder monogram
- [ ] Interaction model is identified
- [ ] For stateful components: every state's pattern is captured
- [ ] For scroll-driven components: trigger, before/after, transition recorded
- [ ] For hover states: before/after values + transition timing recorded
- [ ] Responsive behavior documented for desktop and mobile
- [ ] Builder prompt under ~150 lines of spec; if over, split

## What NOT to Do

- **Don't extract `textContent` and use it verbatim.** Paraphrase or replace with Lorem/SaaS-style placeholder.
- **Don't download images from the target.** Unsplash random or generic SVGs only.
- **Don't extract favicons / OG images.** Generate a simple monogram.
- **Don't extract SVG illustrations.** Use Lucide or omit.
- **Don't use the target's exact brand colors.** Always hue-shift 20–40°.
- **Don't use the target's brand font.** Use generic equivalents.
- **Don't trace the target's logo.** Placeholder monogram only.
- **Don't bypass the legal pre-flight.** If user can't confirm understanding, refuse.
- **Don't build click-based UI when the original is scroll-driven (or vice versa).** Determine interaction model FIRST.
- **Don't extract only the default state.** Capture every state's structural pattern.
- **Don't approximate CSS classes.** Extract exact computed values for layout/spacing/typography.
- **Don't dispatch builders without a spec file.**
- **Don't reference docs from builder prompts.** Spec contents are inline.
- **Don't bundle unrelated sections into one agent.**
- **Don't skip responsive extraction.**

## Completion

When done:

1. **Generate `DISCLAIMER.md`** at the project root using `templates/DISCLAIMER.md`. Fill in:
   - Target URL(s) studied (for transparency)
   - Date of study
   - Color hue shift applied (e.g., "+27° hue rotation")
   - Generic font substitution made (e.g., "Inter for body, Source Serif 4 for display")
   - Confirmation that no assets were downloaded from target
   - Confirmation that no copy was used verbatim
2. Report:
   - Total sections built
   - Total components created
   - Total spec files written (should equal components)
   - Color hue shift applied
   - Generic font substitutions
   - Build status (`npm run build`)
   - **Distinctness verification result** — confirm the output looks visibly different from the target
   - Any known gaps or limitations
