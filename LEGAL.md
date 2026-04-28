# Legal Posture & Use Policy

This template is a **fork** of [`JCodesMore/ai-website-cloner-template`](https://github.com/JCodesMore/ai-website-cloner-template), modified to **prevent the legal risks** of website cloning while preserving the value of design pattern study.

## What this fork does differently

| Aspect | Upstream `ai-website-cloner-template` | This fork (`design-study`) |
|---|---|---|
| Goal | Pixel-perfect clone of target site | Inspired-by template using target's structural patterns |
| Text | "Use actual text from the target site, not placeholders" | Lorem ipsum / paraphrased / generic SaaS copy. **No verbatim text > 5 words** |
| Images | Downloaded from target via `scripts/download-assets.mjs` | **No downloads.** Unsplash random + Lucide icons + AI-generated placeholders |
| Logos | Extracted/traced as React components | **Placeholder monogram only.** Tracing the target's logo is forbidden |
| Favicons / OG | Downloaded from target | **Generated locally** as a generic monogram |
| SVG illustrations | Inlined as React components | Lucide icons or omitted |
| Color palette | Exact match to target | **Hue-shifted 20–40°** — related but distinct |
| Fonts | Target's brand font | Generic stack: Geist / Inter / Source Serif 4 / JetBrains Mono |
| Pre-flight | None | Mandatory legal acknowledgment + `robots.txt` check |
| Output disclaimer | None | `DISCLAIMER.md` emitted into every generated project |

## Why these changes

The upstream template explicitly instructs the AI agent to copy real content and produce a pixel-perfect replica. Doing so against a third party's site can implicate, depending on jurisdiction:

- **Copyright** — UI layout itself is a gray area, but **text, photographs, illustrations, and SVG assets are clearly protected**.
- **Trademark** — logos and brand marks are protected. Reproducing them in any form risks infringement.
- **Trade dress / passing off** — even without copying assets, an indistinguishable look-and-feel can mislead users about origin.
- **Unfair competition / Japan's 不正競争防止法 (Unfair Competition Prevention Act)** —商品等表示の混同惹起 (causing confusion about origin) is actionable.
- **Site Terms of Service** — many sites prohibit scraping, automated access, or reproduction.

This fork is structured so the **output is unambiguously transformative**: distinct palette, distinct copy, distinct imagery, no logo. The user learns from the design vocabulary without reproducing the protected expression.

## What is allowed

- ✅ Studying any **publicly accessible** website's layout, spacing, typography, animation, and interaction patterns
- ✅ Generating an inspired-by template you can ship, customize, or use as a starting point for your own product
- ✅ Rebuilding **your own** sites in a fresh stack (the de-branding is also useful here — it forces a deliberate refresh rather than a stale port)
- ✅ Using the output as portfolio / educational material, with the auto-generated `DISCLAIMER.md` showing your provenance trail

## What is NOT allowed and the skill will refuse

- ❌ Producing a visually indistinguishable copy of any third-party site
- ❌ Downloading any asset (image, video, SVG, favicon, logo) from the target
- ❌ Copying any text fragment longer than 5 consecutive words verbatim
- ❌ Tracing, vectorizing, or otherwise reproducing the target's logo or brand mark
- ❌ Using the target's exact brand colors or brand font
- ❌ Running the skill against a target whose `robots.txt` disallows automation
- ❌ Building deceptive sites for phishing, impersonation, or any unlawful purpose

## Disclaimer

This document is **not legal advice**. It describes the technical posture of this template. If you intend to publish output from this template publicly or commercially, consult a qualified attorney in your jurisdiction — especially if there is any risk that a third party could claim your output resembles theirs.

The maintainers of this fork accept no liability for use of the template. The MIT license terms (inherited from upstream) apply. By using this template, you accept responsibility for ensuring your specific use complies with applicable law and the target site's terms.

## Reporting

If you believe a generated output infringes your work despite the safeguards, please open an issue with details — we will help the user remediate.
