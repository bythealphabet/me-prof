# Blue Frame Digital — Design System

A design system for **Blue Frame Digital**, a web development & digital marketing
studio for businesses in **Curaçao** (Willemstad, CW). The brand's voice is
*"Precision Engineering meets Editorial Luxury"* — a deliberate dialogue between
a **monospace blueprint draft** (Courier) and a **polished sans result** (Plus
Jakarta Sans), rendered on deep navy with glowing electric-blue type.

> Your Curaçao business deserves a website that actually works.

## What the product is

Blue Frame Digital is a small, senior studio (8+ years in web development,
including enterprise work in the Netherlands for clients like DPG Media, National
Geographic and SourceUp), pairing a "blue-collar work ethic" with modern web
engineering. The product is a **marketing website** that sells six services:

- **Professional Websites** — fast, custom, mobile-first sites (no page builders).
- **AI Business Assistant** — custom AI agents trained on a client's own quotes;
  multilingual (EN · NL · ES · PAP), with 24/7 website chat.
- **Conversion Design** — forms, CTAs and trust signals placed to convert.
- **Custom Integrations** — CRM, calendar, payments, WhatsApp automations.
- **Local SEO** — Google Business Profile + map-pack ranking for Curaçao.
- **Growth & Support** — ongoing updates, analytics and new features after launch.

Packages: **Website Build $2,000** and **Complete Package $3,500** (most popular).
Contact is WhatsApp-first; the studio works in four languages.

## Sources

This system was reverse-engineered from the studio's own SvelteKit codebase.
You will need access to explore further:

- **GitHub:** `bythealphabet/blueframedigital` (branch `development`) —
  https://github.com/bythealphabet/blueframedigital
  - Design tokens live in `src/app.css` (ported here verbatim into `tokens/`).
  - The studio's own design notes are at `static/images/DESIGN.md` ("The
    Architectural Blueprint" — the creative north star quoted throughout).
  - Service copy: `src/lib/data/services.ts`, `src/content/services/*.md`.
  - Components mirrored here: `Hero.svelte`, `Services.svelte`, `ServiceCard.svelte`,
    `Pricing.svelte`, `About.svelte`, `Contact.svelte`, `Footer.svelte`,
    `ThemePaletteControl.svelte`.

Explore that repository to build with higher fidelity than this system alone provides.

---

## CONTENT FUNDAMENTALS

**Voice — direct, blue-collar, confident.** Short declarative sentences. Plain
language over jargon. The studio talks like a tradesperson who happens to be a
senior engineer: *"show up, do the work, and don't leave until it's done right."*

- **Person:** "you / your business" for the client; "we / we build" for the studio.
  Rarely "I". The relationship is the studio *for* the client.
- **Casing:** Title Case for headings and service names; sentence case for body.
  Micro-labels and footer headings are **UPPERCASE** (Plus Jakarta Sans, tracked).
- **Punctuation:** em dashes for asides; the eyebrow kicker is prefixed `//`
  (e.g. `// Blue Wave Based`, `// What We Do`) — a code-comment nod to the
  blueprint theme.
- **Stance:** problem → reframe → promise. *"That's not a website problem. That's
  a strategy problem. And it's exactly the gap we fill."* Sells outcomes (leads,
  trust, ranking), not features.
- **Local specificity:** name the island. "Curaçao", "Willemstad", "Curaçao runs
  on WhatsApp", four languages (EN · NL · ES · PAP). This is a local studio, proudly.
- **No emoji.** None in product copy. Technical detail (`< 10s`, `3–6 weeks*`,
  Core Web Vitals) is used sparingly as proof, never as filler.
- **Examples:**
  - Hero: *"Your Curaçao business deserves a website that actually works."*
  - Service: *"Give your business a professional online presence that builds
    trust and turns visitors into clients."*
  - CTA: *"Get in touch — we'll start with a conversation, not a contract."*

---

## VISUAL FOUNDATIONS

**Overall vibe:** a dark, technical "blueprint" — deep authoritative navy, faint
engineering grid, monospace type that *glows*. Polished but raw; precise but
warm. Three swappable palettes let the same structure read as classic blue,
Caribbean ocean, or a carpenter's workshop.

- **Color:** deep navy surfaces (`#0a0e1a` → `#0f1729` → `#152340`), electric blue
  type (`#60a5fa` / `#93c5fd`) that carries a soft glow. Warm signals (coral,
  gold, terracotta, sage) appear sparingly. Three palettes (**blue** default,
  **green** ocean, **wood** workshop) × **dark / light**, set via
  `data-palette` + `data-theme` on `<html>`. Color defines space; **1px borders
  are avoided** — edges come from surface contrast.
- **Type:** Courier-class monospace for headings, body *and* mono (the draft);
  Plus Jakarta Sans for UI chrome and uppercase micro-labels (the result). The
  signature pairing is a `//` monospace eyebrow above a bold statement heading.
  62.5% root font-size (1rem = 10px); fluid `clamp()` scale.
- **Backgrounds:** the **blueprint grid** — a 50px faint-navy line grid behind
  heroes; the **45° draft hatch** texture inside cards; a soft vertical gradient
  on the hero. No photographic full-bleed backgrounds; imagery is masked into
  organic panels. Stock imagery skews cool / urban / desk-and-device.
- **Imagery:** photos fade into the grid via a soft left-edge mask (an "organic"
  clipped panel in the live hero, drawn on canvas). Cool-toned, real, candid.
- **Glow:** brand display type uses `text-shadow: 0 0 20px rgba(96,165,250,.35)`.
  This is *the* signature — headings and prices glow against the navy.
- **Animation:** long, settled ease-out — `cubic-bezier(0.16, 1, 0.3, 1)` on
  nearly everything; durations 300/500/700/1000ms. Cards fade/slide/arc in on
  scroll, shimmer on hover, and tilt subtly in 3D toward the cursor. Theme swaps
  cross-fade colors over 0.3s globally. No bounce on chrome (`bounceIn` exists
  but is reserved). All motion respects `prefers-reduced-motion`.
- **Hover states:** buttons lift (`translateY(-2px)`, secondary also `scale(1.04)`)
  and deepen their shadow; a radial ripple expands from center; cards lift,
  drop their hatch, and sweep a shimmer. Links shift to the paler blue tint;
  tertiary/text buttons grow a 2px underline.
- **Press states:** buttons settle back to `translateY(0)`.
- **Borders & radii:** small, architectural corners — `4 / 8 / 12 / 16px` (+ pill
  `999px` for Data Tags). Sectioning borders are avoided; the one common border
  is the footer's 2px top accent and inputs' focus underline.
- **Shadows:** ambient, **navy-tinted, never pure black** — `rgba(11,28,48,…)`.
  Resting cards `0 4px 16px`; hover `0 20px 40px`; floating elements `0 20px 40px
  rgba(11,28,48,.06)`. Glassmorphism (blur + translucent surface) for the scrolled
  nav and overlays.
- **Cards:** top-lit gradient over `background-card`, 45° hatch, ambient navy
  shadow, `radius-sm`, **no border**; optional hover lift + shimmer.
- **Transparency & blur:** reserved for persistent chrome (scrolled nav, modals) —
  ~70% surface opacity + 12–14px backdrop-blur.
- **Layout:** generous whitespace, fluid sections (`clamp` padding), an
  asymmetric hero (content left, masked image right). Service grid is
  `auto-fit minmax(30rem, 1fr)`.

---

## ICONOGRAPHY

The brand uses **[Lucide](https://lucide.dev)** (`@lucide/svelte` in the
codebase) — clean 24px, 2px-stroke, rounded-cap outline icons. No filled icons,
no emoji, no Unicode glyphs as icons.

- **In this system:** a small, React-safe inline Lucide set lives in
  `ui_kits/website/icons.jsx` (`<Icon name="globe" />`) so icons render as real
  SVG children without the DOM-replacement quirks of `lucide.createIcons()`.
  Lucide is ISC-licensed; the path data is copied verbatim.
- **Service → icon mapping** (matches the codebase): Professional Websites `globe`,
  AI Business Assistant `sparkles`, Conversion Design `filter` (funnel),
  Custom Integrations `plug`, Local SEO `search`, Growth & Support `bar-chart-2`.
- **For full coverage:** load Lucide from CDN
  (`https://unpkg.com/lucide@0.544.0`) or copy more glyphs into `icons.jsx`.
- **Logo:** Blue Frame Digital has **no separate logo mark** — the identity is a
  monospace **wordmark**: `Blue` + `Frame` (paler tint) + `Digital`. (The repo's
  `favicon.svg` is still the default SvelteKit logo and is *not* a brand asset.)
- **Decorative SVGs:** a few service illustrations were imported to `assets/icons/`
  (`google-search.svg`, `phone-demo.svg`, `support-team.svg`).

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link (only `@import`s).
- `base.css` — reset, base element styles, keyframes, `.bfd-blueprint-grid`, `.bfd-hatch`.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `motion.css`.
- `README.md` (this file) · `SKILL.md` (Agent-Skill front matter).

**Components** (`components/<group>/` — React, `.jsx` + `.d.ts` + `.prompt.md` + card)
- `actions/` — **Button** (primary/secondary/ghost/tertiary), **Badge** (Data Tag / solid / outline).
- `surfaces/` — **Card** (base surface), **ServiceCard** (signature 3D-tilt offer card).
- `typography/` — **Eyebrow** (`//` kicker), **SectionHeading** (glowing title).
- `forms/` — **Input** (fill-in-the-blank field; `multiline` → textarea).

**Foundation cards** (`guidelines/foundations/`) — render in the Design System tab:
Colors (navy ramp, surfaces & text, accents, three palettes), Type (hero, scale,
accent), Spacing (scale, radius, elevation), Brand (wordmark, textures, CTA gradient).

**UI kit** (`ui_kits/website/`)
- `index.html` — interactive marketing homepage (hero → services → about →
  pricing → contact → footer) with a live palette/theme switcher. Composes the
  design-system primitives. Also registered as a Starting Point.
- `icons.jsx` · `nav.jsx` · `sections.jsx` — the kit's factored React sources.

**Assets** (`assets/`) — `images/` (hero, stock agency photos, AI/SEO/analytics),
`icons/` (service SVGs).
