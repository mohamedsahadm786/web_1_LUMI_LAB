# Changes log

A running history of every change made to this project, newest section last.
Each entry notes what changed and (where relevant) the git commit.

---

## 1. Project setup & initial build

_Commit `7ea6681` — "Recreate lumauae.com — Vite + React + TS frontend rebuild"_

1. **Analysed the original site** (lumauae.com) with Playwright — captured its
   sections, fonts, colours, copy, and motion stack. Findings written to
   `docs/source-analysis.md`.
2. **Wrote a build plan** — component tree, animation ownership, build order —
   in `docs/build-plan.md`.
3. **Added `CLAUDE.md`** — project memory: stack, conventions, and "do not" rules.
4. **Scaffolded the project** — Vite + React 18 + TypeScript, Tailwind CSS,
   React Router, plus Motion + GSAP (ScrollTrigger/SplitText) + Lenis.
5. **Set up design tokens** — near-black `#030303` background, `#c2c2c2` body
   text, white headings, monochrome dark theme; fonts Clash Display, Six Caps,
   DM Sans.
6. **Built the shared shell** — sticky `Header` (transparent → solid on scroll),
   `Footer`, custom `Cursor`, `SmoothScroll` (Lenis), floating `WhatsAppButton`.
7. **Built the Home page (9 sections)** — Hero (typewriter + parallax),
   Features trio, About (count-up stat), Marquee, Products grid, Why Us,
   Help CTA, Testimonials carousel, Contact form.
8. **Built the Shop page** — 8-product grid.
9. **Built the Product detail page** — dynamic `/product/:slug` route with
   gallery, info, accordion, and related products.
10. **Added placeholder assets system** — `assets/` folders per section + a
    `Placeholder` component sized to each real image slot.
11. **Fixed a bug** — the Contact section heading was missing its font size;
    set it to the standard display-heading size.
12. **Verified everything** — TypeScript compiles clean, no console errors, all
    pages and scroll animations checked in Playwright.

## 2. Repository & hosting prep

_Commit `eca2688` — "Add Vercel SPA rewrite config"_

13. **Initialised git** and pushed the project to
    `github.com/mohamedsahadm786/web_1_LUMI_LAB` (branch `main`).
14. **Added `vercel.json`** — rewrites all routes to `index.html` so client-side
    routes (`/shop`, `/product/:slug`) resolve on direct load and refresh once
    hosted on Vercel.
15. **Added `README.md`** and `.gitignore`.

## 3. Header — cart & search icons

_Commit `9459480` — "Add cart and search icons to header"_

16. **Added two round icon buttons** to the right of the header nav (order:
    Buy Now → Cart → Search), matching the reference screenshot.
17. **Cart icon** — includes a small count badge showing `0`.
18. **Search icon** — magnifying-glass icon.
19. **Hover behaviour** — on hover the circle fills white and the icon turns
    dark; the cart badge inverts (dark on white) so it stays visible.
20. Icons show from the `sm` breakpoint up; mobile keeps the hamburger menu.

## 4. Header — cart drawer & search overlay (click behaviour)

_Commit `<pending>` — "Add cart drawer and search overlay"_

21. **Cart drawer** (`CartDrawer.tsx`) — clicking the cart icon slides a panel
    in from the **right** with a dimmed backdrop.
22. Cart panel header shows `CART (0 ITEMS)` + a round white close button;
    empty state shows a large cart icon, "your cart is empty", and a full-width
    "Browse Shop" button linking to `/shop`. _(Line items come later.)_
23. **Search overlay** (`SearchOverlay.tsx`) — clicking the search icon slides
    a panel **down from the top** with a dimmed backdrop.
24. Search panel has the LUMA logo, a text input ("Type your search words..."),
    and a round close button; the input auto-focuses when it opens.
25. **Live results** — products filter as you type; clicking any result
    navigates to that product page (`/product/:slug`) and closes the overlay.
    _(A dedicated results page may replace this — pending the next prompt.)_
26. Both overlays: close on backdrop click, on `Escape`, and on route change;
    page scroll (Lenis + native) is locked while open. Opening one closes the
    other. Added a shared `useLockScroll` hook.

## 5. Modular image system

_Commit `<pending>` — "Add modular image system"_

27. **New `src/images/` folder** with one subfolder per section
    (`logo/`, `hero/`, `about/`, `products/`, `testimonials/`) — the single
    place to drop real photos. Replaced the old root `assets/` folder.
28. **Auto-detect** — `src/lib/images.ts` picks up every file under
    `src/images/` automatically; look up by `folder/name` with no extension.
    Drop a file, save, it appears — no code editing, and `.jpg`/`.png`/`.webp`
    etc. all work.
29. **`Img` component** — shows the real photo if its file exists, otherwise
    falls back to the sized placeholder (or nothing, for the hero background).
    Wired into Hero, About, product cards, the product page, testimonials,
    and the search results.
30. **`Logo` component** — uses `src/images/logo/logo.*` if present, else the
    "LUMA" wordmark; shared by the header, footer, and search bar.
31. **`src/images/README.md`** — lists exactly which file name goes in which
    folder.
