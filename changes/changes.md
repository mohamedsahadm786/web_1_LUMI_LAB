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
