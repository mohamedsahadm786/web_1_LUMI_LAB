import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RevealText from '../components/RevealText';
import Reveal from '../components/Reveal';
import SectionLabel from '../components/SectionLabel';
import Img from '../components/Img';
import { useCountUp } from '../hooks/useCountUp';

const ease = [0.22, 1, 0.36, 1] as const;

/** The three media items that rotate through the three image tiles. */
const CYCLE = [
  'about/video',
  'about/home-about-stat-image',
  'about/home-about-small-image',
];

/**
 * Per-tile travel direction so the images flow clockwise:
 * slot 0 = big left, slot 1 = top-right, slot 2 = bottom-right.
 */
const FLOW = [
  { enter: { x: '74%', y: '58%' }, exit: { x: '74%', y: '-58%' } },
  { enter: { x: '-94%', y: '8%' }, exit: { x: '10%', y: '98%' } },
  { enter: { x: '-8%', y: '-98%' }, exit: { x: '-96%', y: '8%' } },
];

type Clutter = { x: number; y: number; rotate: number; scale: number };

/**
 * Two-phase entrance: the tile appears in a central cluttered pile,
 * holds there briefly, then spreads out and aligns into its real slot.
 */
function pile(c: Clutter) {
  return {
    initial: { opacity: 0, x: c.x, y: c.y, rotate: c.rotate, scale: c.scale },
    whileInView: {
      opacity: [0, 1, 1],
      x: [c.x, c.x, 0],
      y: [c.y, c.y, 0],
      rotate: [c.rotate, c.rotate, 0],
      scale: [c.scale, c.scale, 1],
    },
    viewport: { once: true, margin: '0px 0px -15% 0px' },
    transition: { duration: 1.9, times: [0, 0.36, 1], ease },
  };
}

/** A light "shine" that sweeps across a tile on a loop. */
function Shine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ x: '-260%' }}
      animate={{ x: '460%' }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
        repeatDelay: 4.5,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

/**
 * One image tile. Its picture slides out and the next one slides in
 * every time the cycle advances — so the three images keep travelling
 * clockwise through the three fixed tiles, non-stop.
 */
function CyclingImage({ slot, step }: { slot: number; step: number }) {
  const name = CYCLE[(((slot - step) % 3) + 3) % 3];
  const flow = FLOW[slot];
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={name}
        className="absolute inset-0"
        initial={{ ...flow.enter, opacity: 0, scale: 0.92 }}
        animate={{ x: '0%', y: '0%', opacity: 1, scale: 1 }}
        exit={{ ...flow.exit, opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.78, ease }}
      >
        <Img
          name={name}
          alt="Alluvi"
          label="Image"
          rounded="rounded-none"
          className="h-full w-full"
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function About() {
  const { ref, value } = useCountUp(25);
  const [step, setStep] = useState(0);

  // advance the clockwise image cycle, non-stop
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setStep((s) => s + 1), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionLabel>About Us</SectionLabel>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* image composition — tiles clutter into a pile, then spread + align;
              the three image tiles then cycle their pictures clockwise */}
          <div className="flex gap-4">
            {/* big image tile — slot 0 (far left) */}
            <motion.div
              {...pile({ x: 118, y: 8, rotate: -11, scale: 0.5 })}
              className="relative aspect-[3/4] w-[58%] shrink-0 overflow-hidden rounded-2xl border border-hairline animate-glow"
            >
              <CyclingImage slot={0} step={step} />
              <Shine delay={0.2} />
            </motion.div>

            {/* right column */}
            <div className="flex flex-1 flex-col gap-4">
              {/* the split row — counter + image */}
              <div className="flex flex-1 gap-4">
                {/* counter rectangle — fixed, no cycling */}
                <motion.div
                  {...pile({ x: -104, y: 118, rotate: 13, scale: 0.46 })}
                  className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl border border-hairline bg-surface px-4 py-5 animate-glow"
                >
                  <span
                    ref={ref}
                    className="relative z-10 font-display text-3xl font-semibold text-white md:text-4xl"
                  >
                    {value}+
                  </span>
                  <p className="relative z-10 mt-1 text-[11px] uppercase leading-tight tracking-wide text-body">
                    High-Purity Research Peptides
                  </p>
                  <Shine delay={0.9} />
                </motion.div>

                {/* image tile — slot 1 (top-right) */}
                <motion.div
                  {...pile({ x: -216, y: 112, rotate: -16, scale: 0.46 })}
                  className="relative flex-1 overflow-hidden rounded-2xl border border-hairline animate-glow"
                >
                  <CyclingImage slot={1} step={step} />
                  <Shine delay={1.5} />
                </motion.div>
              </div>

              {/* image tile — slot 2 (bottom-right) */}
              <motion.div
                {...pile({ x: -158, y: -96, rotate: 10, scale: 0.5 })}
                className="relative aspect-square overflow-hidden rounded-2xl border border-hairline animate-glow"
              >
                <CyclingImage slot={2} step={step} />
                <Shine delay={2.1} />
              </motion.div>
            </div>
          </div>

          {/* text */}
          <div>
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/45">
                <span className="h-px w-8 bg-white/40" />
                Who We Are
              </p>
            </Reveal>
            <RevealText
              as="h2"
              className="font-display text-3xl font-medium leading-[1.12] text-white md:text-[2.7rem]"
            >
              Advancing Modern Research with Smarter Formulations
            </RevealText>
            <Reveal delay={0.15}>
              <p className="mt-7 text-base leading-relaxed text-body">
                Alluvi is committed to advancing high-quality peptide and
                supplement research through clean, reliable, and precisely
                developed formulations. Our goal is simple — to provide
                controlled, consistent, and easy-to-use products designed for
                structured research applications.
              </p>
              <p className="mt-4 text-base leading-relaxed text-body">
                Every formulation is created with a strong focus on purity,
                consistency, and safe handling practices, giving you the
                confidence to work with products that meet strict quality
                standards.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
                {['Verified Suppliers', 'Sealed & Protected', 'Uniform Standards'].map(
                  (t) => (
                    <span
                      key={t}
                      className="flex items-center gap-2 text-sm text-white"
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] text-ink">
                        &#10003;
                      </span>
                      {t}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
