# Luma — recreation

A recreation of **lumauae.com** as a frontend learning exercise — same structure,
sections, page count, fonts, colour theme, copy, and motion feel. All photos, the
3D product render, and the logo are **placeholders** to be swapped for real assets.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Stack

Vite · React 18 · TypeScript · Tailwind CSS · React Router ·
Motion · GSAP (ScrollTrigger + SplitText) · Lenis

## Pages

| Route             | Page                                            |
|-------------------|-------------------------------------------------|
| `/`               | Home — single scroll, 9 sections                |
| `/shop`           | Shop — 8-product grid                           |
| `/product/:slug`  | Product detail (8 products)                     |

## Structure

- `src/components` — shared UI (header, footer, cursor, smooth scroll, cards…)
- `src/sections` — Home page sections (hero, about, products, testimonials…)
- `src/pages` — route components
- `src/lib` — gsap setup, product data
- `src/hooks` — typewriter, count-up
- `src/images/` — real image slots, one folder per section (see `src/images/README.md`)
- `docs/` — `source-analysis.md` (spec of the original) and `build-plan.md`

## Swapping in real assets

Drop image files into `src/images/<section>/`. See `src/images/README.md`
for how to replace each one with a real photo without touching layout.

## Notes

Recreates layout patterns and motion techniques only. Copy is carried as
placeholder text; brand name, photography, and final wording are yours to set.
