import { useRef } from 'react';
import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { useTypewriter } from '../hooks/useTypewriter';
import Placeholder from '../components/Placeholder';

const PHRASES = [
  'Your Weight-Loss Journey Reinvented by Science',
  'Lab-Engineered Formulations for Your Biology',
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const typed = useTypewriter(PHRASES);
  const root = useRef<HTMLElement>(null);

  // background parallax on scroll
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.to('.hero-bg', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden pt-[84px]"
    >
      {/* parallax background */}
      <div className="hero-bg absolute inset-0 -z-10 scale-110">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_30%,#161616_0%,#030303_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#030303_100%)]" />
      </div>
      {/* drifting glow */}
      <div className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[36rem] w-[36rem] rounded-full bg-white/[0.04] blur-3xl" />

      <div className="shell grid items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-hairline px-4 py-2 text-xs uppercase tracking-[0.25em] text-body"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            High-Purity Research Peptides
          </motion.p>

          <h1
            className="font-display font-semibold text-white"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5.2rem)', lineHeight: 1.04 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="block"
            >
              {typed}
              <span className="ml-0.5 inline-block w-[0.06em] animate-blink bg-white align-baseline">
                &nbsp;
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="mt-7 max-w-md text-base leading-relaxed text-body"
          >
            Our products are sourced from verified suppliers and carefully
            packed to ensure consistency, purity, and reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="/shop"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.04]"
            >
              Shop Products
            </a>
            <a
              href="#about"
              className="rounded-full border border-hairline px-8 py-3.5 text-sm text-white transition-colors hover:bg-white/5"
            >
              Discover Luma
            </a>
          </motion.div>
        </div>

        {/* floating product render */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="animate-bob">
            <Placeholder
              section="hero"
              label="3D Product Render"
              tint={['#141414', '#323232']}
              className="aspect-[3/4] w-full"
              rounded="rounded-[2rem]"
            />
          </div>
          <div className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex"
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
