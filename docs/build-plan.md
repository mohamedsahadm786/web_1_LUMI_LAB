# Build Plan — Luma recreation

Section-by-section build order, component tree, and which library owns each animation.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** — utility styling + design tokens
- **React Router** — `/`, `/shop`, `/product/:slug`
- **Motion** (`motion/react`) — UI state, hover/tap, card reveals, page transitions
- **GSAP + ScrollTrigger + SplitText** — scroll-driven sequences, heading line reveals, parallax, counters
- **Lenis** — smooth scroll
- Pure CSS — marquee loop, rotating rings, micro-interactions

GSAP 3.13+ ships SplitText free, so heading reveals use the real plugin.

## Animation ownership

| Effect                          | Library          |
|---------------------------------|------------------|
| Smooth scroll                   | Lenis            |
| Hero load-in stagger            | Motion           |
| Hero typewriter headline        | Custom hook      |
| Hero parallax bg + float image  | GSAP ScrollTrigger / CSS |
| Section heading line reveals    | GSAP SplitText + ScrollTrigger |
| Card reveal on scroll (stagger) | Motion `whileInView` |
| Card hover tilt / image zoom    | Motion           |
| About counter count-up          | GSAP ScrollTrigger + custom |
| Marquee infinite strip          | CSS keyframes    |
| Testimonials carousel           | Motion (drag) + autoplay |
| Custom cursor                   | Motion (spring)  |
| Decorative rotating ring        | CSS keyframes    |

All animation respects `prefers-reduced-motion`.

## Folder structure

```
src/
  main.tsx, App.tsx, index.css
  lib/        gsap.ts (plugin reg), useReducedMotion.ts, products.ts (data)
  hooks/      useTypewriter.ts, useCountUp.ts
  components/ Header, Footer, Cursor, SmoothScroll, WhatsAppButton,
              Marquee, SectionLabel, RevealText, ProductCard, Reveal
  sections/   Hero, Features, About, Products, WhyUs, HelpCta,
              Testimonials, Contact
  pages/      Home, Shop, Product
assets/       placeholder images dumped per section (user replaces)
```

## Build order (section by section, verify each in Playwright)

1. Scaffold + config + fonts + tokens + Lenis + cursor
2. Header + Footer (shell)
3. Hero
4. Features trio
5. About + counter + marquee
6. Products grid + ProductCard
7. Why Us + Help CTA
8. Testimonials + Contact
9. Shop page + Product detail page
10. Motion-polish pass vs original

## Asset placeholders

`assets/` gets one subfolder per section name. Each holds a generated SVG/solid
placeholder sized to the real slot, so the user drops in real photos later
without touching layout.
