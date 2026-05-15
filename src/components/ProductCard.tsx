import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Product } from '../lib/products';
import Img from './Img';

/** Product card — image zoom + action rail slide-up on hover. */
export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 54 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col"
    >
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-hairline bg-surface"
      >
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Img
            name={`products/${product.slug}`}
            alt={product.name}
            label={product.name}
            tint={product.tint}
            rounded="rounded-none"
            className="h-full w-full"
          />
        </motion.div>

        {/* hover action rail */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-[130%] gap-2 transition-transform duration-500 ease-smooth group-hover:translate-y-0">
          <span className="flex-1 rounded-full bg-white py-2.5 text-center text-xs font-medium text-ink">
            {product.price ? 'Add to Cart' : 'Enquire'}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-ink/70 text-white backdrop-blur">
            &hearts;
          </span>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-3 pt-4">
        <h4 className="font-display text-lg text-white">
          <Link to={`/product/${product.slug}`} className="hover:opacity-70">
            {product.name}
          </Link>
        </h4>
        <span className="shrink-0 pt-0.5 text-sm text-body">
          {product.price ?? 'Enquire'}
        </span>
      </div>
    </motion.article>
  );
}
