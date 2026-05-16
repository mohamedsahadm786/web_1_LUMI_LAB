import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { gsap, SplitText } from '../lib/gsap';

const ease = [0.22, 1, 0.36, 1] as const;

/** Front title + back description for each flip circle. */
const FLIP = [
  {
    title: 'Consistent Results',
    desc: 'Designed to keep your routine structured and support goal-focused progress.',
  },
  {
    title: 'Verified Purity',
    desc: 'Sourced from manufacturers that follow strict testing, handling, and documentation standards.',
  },
  {
    title: 'Reliable Service',
    desc: 'Every step is designed to provide a smooth, dependable customer experience.',
  },
  {
    title: 'Quick Support',
    desc: 'Fast WhatsApp assistance for queries, updates, and product guidance.',
  },
];

export default function WhyUs() {
  const root = useRef<HTMLElement>(null);

  // word-by-word reveal driven by scroll progress (fadeInUpBig feel)
  useGSAP(
    () => {
      const el = root.current?.querySelector('.why-heading');
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const split = new SplitText(el, { type: 'words' });
      gsap.set(split.words, { opacity: 0.12 });
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          end: 'bottom 55%',
          scrub: true,
        },
      });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="why-us"
      ref={root}
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

      <div className="shell relative z-10">
        <p className="mb-9 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-white/45">
          <span className="h-px w-8 bg-white/40" /> Why Choose Alluvi
          <span className="h-px w-8 bg-white/40" />
        </p>

        <h2
          className="why-heading mx-auto max-w-5xl text-center font-display font-medium text-white"
          style={{ fontSize: 'clamp(1.9rem, 4.6vw, 4rem)', lineHeight: 1.18 }}
        >
          We deliver dependable, quality formulations with careful handling and
          supportive customer service.
        </h2>

        {/* flip circles — hover to reveal the description on white */}
        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
          {FLIP.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              className="group [perspective:1400px]"
            >
              <div className="relative aspect-square w-full transition-transform duration-700 ease-smooth [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* front — outlined circle with the title */}
                <div className="absolute inset-0 grid place-items-center rounded-full border border-hairline px-7 text-center transition-colors duration-300 [backface-visibility:hidden] group-hover:border-white/25">
                  <span className="font-display text-base font-semibold uppercase tracking-wide text-white md:text-xl">
                    {f.title}
                  </span>
                </div>

                {/* back — white circle with the description */}
                <div className="absolute inset-0 grid place-items-center rounded-full bg-white px-10 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="text-[13px] leading-relaxed text-ink/70 md:text-sm">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
