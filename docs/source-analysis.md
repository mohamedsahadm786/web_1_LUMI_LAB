# Source Analysis — lumauae.com

Textual specification of the original site, captured via Playwright inspection.
This is the source of truth for the rebuild. It is a *behavioral* spec, not a tracing.

## Tech detected (original)

The original is **WordPress + Elementor** with the "dreamslab" (bravisthemes) theme.
Motion stack detected in the DOM/network:

- **GSAP 3.12.5** + **ScrollTrigger** + **SplitText** + **Observer** + **MotionPathPlugin**
- **Lenis** (bundled) — smooth scroll
- **Swiper 8** — carousels (testimonials, marquee)
- **jarallax** — parallax background images
- **WOW.js** — scroll-reveal (`fadeInUp`, `fadeInLeft`, `fadeInRight`, `fadeInUpBig`)
- **tilt.js** — hover tilt on cards
- **three.js** + custom `distortion.js` — WebGL image hover/scroll distortion
- Custom `cursor.js` — custom cursor follower
- `pxl-typewrite.js` — typewriter rotating headline
- `jquery-numerator` / counter — animated number counters

Our rebuild reproduces the *feel* of these with a lean stack (see build-plan.md).

## Global design tokens

| Token            | Value                          | Notes                                |
|------------------|--------------------------------|--------------------------------------|
| Background       | `#030303`                      | near-black                           |
| Surface / card   | `#0c0c0c`, `#111`              | slightly raised panels               |
| Body text        | `#c2c2c2`                      | light grey                           |
| Heading text     | `#ffffff`                      | white                                |
| Hairline border  | `rgba(255,255,255,0.06–0.15)`  | thin dividers / card borders         |
| WhatsApp green   | `#25d366`                      | floating chat button only            |
| Theme            | Monochrome dark (white-on-black). No colored accent — luxury/minimal. |

## Typography

| Font            | Use                                              | Source            |
|-----------------|--------------------------------------------------|-------------------|
| **Clash Display** | Display headings (section titles, big statements) | Fontshare (free)  |
| **Six Caps**      | Oversized condensed eyebrow labels ("ABOUT US", "OUR PRODUCTS", "TESTIMONIALS") | Google Fonts (free) |
| **DM Sans**       | Body copy, nav, small UI, marquee text           | Google Fonts (free) |

All three are free/open — the rebuild uses the **exact same fonts**.

## Page inventory

The site is one long single-scroll **Home** page (anchored nav) plus separate pages:

1. **Home** (`/`) — single scroll, ~8460px tall, sections below.
2. **Shop** (`/shop`) — WooCommerce product grid, 8 products.
3. **Product detail** (`/product/:slug`) — one per product (8 products).

Nav links: Home, About Us, Products, Why Us, Testimonials, Contact (anchors) + **Buy Now** → `/shop`.

## Home page — section-by-section spec

Order top → bottom. Each entry: layout + animation trigger + feel.

### 0. Header (sticky, ~84px)
- Transparent over hero, gains solid dark background on scroll.
- Left: wordmark logo. Center/right: nav menu. Right: "Buy Now" pill button.
- Mobile: hamburger → slide-in panel.

### 1. Hero `#home` (~805px, full-viewport)
- Parallax background image (dark abstract texture) — moves slower than scroll (jarallax).
- Eyebrow + an **H3 typewriter headline** that rotates between two strings every 3.5s:
  `"Your Weight-Loss Journey Reinvented by Science"` ↔ `"Lab-Engineered Skincare for Your Biology"`, with a blinking caret.
- A floating 3D product render (PNG) on one side.
- Sub-paragraph: "Our products are sourced from verified suppliers and carefully packed to ensure consistency, purity, and reliability."
- Floating WhatsApp button bottom-left.
- **Animation:** staggered load-in — eyebrow, headline, paragraph rise+fade sequentially; product image floats (slow infinite y-bob).

### 2. Feature trio (~955px)
- Three feature cards: **Purity First**, **Reliable Consistency**, **Secure Packaging**.
- Each: line icon, H3 title, short paragraph. Decorative rotating ring graphic (`pxl-animation-round`).
- **Animation:** cards reveal on scroll with stagger (fade + rise); icons / ring slowly rotate.

### 3. About `#about` (~1805px)
- Big **Six Caps** eyebrow "ABOUT US".
- Stat counter block: number counts up to **`1+`** with label "High-Purity Research Peptides".
- H3 statement "Advancing Modern Research with Smarter Formulations".
- Body paragraph about Luma UAE's research mission.
- 3 supporting images (composed/overlapping).
- **Animation:** counter number runs on scroll-in; heading does a SplitText word/line reveal; images parallax slightly + hover distortion.

### 4. Marquee strip (~80px)
- Infinite horizontal scrolling text, slash-separated phrases:
  "Premium Research Formulations / Fast WhatsApp Support / Trusted by Thousands / Customer-Focused Service / Easy WhatsApp Ordering / Precision in Every Product /"
- **Animation:** continuous loop translateX; reverses or pauses subtly on hover.

### 5. Products header `#products`
- Six Caps eyebrow "OUR PRODUCTS" + small intro.

### 6. Products grid (~440px row)
- 8 WooCommerce product cards (see product list below).
- Card: product image, H4 title, price (AED د.إ), hover actions (Add to cart, wishlist, compare).
- **Animation:** staggered reveal on scroll; image zoom + action buttons slide-up on hover.

### 7. Why Us `#why-us` (~832px)
- One oversized statement heading:
  "We deliver dependable, quality formulations with careful handling and supportive customer service."
- **Animation:** WOW `fadeInUpBig` — heading lines reveal word-by-word on scroll (SplitText style).

### 8. Help / CTA (~680px)
- Eyebrow "Here to Guide You", H3 "Let's Talk To" + animated/typed "Get Instant Help".
- Paragraph "Transparent communication, every step of the way."
- A panel/card element that lifts on scroll.
- **Animation:** `wow` fade reveal.

### 9. Testimonials `#testimonials` (~649px)
- Six Caps eyebrow "TESTIMONIALS", "Trusted by Thousands", H3 "What Our Customers Say".
- 3 testimonial cards in a carousel (Swiper): Michael Reed (Research Assistant), Emily Carter (Wellness Consultant), Sofia Bennett (Fitness Coordinator). Each: quote, avatar, name, role.
- **Animation:** cards enter `fadeInRight` / `fadeInLeft`; carousel auto-advances; drag to scrub.

### 10. Contact `#contact` (~704px)
- H1 "Get in Touch", paragraph, contact details (Level 5, Dubai, UAE / sales@lumauae.com / +971543800625), "Chat With Us" button.
- **Animation:** two columns enter `fadeInLeft` / `fadeInRight`.

### 11. Footer
- "Here to Help You Anytime", address/phone/email, "Start Your Order" button.
- Quick Links column (Home, About Us, Products, Why Us, Testimonials, Contact).
- "Get Latest Offers" newsletter input + Facebook / Instagram links.
- Copyright "© 2025 Luma UAE. All Rights Reserved."

## Product catalogue (8 items)

| Slug                       | Name                    | Price (AED)   |
|----------------------------|-------------------------|---------------|
| bpc-157-tb-500-40mg        | BPC-157 & TB-500 40mg   | د.إ 999.00    |
| glow-5mg                   | Glow 5mg                | — (enquire)   |
| glow-70mg                  | Glow 70mg               | د.إ 1,199.00  |
| retatrutide-20mg           | Retatrutide 20mg        | — (enquire)   |
| retatrutide-40mg           | Retatrutide 40mg        | د.إ 1,990.00  |
| tirzepatide-20mg           | Tirzepatide 20mg        | — (enquire)   |
| tirzepatide-40mg           | Tirzepatide 40mg        | — (enquire)   |
| tirzepatide-5mg            | Tirzepatide 5mg         | — (enquire)   |

## Notes

- All photographs, the 3D product render, and the logo are **placeholders** in the rebuild
  (solid panels / generated SVG) for the user to swap with real assets later.
- Copy is carried over as placeholder text; the user owns final wording.
