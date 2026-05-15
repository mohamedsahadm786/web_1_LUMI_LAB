# Project — Luma recreation

Recreating **lumauae.com** as a learning exercise: same structure, sections, page
count, fonts, color theme, copy, and motion/transition feel. Photos, 3D renders,
and logo are placeholders to be swapped for real assets later.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (tokens in `tailwind.config.js` + `src/index.css`)
- React Router — routes: `/`, `/shop`, `/product/:slug`
- Motion (`motion/react`) — UI/component animation
- GSAP + ScrollTrigger + SplitText — scroll-driven sequences
- Lenis — smooth scroll

## Conventions

- Components in `src/components`, page sections in `src/sections`, routes in `src/pages`.
- Register GSAP plugins once in `src/lib/gsap.ts`; import from there.
- Use `useGSAP` from `@gsap/react` for GSAP code (auto-cleanup), not raw `useEffect`.
- Animate **`transform` and `opacity` only** — never `width`/`height`/`top`/`left`.
- Design tokens via Tailwind theme + CSS variables; no hardcoded hex in components.
- Real images go in `src/images/<section>/`; reference them via the `<Img>`
  component (resolved by `src/lib/images.ts`). Missing file falls back to
  `<Placeholder>`. Never inline base64 images.

## Do not

- No Create React App. Ever.
- No new animation libraries beyond Motion / GSAP / Lenis without asking.
- No generic fonts (Inter/Roboto/Arial). Fonts are fixed: Clash Display, Six Caps, DM Sans.
- Do not animate layout properties (jank). Transform/opacity only.
- Do not remove `prefers-reduced-motion` handling.
- Do not declare a section done before verifying it in Playwright.

## Design tokens

- bg `#030303` · surface `#0c0c0c` · text `#c2c2c2` · heading `#fff`
- hairline `rgba(255,255,255,0.1)` · whatsapp `#25d366`
- Monochrome dark theme — white on near-black, no colored accent.
