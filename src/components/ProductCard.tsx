import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import type { Product } from '../lib/products';
import Img from './Img';

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { stiffness: 150, damping: 16, mass: 0.4 };
const TILT = 12;

/**
 * 3D tilt product card — leans toward the cursor with a springy motion,
 * a glare that follows the pointer, and a shining rim on the edges.
 */
export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  // cursor offset inside the card, -0.5 .. 0.5
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [TILT, -TILT]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-TILT, TILT]), spring);

  // glare light spot tracks the cursor
  const gx = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const gy = useTransform(my, [-0.5, 0.5], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(190px circle at ${gx} ${gy}, rgba(255,255,255,0.42), transparent 62%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 54 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease }}
      style={{ transformPerspective: 900, rotateX, rotateY }}
      className="group relative flex flex-col [transform-style:preserve-3d]"
    >
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden rounded-2xl border border-hairline bg-surface transition-[border-color,box-shadow] duration-300 group-hover:border-white/25 group-hover:shadow-[0_30px_55px_-28px_rgba(0,0,0,0.9)]"
      >
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease }}
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

        {/* glare — bright light spot that follows the cursor */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundImage: glare }}
        />

        {/* shining rim — the edges light up on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 2px 24px rgba(255,255,255,0.18)',
          }}
        />

        {/* hover action rail */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex translate-y-[130%] gap-2 transition-transform duration-500 ease-smooth group-hover:translate-y-0">
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
