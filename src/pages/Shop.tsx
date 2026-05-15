import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/products';

export default function Shop() {
  return (
    <div className="pt-[84px]">
      {/* page title */}
      <section className="relative overflow-hidden border-b border-hairline py-20 md:py-28">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="shell">
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40"
          >
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Shop</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold text-white"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', lineHeight: 1 }}
          >
            All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-md text-base text-body"
          >
            {products.length} research formulations — sourced from verified
            suppliers and packed with precision.
          </motion.p>
        </div>
      </section>

      {/* grid */}
      <section className="py-16 md:py-24">
        <div className="shell">
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
