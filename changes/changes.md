# Changes log

A numbered history of the changes made to this project.

---

1. **Added a full project reference doc** — created `changes/information.md`, a
   self-contained summary of the whole repository (stack, structure, design
   system, every component / hook / section / page, content, and current
   state) so the codebase can be understood without reading every file.

2. **Fixed product-gallery image cropping** — on the product detail page the
   gallery box was `aspect-square` with `object-cover`, which cropped the
   product photos (all are 3:2 landscape) and cut off parts of the image.
   - Added an optional `fit` prop (`'cover' | 'contain'`) to the `Img`
     component (`src/components/Img.tsx`), defaulting to `'cover'` so nothing
     else on the site changed.
   - In `src/pages/Product.tsx`, changed the main image and the 4 thumbnails
     to `aspect-[3/2]` + `fit="contain"` (+ `bg-surface`), so the whole photo
     now fits with nothing cropped.

3. **Renamed the 'Glow 5mg' product to 'NAD+ 1,000mg'** — in
   `src/lib/products.ts`:
   - `slug`: `glow-5mg` → `nad-1000mg` (URL is now `/product/nad-1000mg`).
   - `name`: `Glow 5mg` → `NAD+ 1,000mg`.
   - `blurb`: → "NAD+ (Nicotinamide Adenine Dinucleotide) research formulation
     for laboratory analysis and in vitro studies only. Provided exclusively
     for controlled laboratory R&D applications."
   - Renamed the 5 matching image files (kept history with `git mv`):
     `products/glow-5mg.webp` → `nad-1000mg.webp`, and
     `product-gallery/glow-5mg_1..4.webp` → `nad-1000mg_1..4.webp`.

4. **Refactored the product description rendering** — `src/pages/Product.tsx`
   used to hardcode a generic sentence ("Sourced from verified suppliers and
   carefully packed...") after every product's description. The page now
   renders each product's `blurb` as-is, and that generic sentence was moved
   into the `blurb` data of the other 7 products in `src/lib/products.ts` —
   so the NAD+ page shows only its new text while the rest look unchanged.
   (The `tirzepatide-5mg` blurb, which had a duplicated phrase, was merged
   into one clean sentence.)

5. **Upgraded the product-page gallery to a 3D card** — added
   `src/components/ProductGallery.tsx` and wired it into `src/pages/Product.tsx`
   (the inline gallery, its `active` state, and the slug-reset effect were
   removed; the component is keyed by slug so it resets on navigation).
   The main image is now a high-level 3D card with:
   - cursor-tracking **3D tilt** (spring-eased `rotateX` / `rotateY`);
   - a pulsing **glow** halo + a static dark drop shadow for depth;
   - a cursor-following **glare** and a periodic diagonal **shine** sweep;
   - a shining inner **rim**.
   Clicking a thumbnail now **flips the main card** (a `rotateY` card-flip via
   `AnimatePresence`) to reveal the picked image, and the active thumbnail is
   highlighted while the others dim. All motion is disabled / simplified under
   `prefers-reduced-motion`.

6. **Fixed navigation-bar & back-button behaviour** — two bugs:
   - **Nav links did nothing when re-clicked.** They were `<Link to="/#section">`,
     and React Router treats clicking a link to the *current* URL as a no-op, so
     re-clicking the section you were already on (or its link after scrolling
     away) did nothing. Each click also pushed a `/#section` history entry.
   - **Back button skipped to home.** Those piled-up `/#section` entries meant
     pressing "back" from a product cycled through home-section entries instead
     of reaching the real previous page; `SmoothScroll` also force-scrolled to
     the top on *every* navigation, including back/forward.

   Changes:
   - Added `src/hooks/useSectionNav.ts` — on the home page it scrolls straight
     to the section every time (no history entry) and gives the section a short
     **shake** for feedback; on other routes it lets the `<Link>` navigate home.
   - Wired it into the header nav (desktop + mobile), the footer Quick Links,
     and the logo, so section clicks no longer pollute history.
   - Added a `section-shake` keyframe to `src/index.css` (+ `overflow-x: clip`
     on the body so the shake never spawns a horizontal scrollbar).
   - `SmoothScroll` now skips its force-scroll-to-top on back/forward (`POP`)
     navigation, and re-corrects a cross-page anchor jump after 360ms so the
     section lands precisely once images/fonts have settled.

7. **Unified the product-card hover button to "Enquire"** — the hover action
   button on `ProductCard` showed either "Add to Cart" or "Enquire" depending
   on whether the product had a price. It now always shows **"Enquire"** for
   every product (`src/components/ProductCard.tsx`).

8. **Added a cursor-flow "river of light" — Home page only** — new component
   `src/components/CursorFlow.tsx`, mounted in `src/pages/Home.tsx`. A
   full-viewport canvas draws braided white / silver ribbons that trail the
   cursor: they converge at the cursor (the source), spread and weave through
   the middle like moving water, then taper and fade behind it. Travelling
   sine waves keep it flowing; a soft radial glow marks the cursor source;
   `mix-blend-screen` makes it only ever lighten the page. It fades in/out as
   the cursor enters / leaves the window. Kept **monochrome** (white/silver,
   no colour) to respect the theme. Disabled on touch / coarse-pointer devices
   and for `prefers-reduced-motion`. Hand-written canvas — no new library.
