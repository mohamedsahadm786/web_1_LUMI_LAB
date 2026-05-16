import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import type { Product } from '../lib/products';
import Img from './Img';

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { stiffness: 150, damping: 15, mass: 0.5 };
const TILT = 9;

/**
 * Product detail gallery — a high-level 3D tilt card with a pulsing glow,
 * a cursor-tracking glare, a periodic shine sweep, and a card-flip
 * transition when a thumbnail is picked.
 */
export default function ProductGallery({ product }: { product: Product }) {
  // active thumbnail index; null = the default product image
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);

  // cursor offset inside the card, -0.5 .. 0.5
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [TILT, -TILT]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-TILT, TILT]), spring);

  // glare light spot tracks the cursor
  const gx = useTransform(mx, [-0.5, 0.5], ['14%', '86%']);
  const gy = useTransform(my, [-0.5, 0.5], ['14%', '86%']);
  const glare = useMotionTemplate`radial-gradient(260px circle at ${gx} ${gy}, rgba(255,255,255,0.55), transparent 62%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
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

  const mainName =
    active === null
      ? `products/${product.slug}`
      : `product-gallery/${product.slug}_${active + 1}`;

  return (
    <div className="[perspective:1600px]">
      {/* 3D tilt card */}
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
        whileHover={reduce ? undefined : { scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="group relative aspect-[3/2] w-full"
      >
        {/* pulsing glow halo behind the card */}
        <div
          aria-hidden
          className="absolute inset-2 rounded-3xl opacity-70 animate-glow transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* card surface — clipped, holds the flipping image */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl border border-hairline bg-surface shadow-[0_34px_80px_-34px_rgba(0,0,0,0.95)] [perspective:1400px]">
          {/* flipping image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mainName}
              initial={
                reduce
                  ? { opacity: 0 }
                  : { rotateY: 90, opacity: 0, scale: 0.94 }
              }
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={
                reduce ? { opacity: 0 } : { rotateY: -90, opacity: 0, scale: 0.94 }
              }
              transition={{ duration: 0.42, ease }}
              className="absolute inset-0"
            >
              <Img
                name={mainName}
                alt={product.name}
                label={product.name}
                tint={product.tint}
                fit="contain"
                rounded="rounded-none"
                className="h-full w-full"
              />
            </motion.div>
          </AnimatePresence>

          {/* cursor-tracking glare */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundImage: glare }}
          />

          {/* periodic shine sweep */}
          {!reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: '-220%' }}
              animate={{ x: '560%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 4.2,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* shining rim */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
            style={{
              boxShadow:
                'inset 0 0 0 1px rgba(255,255,255,0.16), inset 0 2px 34px rgba(255,255,255,0.10)',
            }}
          />
        </div>
      </motion.div>

      {/* thumbnails — click to flip the main card */}
      <div className="mt-5 grid grid-cols-4 gap-3 md:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-pressed={active === i}
            whileTap={reduce ? undefined : { scale: 0.94 }}
            className={`group relative overflow-hidden rounded-xl border bg-surface transition-all duration-300 ${
              active === i
                ? 'border-white/60 shadow-[0_0_24px_-6px_rgba(255,255,255,0.45)]'
                : 'border-hairline hover:border-white/30'
            }`}
          >
            <Img
              name={`product-gallery/${product.slug}_${i + 1}`}
              alt=""
              label=""
              tint={product.tint}
              fit="contain"
              rounded="rounded-none"
              className="aspect-[3/2] w-full transition-transform duration-500 ease-smooth group-hover:scale-[1.08]"
            />
            {/* dim the inactive thumbnails */}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                active === i
                  ? 'opacity-0'
                  : 'bg-ink/45 opacity-100 group-hover:opacity-0'
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
