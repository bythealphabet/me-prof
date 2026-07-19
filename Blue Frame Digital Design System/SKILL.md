---
name: blueframedigital-design
description: Use this skill to generate well-branded interfaces and assets for Blue Frame Digital (a web development & digital marketing studio for Curaçao businesses), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- `styles.css` is the single entry point — link it and you get all tokens, fonts, the reset, and the `.bfd-blueprint-grid` / `.bfd-hatch` helpers.
- The look is deep navy + glowing electric-blue monospace (Courier) headings, with Plus Jakarta Sans for UI chrome. Three palettes (blue/green/wood) × dark/light via `data-palette` + `data-theme` on `<html>`.
- React primitives live in `components/` (Button, Badge, Card, ServiceCard, Eyebrow, SectionHeading, Input). A full marketing-site recreation is in `ui_kits/website/`.
- Voice: direct, blue-collar-confident, local to Curaçao, no emoji. `//` monospace kickers above bold statement headings.
