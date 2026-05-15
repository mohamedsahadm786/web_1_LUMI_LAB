import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { motion } from 'motion/react';
import { gsap, SplitText } from '../lib/gsap';

const STATS = [
  { k: '100%', v: 'Sealed & Protected' },
  { k: '24/7', v: 'WhatsApp Support' },
  { k: '8+', v: 'Research Formulations' },
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />

      <div className="shell">
        <p className="mb-9 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-white/45">
          <span className="h-px w-8 bg-white/40" /> Why Choose Luma
          <span className="h-px w-8 bg-white/40" />
        </p>

        <h2
          className="why-heading mx-auto max-w-5xl text-center font-display font-medium text-white"
          style={{ fontSize: 'clamp(1.9rem, 4.6vw, 4rem)', lineHeight: 1.18 }}
        >
          We deliver dependable, quality formulations with careful handling and
          supportive customer service.
        </h2>

        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-ink px-6 py-9 text-center"
            >
              <div className="font-display text-4xl font-semibold text-white">
                {s.k}
              </div>
              <p className="mt-2 text-xs uppercase tracking-wide text-body">
                {s.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
