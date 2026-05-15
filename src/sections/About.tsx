import { motion } from 'motion/react';
import RevealText from '../components/RevealText';
import Reveal from '../components/Reveal';
import SectionLabel from '../components/SectionLabel';
import Img from '../components/Img';
import { useCountUp } from '../hooks/useCountUp';

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

// clutter -> spread: a springy settle into place
const spring = { type: 'spring' as const, stiffness: 68, damping: 13 };
const inView = { once: true, margin: '0px 0px -12% 0px' };

export default function About() {
  const { ref, value } = useCountUp(25);

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionLabel>About Us</SectionLabel>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* image composition — pieces start cluttered, then spread + align */}
          <div className="flex gap-4">
            {/* big image — far left */}
            <motion.div
              initial={{ opacity: 0, x: 86, y: 38, rotate: -9, scale: 0.66 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              viewport={inView}
              transition={{ ...spring, delay: 0 }}
              className="relative w-[58%] shrink-0 overflow-hidden rounded-2xl border border-hairline animate-glow"
            >
              <Img
                name="about/home-about-large-image"
                alt="Luma research"
                label="Lab / Research"
                tint={['#161616', '#2c2c2c']}
                className="aspect-[3/4] w-full"
                rounded="rounded-none"
              />
              <Shine delay={0.2} />
            </motion.div>

            {/* right column */}
            <div className="flex flex-1 flex-col gap-4">
              {/* the split row — counter + image, in the old chip's space */}
              <div className="flex flex-1 gap-4">
                {/* counter rectangle */}
                <motion.div
                  initial={{ opacity: 0, x: -62, y: 54, rotate: 11, scale: 0.66 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  viewport={inView}
                  transition={{ ...spring, delay: 0.12 }}
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

                {/* image rectangle — placeholder, swap later */}
                <motion.div
                  initial={{ opacity: 0, x: -116, y: 32, rotate: -13, scale: 0.66 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                  viewport={inView}
                  transition={{ ...spring, delay: 0.22 }}
                  className="relative flex-1 overflow-hidden rounded-2xl border border-hairline animate-glow"
                >
                  <Img
                    name="about/home-about-stat-image"
                    alt="Luma"
                    label="Image"
                    tint={['#1c1c1c', '#383838']}
                    className="h-full w-full"
                    rounded="rounded-none"
                  />
                  <Shine delay={1.5} />
                </motion.div>
              </div>

              {/* small image */}
              <motion.div
                initial={{ opacity: 0, x: -80, y: -60, rotate: 9, scale: 0.66 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                viewport={inView}
                transition={{ ...spring, delay: 0.32 }}
                className="relative overflow-hidden rounded-2xl border border-hairline animate-glow"
              >
                <Img
                  name="about/home-about-small-image"
                  alt="Luma formulation"
                  label="Formulation"
                  tint={['#1c1c1c', '#383838']}
                  className="aspect-square w-full"
                  rounded="rounded-none"
                />
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
                Luma is committed to advancing high-quality peptide and
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
