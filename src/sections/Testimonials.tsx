import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import RevealText from '../components/RevealText';
import SectionLabel from '../components/SectionLabel';
import Placeholder from '../components/Placeholder';

type Review = { quote: string; name: string; role: string };

const REVIEWS: Review[] = [
  {
    quote:
      'Consistent products, clear guidance, and quick replies made the whole process simple and genuinely reassuring from start to finish.',
    name: 'Michael Reed',
    role: 'Research Assistant',
  },
  {
    quote:
      'Fast support and reliable formulations every time — ordering with Luma has been smooth, dependable, and refreshingly straightforward.',
    name: 'Emily Carter',
    role: 'Wellness Consultant',
  },
  {
    quote:
      'Everything arrived securely sealed, communication was excellent, and the overall service felt exactly like a premium brand should.',
    name: 'Sofia Bennett',
    role: 'Fitness Coordinator',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index || (index === REVIEWS.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, 5200);
    return () => clearInterval(t);
  }, [index]);

  const r = REVIEWS[index];

  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionLabel>Testimonials</SectionLabel>

        <div className="mt-[-2vw] grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/45">
              <span className="h-px w-8 bg-white/40" /> Trusted by Thousands
            </p>
            <RevealText
              as="h2"
              className="font-display text-3xl font-medium leading-[1.12] text-white md:text-[2.7rem]"
            >
              What Our Customers Say
            </RevealText>
            <p className="mt-6 max-w-sm text-base text-body">
              Trusted feedback from people who choose Luma for purity and
              precision every time.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <button
                aria-label="Previous"
                onClick={() => go(index - 1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline text-white transition-colors hover:bg-white hover:text-ink"
              >
                &larr;
              </button>
              <button
                aria-label="Next"
                onClick={() => go(index + 1)}
                className="grid h-12 w-12 place-items-center rounded-full border border-hairline text-white transition-colors hover:bg-white hover:text-ink"
              >
                &rarr;
              </button>
              <span className="ml-3 font-display text-sm text-body">
                0{index + 1} <span className="text-white/30">/ 0{REVIEWS.length}</span>
              </span>
            </div>
          </div>

          {/* card */}
          <div className="relative min-h-[20rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -70 }}
                transition={{ duration: 0.6, ease }}
                className="rounded-3xl border border-hairline bg-surface p-9 md:p-12"
              >
                <span className="font-display text-7xl leading-none text-white/15">
                  &ldquo;
                </span>
                <p className="mt-[-1rem] font-display text-xl leading-relaxed text-white md:text-2xl">
                  {r.quote}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <Placeholder
                    section="testimonials"
                    label=""
                    tint={['#222', '#3a3a3a']}
                    rounded="rounded-full"
                    className="h-14 w-14 shrink-0"
                  />
                  <div>
                    <h3 className="font-display text-lg text-white">{r.name}</h3>
                    <p className="text-sm text-body">{r.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-white">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>&#9733;</span>
                    ))}
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
