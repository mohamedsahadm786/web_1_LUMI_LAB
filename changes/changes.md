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

## 6. Dummy images placed in every photo slot

_Commit `<pending>` — "Place dummy images in all photo slots"_

32. Copied one of the uploaded product images into **every photo slot** so the
    site looks complete; each is a stand-in to be swapped for the real photo.
33. **Self-describing file names** — each dummy is named after the exact slot
    it fills, so it is obvious what to replace:
    - `hero/home-hero-product-image`, `hero/home-hero-background-image`
    - `about/home-about-large-image`, `about/home-about-small-image`
    - `testimonials/home-testimonial-{michael-reed,emily-carter,sofia-bennett}`
    - `products/<product-name>` for all 8 products
34. Updated the `Img` references in code to the new names — a one-time change
    so no code editing is ever needed again; replacing a photo is now purely
    "drop file in folder with the same name".
35. **Logo** kept as the "LUMA" wordmark (no dummy) — slot renamed to
    `logo/site-logo`; add that file anytime to switch to a real logo.
36. Rewrote `src/images/README.md` with the new names and the replace steps.

## 7. Hero — background image & rotated product

_Commit `<pending>` — "Show hero background image, rotate hero product"_

37. **`home-hero-background-image`** now fills the entire Home (hero) section
    as its background. The bug: the background layer used a negative
    `z-index` (`-z-10`) which hid it behind an opaque surface — fixed by
    layering it at `z-0` with the hero content at `z-10`.
38. Replaced the heavy dark overlay with a light gradient (top + left fade
    only) so the background photo stays clearly visible while the heading
    text remains readable.
39. **`home-hero-product-image`** is now rotated 90° to the right, kept in
    the same position as before.

## 8. Features row — added image square

_Commit `<pending>` — "Add image square to features row"_

40. Added a **4th cell** to the Features row (below the hero), on the far
    right — a square tile holding the image `src/images/extra/E_1.webp`.
41. The features grid is now 4-up on large screens (`grid-cols-1` →
    `sm:grid-cols-2` → `lg:grid-cols-4`); the square top-aligns with the
    three feature cards and gently zooms on hover.
