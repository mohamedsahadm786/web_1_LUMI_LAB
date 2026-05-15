import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { getProduct, products } from '../lib/products';
import Img from '../components/Img';
import ProductCard from '../components/ProductCard';

const ease = [0.22, 1, 0.36, 1] as const;

const DETAILS = [
  ['Form', 'Lyophilised powder'],
  ['Purity', 'Verified — third-party tested'],
  ['Storage', 'Cool, dry, away from light'],
  ['Handling', 'Sealed & protected packaging'],
];

export default function Product() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<number | null>(0);
  // active gallery thumbnail (null = the main product image)
  const [active, setActive] = useState<number | null>(null);

  // reset the gallery when switching products
  useEffect(() => setActive(null), [slug]);

  if (!product) {
    return (
      <div className="grid min-h-screen place-items-center pt-[84px]">
        <div className="text-center">
          <h1 className="font-display text-4xl text-white">Product not found</h1>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm text-ink"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="pt-[84px]">
      <section className="py-12 md:py-20">
        <div className="shell">
          <nav className="mb-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-white">
              Shop
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* gallery */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <Img
                name={
                  active === null
                    ? `products/${product.slug}`
                    : `product-gallery/${product.slug}_${active + 1}`
                }
                alt={product.name}
                label={product.name}
                tint={product.tint}
                className="aspect-square w-full"
                rounded="rounded-3xl"
              />
              <div className="mt-4 grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                      active === i
                        ? 'border-white/55'
                        : 'border-hairline hover:border-white/25'
                    }`}
                  >
                    <Img
                      name={`product-gallery/${product.slug}_${i + 1}`}
                      alt=""
                      label=""
                      tint={product.tint}
                      rounded="rounded-none"
                      className="aspect-square w-full"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 text-xs uppercase tracking-[0.2em] text-body">
                Research Formulation
              </p>
              <h1
                className="font-display font-semibold text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05 }}
              >
                {product.name}
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <span className="font-display text-3xl text-white">
                  {product.price ?? 'Price on enquiry'}
                </span>
                <span className="flex gap-0.5 text-sm text-white">
                  {'★★★★★'}
                </span>
              </div>
              <p className="mt-6 text-base leading-relaxed text-body">
                {product.blurb} Sourced from verified suppliers and carefully
                packed to ensure consistency, purity, and reliability.
              </p>

              {/* qty + cta */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-5 rounded-full border border-hairline px-5 py-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="text-lg text-white"
                    aria-label="Decrease"
                  >
                    &minus;
                  </button>
                  <span className="w-5 text-center text-white">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="text-lg text-white"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]">
                  {product.price ? 'Add to Cart' : 'Enquire on WhatsApp'}
                </button>
              </div>

              {/* accordion */}
              <div className="mt-10 space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
                {DETAILS.map(([k, v], i) => (
                  <div key={k} className="bg-ink">
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="flex w-full items-center justify-between px-6 py-4 text-left"
                    >
                      <span className="text-sm text-white">{k}</span>
                      <span className="text-white/50">
                        {open === i ? '−' : '+'}
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: open === i ? 'auto' : 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-sm text-body">{v}</p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* related */}
          <div className="mt-28">
            <h2 className="mb-10 font-display text-2xl text-white md:text-3xl">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
