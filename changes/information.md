# Project Information — Luma Recreation

> **Purpose of this file.** A single, self-contained reference describing the
> whole repository — stack, structure, design system, every component / hook /
> section / page, the content, and the current state. Read **this file** instead
> of the entire codebase to get back up to speed on the project.
>
> Companion docs: `docs/source-analysis.md` (spec of the original site),
> `docs/build-plan.md` (the original build plan), `changes/changes.md` (running
> change log), `CLAUDE.md` (project rules), `src/images/README.md` (asset slots).

---

## 1. What this project is

A from-scratch frontend **recreation of `lumauae.com`** — a dark, luxury,
monochrome marketing + shop site for "Luma", a brand of premium research
peptide / supplement formulations (Dubai, UAE).

It is a **learning exercise**: it reproduces the original's structure, section
order, page count, fonts, colour theme, copy, and motion/transition *feel* — but
with a lean modern stack instead of the original's WordPress + Elementor build.
Photos, the 3D product render, and the logo are placeholder-friendly slots meant
to be swapped for real assets.

The original was WordPress + Elementor ("dreamslab"/bravisthemes theme) using
GSAP, Lenis, Swiper, jarallax, WOW.js, tilt.js, three.js distortion, custom
cursor, and a typewriter headline. This rebuild reproduces the *feel* of all of
that with: **Motion + GSAP + Lenis + pure CSS**.

---

## 2. Tech stack

| Layer            | Choice                                                        |
|------------------|---------------------------------------------------------------|
| Build tool       | **Vite 6** (`@vitejs/plugin-react`)                           |
| Framework        | **React 18.3** + **TypeScript 5.7**                           |
| Styling          | **Tailwind CSS 3.4** (+ PostCSS, autoprefixer)                |
| Routing          | **React Router 6.28** (`react-router-dom`)                    |
| UI animation     | **Motion 11** (`motion/react` — the successor to Framer Motion)|
| Scroll animation | **GSAP 3.13** + **ScrollTrigger** + **SplitText** + `@gsap/react` |
| Smooth scroll    | **Lenis 1.1**                                                 |
| Misc motion      | Pure CSS keyframes (marquee, ring spin, bob, blink, glow)     |

GSAP 3.13+ ships SplitText for free, so heading reveals use the real plugin.

### Commands (`package.json`)

```
npm run dev      # vite dev server — http://localhost:5173
npm run build    # tsc -b  then  vite build
npm run preview  # preview the production build
```

No test runner, no linter config in the repo. Verification is done manually in
Playwright (per project rules).

### Dependencies
- Runtime: `@gsap/react`, `gsap`, `lenis`, `motion`, `react`, `react-dom`, `react-router-dom`
- Dev: `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `autoprefixer`, `postcss`, `tailwindcss`, `typescript`, `vite`

---

## 3. Repository structure

```
Recreation/
  index.html              # HTML shell — fonts preloaded here
  package.json            # name "luma-recreation", v0.1.0
  vite.config.ts          # react plugin, dev port 5173
  tailwind.config.js      # design tokens, keyframes, animations
  tsconfig.json / tsconfig.node.json
  postcss.config.js
  vercel.json             # SPA rewrite — all routes -> index.html
  README.md
  CLAUDE.md               # project memory: stack, conventions, do-nots
  .gitignore

  docs/
    source-analysis.md    # behavioural spec of the original site
    build-plan.md         # section-by-section build order + anim ownership

  changes/
    changes.md            # running change log (newest section last)
    information.md         # THIS FILE

  src/
    main.tsx              # React root — BrowserRouter + StrictMode
    App.tsx               # app shell + <Routes>
    index.css             # Tailwind layers + global CSS + reduced-motion
    vite-env.d.ts

    lib/
      gsap.ts             # registers ScrollTrigger + SplitText, re-exports
      images.ts           # image registry — resolves src/images/** files
      products.ts         # the 8-product catalogue + Product type

    hooks/
      useTypewriter.ts    # rotating typewriter headline
      useCountUp.ts       # 0 -> N count-up on scroll-in
      useLockScroll.ts    # freezes scroll while an overlay is open

    components/           # shared UI (16 files)
      Header.tsx  Footer.tsx  Cursor.tsx  SmoothScroll.tsx  WhatsAppButton.tsx
      CartDrawer.tsx  SearchOverlay.tsx  Logo.tsx
      Img.tsx  Placeholder.tsx
      Marquee.tsx  SectionLabel.tsx  Reveal.tsx  RevealText.tsx
      ProductCard.tsx

    sections/             # Home-page sections (8 files)
      Hero.tsx  Features.tsx  About.tsx  Products.tsx
      WhyUs.tsx  HelpCta.tsx  Testimonials.tsx  Contact.tsx

    pages/                # route components (3 files)
      Home.tsx  Shop.tsx  Product.tsx

    images/               # real-asset slots, one folder per section
      logo/  hero/  about/  testimonials/  extra/  products/  product-gallery/
      README.md           # explains every image slot + how to swap assets
```

---

## 4. Design system

### Colour tokens (Tailwind `theme.extend.colors` + CSS)
| Token       | Value                      | Use                              |
|-------------|----------------------------|----------------------------------|
| `ink`       | `#030303`                  | page background (near-black)     |
| `surface`   | `#0c0c0c`                  | raised panels / cards            |
| `surface2`  | `#111111`                  | card hover state                 |
| `body`      | `#c2c2c2`                  | body text (light grey)           |
| `hairline`  | `rgba(255,255,255,0.10)`   | thin dividers / borders          |
| `whatsapp`  | `#25d366`                  | floating WhatsApp button only    |
| heading     | `#ffffff`                  | white headings (no token, raw)   |

Theme is **monochrome dark** — white-on-near-black, **no coloured accent** other
than the WhatsApp green. Do not introduce accent colours.

### Fonts (loaded in `index.html`)
| Family            | Tailwind class  | Use                                            | Source          |
|-------------------|-----------------|------------------------------------------------|-----------------|
| **Clash Display** | `font-display`  | display headings, big statements               | Fontshare       |
| **Six Caps**      | `font-caps`     | oversized condensed eyebrow labels (faint, watermark-like) | Google Fonts |
| **DM Sans**       | `font-sans`     | body copy, nav, small UI, marquee              | Google Fonts    |

Fonts are **fixed** — never substitute Inter/Roboto/Arial.

### Other Tailwind extensions
- `maxWidth.shell` = `1320px` — the page content container width.
- `transitionTimingFunction.smooth` = `cubic-bezier(0.22,1,0.36,1)` (class `ease-smooth`).
- The cubic-bezier `[0.22, 1, 0.36, 1]` is the **standard ease** used everywhere
  in Motion transitions (declared inline as `const ease` in many files).

### CSS keyframes / animations (`tailwind.config.js`)
| Animation class   | Keyframe | Effect                                         |
|-------------------|----------|------------------------------------------------|
| `animate-marquee` | marquee  | translateX 0 -> -50% — infinite strip, 32s     |
| `animate-spinslow`| spinslow | rotate 360°, 26s — decorative dashed rings     |
| `animate-bob`     | bob      | translateY ±1.2rem, 6s — floating hero render  |
| `animate-blink`   | blink    | opacity blink, 1s step-end — typewriter caret  |
| `animate-glow`    | glow     | pulsing box-shadow, 3.6s — About image tiles   |

### Global CSS (`src/index.css`)
- `color-scheme: dark`; CSS reset; `html/body` background `#030303`, text `#c2c2c2`, DM Sans.
- Lenis helper classes (`html.lenis`, `.lenis-smooth`, `.lenis-stopped`).
- White text **selection** (white bg, dark text).
- Custom-cursor support: `body.has-cursor *` sets `cursor: none` (only on hover/fine-pointer devices).
- `.split-line` — `overflow:hidden` mask wrapper for GSAP SplitText line reveals.
- `.shell` — the centered content container (max-width 1320px, responsive inline padding).
- Thin dark custom scrollbar.
- **`prefers-reduced-motion`** block kills animation/transition durations — must be kept.

### The `.shell` container
Used everywhere as the centered page-width wrapper. `width:100%`, `max-width:1320px`,
auto inline margins, `padding-inline: 1.5rem` (`2.5rem` ≥768px).

---

## 5. App shell & routing

### `src/main.tsx`
React root in `StrictMode`, wrapped in `<BrowserRouter>`, imports `index.css`.

### `src/App.tsx`
Renders, in order: `<SmoothScroll/>`, `<Cursor/>`, `<Header/>`, then `<main>`
with the `<Routes>`, then `<Footer/>`, then `<WhatsAppButton/>`.

### Routes
| Path              | Component        | Description                          |
|-------------------|------------------|--------------------------------------|
| `/`               | `pages/Home`     | single-scroll home, 9 stacked sections |
| `/shop`           | `pages/Shop`     | full 8-product grid                  |
| `/product/:slug`  | `pages/Product`  | dynamic product detail page          |

`vercel.json` rewrites every route to `index.html` so deep links / refresh work
on the SPA when hosted on Vercel.

Header / footer nav links are hash anchors into the Home sections
(`/#home`, `/#about`, `/#products`, `/#why-us`, `/#testimonials`, `/#contact`)
plus a "Buy Now" → `/shop`.

---

## 6. Core libraries & techniques

### `src/lib/gsap.ts`
Registers `ScrollTrigger` + `SplitText` **once** and re-exports `{ gsap,
ScrollTrigger, SplitText }`. Always import GSAP from here, never directly.

### Lenis smooth scroll — `components/SmoothScroll.tsx`
- Creates a single Lenis instance (`duration 1.15`, exponential easing,
  `touchMultiplier 1.6`), drives it with a `requestAnimationFrame` loop.
- Pipes `lenis.on('scroll', ScrollTrigger.update)` so GSAP stays in sync.
- **Disabled entirely** when `prefers-reduced-motion: reduce`.
- Second effect handles **route + hash navigation**: scrolls to `#hash` targets
  (offset -80 for the fixed header) or to top on route change.
- Exports `getLenis()` so other modules (e.g. `useLockScroll`) can stop/start it.

### Motion (`motion/react`)
Used for: header mobile-menu expand, page/section reveals (`whileInView`),
hover/tap micro-interactions, the custom cursor spring, product-card 3D tilt,
testimonials carousel transitions, cart/search overlay slide-ins, accordion height.

### GSAP + ScrollTrigger + SplitText
Used for: hero background parallax (`scrub`), section-heading line reveals
(`RevealText`), the "Why Us" word-by-word scrub reveal, and the count-up tween.
GSAP code runs inside `useGSAP` (from `@gsap/react`) for automatic cleanup.

### Image registry — `src/lib/images.ts`
- `import.meta.glob` eagerly imports **every** file under `src/images/**`
  (png, jpg, jpeg, webp, avif, svg, mp4, webm, mov — any case).
- Builds a lookup keyed by `"<folder>/<name>"` **without extension**, lowercased.
- `img(name)` returns the resolved URL or `null` if no file exists.
- Result: drop a correctly-named file into `src/images/<folder>/` and it appears
  with **no code change**; missing files fall back to a placeholder.

---

## 7. Components (`src/components`)

### `Header.tsx`
Fixed top header (`z-200`, height 84px). Transparent over the hero; gains a
dark blurred background + hairline border once `window.scrollY > 40` (or when
the mobile menu is open). Contains:
- `<Logo size="sm">`.
- Desktop nav (`lg:`) — 6 anchor links with an animated underline on hover.
- Right cluster: white **"Buy Now"** pill → `/shop`; round **cart** button (with
  a count badge, currently `CART_COUNT = 0`); round **search** button; mobile
  **hamburger** (toggles to an X).
- Mobile menu — Motion `AnimatePresence` height/opacity expand.
- Renders `<CartDrawer>` and `<SearchOverlay>`; opening one closes the other;
  all close on route change.

### `Footer.tsx`
Dark footer, hairline top border. Three columns (brand+contact / Quick Links /
newsletter). Brand column: eyebrow, `<Logo size="lg">`, address, phone, email,
"Start Your Order" → `/shop`. Newsletter has a controlled email input + a
fake-submit that flips to a "Subscribed — thank you" state. Facebook / Instagram
text links (`href="#"`). Bottom bar: dynamic-year copyright. Giant faint
`font-caps` "Luma" watermark at the very bottom. Column blocks wrapped in `<Reveal>`.

### `Cursor.tsx`
Custom cursor — a small white dot + a lagging spring-driven ring. The ring grows
and brightens over `a, button, [data-cursor="hover"]`. Only enabled on
hover/fine-pointer devices; adds `body.has-cursor` (which hides the native cursor).

### `SmoothScroll.tsx`
See §6. Renders nothing; provides Lenis + `getLenis()`.

### `WhatsAppButton.tsx`
Fixed **bottom-left** floating green WhatsApp button (`z-150`), links to
`https://wa.me/971543800625`. Springs in after a 1.4s delay; has a pinging ring.

### `CartDrawer.tsx`
Right-side slide-in panel (`createPortal` to `document.body`, `z-300/310`).
Dimmed backdrop. Header shows `CART (n ITEMS)` + round rotating close button.
Currently an **empty-state only** — large cart icon, "your cart is empty",
full-width "Browse Shop" → `/shop`. Closes on backdrop click / Escape. Uses
`useLockScroll`. (Line items are not yet implemented.)

### `SearchOverlay.tsx`
Slide-**down**-from-top panel (portal, `z-300/310`). Dimmed backdrop. Row of:
logo · text input · close button. Input auto-focuses 420ms after open. **Live
results** — filters `products` by name as you type; shows all as "Popular
products" when empty; each result links to `/product/:slug`. Closes on backdrop /
Escape / route change. Uses `useLockScroll`.

### `Logo.tsx`
Brand logo, links to `/#home`. Shows `images/logo/site-logo` if present,
otherwise the **"LUMA"** wordmark (Clash Display) + a small dot. `size` prop
`'sm' | 'lg'`.

### `Img.tsx`
**Smart media slot.** Given `name="folder/name"`, resolves via `img()`:
- video file → autoplaying muted looping `<video>`;
- image file → lazy `<img>` with `object-cover`;
- nothing → `<Placeholder>` (or renders nothing if `fallback="none"`).
Props: `name, alt, label, tint, className, rounded, fallback`.

### `Placeholder.tsx`
Sized stand-in for a missing photo — a tinted radial-gradient panel with an SVG
noise/grain overlay, a small image-icon, and an uppercase label. Keeps layout
final before real assets arrive.

### `Marquee.tsx`
Infinite horizontal scrolling strip — pure CSS `animate-marquee`, pauses on
hover. Six slash-separated phrases (Clash Display): "Premium Research
Formulations", "Fast WhatsApp Support", "Trusted by Thousands",
"Customer-Focused Service", "Easy WhatsApp Ordering", "Precision in Every Product".

### `SectionLabel.tsx`
Oversized **Six Caps** eyebrow watermark (e.g. "ABOUT US", "OUR PRODUCTS"). Fades
in to only `opacity: 0.14` — a faint background-style label. `fontSize:
clamp(5rem,16vw,14rem)`.

### `Reveal.tsx`
Generic scroll-reveal wrapper — Motion `whileInView` fade + slide, plays **once**.
Props: `from` (`'up'|'down'|'left'|'right'`), `delay`, `distance` (px), `className`.

### `RevealText.tsx`
Masked **line-by-line heading reveal** — GSAP SplitText (two passes: one for the
`.split-line` overflow mask, one for the moving lines) + ScrollTrigger. Lines
rise from `yPercent:115` with a stagger. Skipped under reduced-motion. `as` prop
picks the tag. Used for major section headings.

### `ProductCard.tsx`
The product card used in the Products section, Shop, and "related" grids.
- **3D tilt** toward the cursor (Motion `useMotionValue` + `useSpring` +
  `useTransform`, `TILT = 12°`, `transformPerspective: 900`).
- A pointer-following **glare** (radial gradient via `useMotionTemplate`).
- A **shining rim** (inset box-shadow) on hover.
- Image **zooms** on hover; a **hover action rail** (Add to Cart / Enquire +
  heart) slides up from the bottom.
- Staggered fade-up entrance (`whileInView`, delay by `index % 4`).
- Title + price below; whole card links to `/product/:slug`.

---

## 8. Hooks (`src/hooks`)

### `useTypewriter(phrases, opts)`
Rotating typewriter — types a phrase, holds, deletes, advances to the next.
Options: `typeSpeed 55`, `deleteSpeed 28`, `hold 1800` (ms). Under
reduced-motion it just shows `phrases[0]` statically.

### `useCountUp(target, duration = 1.6)`
Returns `{ ref, value }`. A GSAP tween counts `0 -> target`, fired **once** by a
ScrollTrigger when the `ref` element scrolls into view (`top 85%`).

### `useLockScroll(locked)`
While `locked`, stops Lenis (`getLenis().stop()`) and sets `body.overflow:
hidden`; restores both on unlock. Used by the cart drawer and search overlay.

---

## 9. Home page sections (`src/sections`)

`pages/Home.tsx` stacks them in this order:
**Hero → Features → About → Marquee → Products → WhyUs → HelpCta → Testimonials → Contact.**

### `Hero.tsx` — `#home`
Full-viewport. Parallax background (`images/hero/home-hero-background-image`,
GSAP `scrub` yPercent) with gradient fades; radial fallback gradient if no image.
Left column: pill eyebrow "High-Purity Research Peptides", an `<h1>` with a
**typewriter** rotating between two phrases + a blinking caret, a sub-paragraph,
and two buttons ("Shop Products" → `/shop`, "Discover Luma" → `#about`). Right
column: a floating product render (`images/hero/home-hero-product-image`) in a
`animate-bob` loop, inside a rotated/clipped frame. Staggered Motion load-in.
A "Scroll" cue at the bottom.
- Typewriter phrases: *"Your Weight-Loss Journey Reinvented by Science"* and
  *"Lab-Engineered Formulations for Your Biology"*.

### `Features.tsx`
A 4-cell responsive grid: **3 feature cards** + **1 image tile** (`extra/E_1`).
Each card has a decorative `animate-spinslow` dashed ring, an SVG icon, title,
paragraph, and an `0n / 03` index. Cards fade-up with stagger on scroll.
Features: **Purity First**, **Reliable Consistency**, **Secure Packaging**.

### `About.tsx` — `#about`
- `<SectionLabel>` "About Us".
- Left: a composition of **3 image tiles + 1 counter tile**. The tiles do a
  two-phase **"pile" entrance** (appear in a central cluttered heap, hold, then
  spread out and align into their real slots) via Motion keyframe arrays.
- The 3 image tiles **cycle their pictures clockwise** every 2.8s (`CyclingImage`
  + `AnimatePresence`, per-slot enter/exit directions in `FLOW`). The cycle media
  is `about/video`, `about/home-about-stat-image`, `about/home-about-small-image`.
- The counter tile uses `useCountUp(25)` → shows `25+` with label "High-Purity
  Research Peptides".
- A looping **"Shine"** sweep crosses each tile.
- All four tiles have `animate-glow`.
- Right: eyebrow "Who We Are", a `<RevealText>` heading *"Advancing Modern
  Research with Smarter Formulations"*, two body paragraphs, and 3 check items
  (Verified Suppliers / Sealed & Protected / Uniform Standards).

### `Marquee.tsx`
(Component, rendered between About and Products.) See §7.

### `Products.tsx` — `#products`
`<SectionLabel>` "Our Products"; `<RevealText>` heading *"Research formulations
packed with precision and care"*; a "View All Products" → `/shop` link; then a
responsive grid (2/3/4 cols) of all 8 `<ProductCard>`s.

### `WhyUs.tsx` — `#why-us`
Centered eyebrow "Why Choose Luma". One oversized statement heading — *"We
deliver dependable, quality formulations with careful handling and supportive
customer service."* — revealed **word-by-word** by a GSAP scrubbed SplitText
(words go `opacity 0.12 -> 1`). Below: **4 flip circles** — outlined circle with
a title on the front, white circle with a description on the back, flip on hover
(`rotateY 180deg`, `preserve-3d`). Circles: Consistent Results, Verified Purity,
Reliable Service, Quick Support.

### `HelpCta.tsx`
Full-bleed background image (`extra/E_2`) darkened with gradient fades. A
blurred glass card lifts in on scroll, with a decorative spinning dashed ring.
Content: eyebrow "Here to Guide You", heading *"Let's Talk To / Get Instant
Help"*, line "Transparent communication, every step of the way.", and a
**"Chat on WhatsApp"** button → `wa.me`.

### `Testimonials.tsx` — `#testimonials`
`<SectionLabel>` "Testimonials". Left: eyebrow "Trusted by Thousands",
`<RevealText>` heading *"What Our Customers Say"*, a paragraph, prev/next arrow
buttons, and an `0n / 03` index. Right: a single testimonial **card carousel** —
`AnimatePresence` swap with directional slide, **auto-advances every 5.2s**,
arrows scrub manually. Three reviews: **Michael Reed** (Research Assistant),
**Emily Carter** (Wellness Consultant), **Sofia Bennett** (Fitness Coordinator);
each has quote, avatar (`testimonials/home-testimonial-<slug>`), name, role,
5 stars.

### `Contact.tsx` — `#contact`
A full-bleed **white panel** (the only light block on the site) over a banner
image. Panel: contact details top-right (Level 5, Dubai, UAE / sales@lumauae.com
/ +971 54 380 0625), heading **"Get in Touch"**, a paragraph, and a "Chat With
Us" → `wa.me` button. Banner image is `extra/E_3`. Wrapped in `<Reveal>`.

---

## 10. Pages (`src/pages`)

### `Home.tsx`
Stacks the 9 home sections (see §9). The README/source-analysis call it
"9 sections" — Marquee is a component rather than a `sections/` file.

### `Shop.tsx`
Top padding for the fixed header. A title section — breadcrumb (Home / Shop),
big "All Products" `<h1>`, and a count line — then a responsive grid (2/3/4
cols) of all 8 `<ProductCard>`s.

### `Product.tsx` — `/product/:slug`
- Looks up the product with `getProduct(slug)`; renders a "Product not found"
  fallback (with a Back-to-Shop link) for an unknown slug.
- Breadcrumb: Home / Shop / product name.
- **Gallery**: a main `<Img>` + **4 thumbnails** below. `active` state (null =
  the main `products/<slug>` image; `0..3` = `product-gallery/<slug>_<n>`).
  Clicking a thumbnail swaps the main image; resets when the slug changes.
- **Info column**: "Research Formulation" tag, product name, price (or "Price on
  enquiry"), 5 stars, blurb, a **quantity stepper**, an "Add to Cart" /
  "Enquire on WhatsApp" button (chosen by whether the product has a price), and
  a 4-row **accordion** (Form / Purity / Storage / Handling — content from the
  `DETAILS` array, Motion height animation).
- **"You May Also Like"** — 4 related `<ProductCard>`s (other products).

> Note: cart / quantity / "Add to Cart" are **UI-only** — no real cart state or
> checkout exists yet.

---

## 11. Image system (`src/images/`)

One folder per section; files are auto-detected by `lib/images.ts`. Reference a
slot through `<Img name="folder/name">` (no extension). Missing file → placeholder.

| Folder             | Slots                                                          |
|--------------------|----------------------------------------------------------------|
| `logo/`            | `site-logo` (no dummy — wordmark shows until added)            |
| `hero/`            | `home-hero-background-image`, `home-hero-product-image`        |
| `about/`           | `video`, `home-about-stat-image`, `home-about-small-image` (cycle media; can be image or video) |
| `testimonials/`    | `home-testimonial-michael-reed`, `-emily-carter`, `-sofia-bennett` |
| `extra/`           | `E_1` (Features tile), `E_2` (HelpCta bg), `E_3` (Contact banner) |
| `products/`        | one image per product slug (8)                                 |
| `product-gallery/` | 4 thumbnails per product: `<slug>_1` … `<slug>_4` (32 files)   |

To swap an asset: drop a correctly-named file into the folder (extension may
differ) — no code change. See `src/images/README.md` for the full table.

> **Note on current git state:** several `product-gallery` files are mid-swap —
> some `.webp` thumbnails were replaced with `.png` / `.jpg` versions for
> bpc-157-tb-500-40mg, glow-70mg, retatrutide-20mg, retatrutide-40mg,
> tirzepatide-40mg. This is an in-progress asset replacement, not a code change.

---

## 12. Product catalogue (`src/lib/products.ts`)

`Product` type: `{ slug, name, price (string|null), tint:[string,string], blurb }`.
Helper `getProduct(slug)`. Prices are AED strings (`د.إ`); `null` = "enquire".

| Slug                  | Name                   | Price          |
|-----------------------|------------------------|----------------|
| `bpc-157-tb-500-40mg` | BPC-157 & TB-500 40mg  | د.إ 999.00     |
| `glow-5mg`            | Glow 5mg               | — (enquire)    |
| `glow-70mg`           | Glow 70mg              | د.إ 1,199.00   |
| `retatrutide-20mg`    | Retatrutide 20mg       | — (enquire)    |
| `retatrutide-40mg`    | Retatrutide 40mg       | د.إ 1,990.00   |
| `tirzepatide-20mg`    | Tirzepatide 20mg       | — (enquire)    |
| `tirzepatide-40mg`    | Tirzepatide 40mg       | — (enquire)    |
| `tirzepatide-5mg`     | Tirzepatide 5mg        | — (enquire)    |

`tint` is a dark-grey gradient pair used to colour the placeholder when the
product image is missing.

---

## 13. Key brand / contact details (used across the site)

- **Brand:** Luma (recreation of Luma UAE).
- **Address:** Level 5, Dubai, UAE.
- **Phone / WhatsApp:** +971 54 380 0625 — `wa.me/971543800625`.
- **Email:** sales@lumauae.com.
- **Social:** Facebook, Instagram (placeholder `#` links).
- Copy throughout is placeholder/recreation text — final wording is the owner's.

---

## 14. Conventions & rules (from `CLAUDE.md`)

- Components → `src/components`; home sections → `src/sections`; routes → `src/pages`.
- Register GSAP plugins only in `src/lib/gsap.ts`; import GSAP from there.
- Use `useGSAP` (from `@gsap/react`) for GSAP code — not raw `useEffect`.
- **Animate `transform` and `opacity` only** — never `width`/`height`/`top`/`left`
  (avoid layout jank).
- Design tokens via the Tailwind theme + CSS variables — **no hardcoded hex** in
  components.
- Real images go in `src/images/<section>/`, referenced via `<Img>`; missing
  files fall back to `<Placeholder>`. Never inline base64 images.
- **Do not:** use Create React App; add new animation libraries beyond
  Motion / GSAP / Lenis without asking; use generic fonts (Inter/Roboto/Arial);
  animate layout properties; remove `prefers-reduced-motion` handling; declare a
  section "done" before verifying it in Playwright.

---

## 15. Current state (as of this file)

**Done:** full scaffold; design tokens + fonts; shared shell (Header, Footer,
Cursor, SmoothScroll, WhatsAppButton); all 9 home sections; Shop page; Product
detail page with a 4-thumbnail gallery; the placeholder-asset system; header
cart & search **icons**; cart **drawer** (empty state) and search **overlay**
(live results) with scroll-lock.

**Not yet built / placeholder-only:**
- Real cart logic — `CART_COUNT` is hardcoded `0`, the cart drawer has no line
  items, "Add to Cart" / quantity do nothing.
- No checkout, no backend, no real form submission (newsletter just flips text).
- A dedicated search **results page** may later replace the inline overlay results.
- Real assets (logo, photos, 3D render) are still being dropped in — some product
  gallery images are mid-swap (see §11).

**History** — see `changes/changes.md` for the full commit-by-commit log. Latest
commits: `12061cb` "Add product-gallery image folder and clickable thumbnails";
earlier work covers the initial build, Vercel prep, header icons, and the
cart-drawer / search-overlay.

---

## 16. Quick "where do I find…" index

| I want to change…                | Look in…                                           |
|-----------------------------------|----------------------------------------------------|
| Colours / fonts / keyframes       | `tailwind.config.js`, `src/index.css`              |
| Routes                            | `src/App.tsx`                                      |
| Smooth scroll / anchor behaviour  | `src/components/SmoothScroll.tsx`                  |
| GSAP plugin setup                 | `src/lib/gsap.ts`                                  |
| Product data / prices             | `src/lib/products.ts`                              |
| How images resolve                | `src/lib/images.ts`, `src/components/Img.tsx`      |
| Header / nav / cart+search icons  | `src/components/Header.tsx`                        |
| A specific home section           | `src/sections/<Name>.tsx`                          |
| The product card look/animation   | `src/components/ProductCard.tsx`                   |
| Heading line-reveal animation     | `src/components/RevealText.tsx`                    |
| Generic scroll fade-in            | `src/components/Reveal.tsx`                        |
| Adding/swapping a photo           | drop a file in `src/images/<folder>/` (see its README) |
```
</invoke>
