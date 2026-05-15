import { motion } from 'motion/react';
import Img from '../components/Img';

type Feature = {
  title: string;
  text: string;
  icon: JSX.Element;
};

const FEATURES: Feature[] = [
  {
    title: 'Purity First',
    text: 'Each product is checked thoroughly to maintain clean, high-quality formulations you can rely on.',
    icon: (
      <path d="M12 3l7 4v5c0 4.4-3 8.3-7 9-4-0.7-7-4.6-7-9V7l7-4zm-1 12l5-5-1.4-1.4L11 12.2 9.4 10.6 8 12l3 3z" />
    ),
  },
  {
    title: 'Reliable Consistency',
    text: 'Our controlled processes ensure every unit is produced with uniform standards for a dependable experience.',
    icon: (
      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 4a6 6 0 11-6 6 6 6 0 016-6zm0 3a3 3 0 103 3 3 3 0 00-3-3z" />
    ),
  },
  {
    title: 'Secure Packaging',
    text: 'Every product is sealed and protected to preserve freshness, stability, and overall product integrity.',
    icon: (
      <path d="M12 2l8 4v6c0 .9-.2 1.8-.5 2.6L12 22l-7.5-7.4A8 8 0 014 12V6l8-4zm0 4.2L7 8.4v3.6a4 4 0 001.2 2.9L12 18l3.8-3.1A4 4 0 0017 12V8.4L12 6.2z" />
    ),
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Features() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
              className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface p-8 transition-colors duration-500 hover:bg-surface2 md:p-10"
            >
              {/* rotating ring */}
              <div className="absolute -right-10 -top-10 h-40 w-40 animate-spinslow rounded-full border border-dashed border-white/10 transition-opacity duration-500 group-hover:opacity-100 opacity-40" />

              <div className="relative mb-8 grid h-14 w-14 place-items-center rounded-2xl border border-hairline bg-ink">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 fill-white transition-transform duration-500 group-hover:scale-110"
                >
                  {f.icon}
                </svg>
              </div>

              <h3 className="relative mb-3 font-display text-2xl font-medium text-white">
                {f.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-body">
                {f.text}
              </p>

              <span className="relative mt-7 inline-block text-xs uppercase tracking-[0.25em] text-white/30">
                0{i + 1} / 03
              </span>
            </motion.article>
          ))}

          {/* image tile — rightmost cell, same size as the feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.8, delay: FEATURES.length * 0.12, ease }}
            className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface"
          >
            <Img
              name="extra/E_1"
              alt="Luma"
              label="Feature image"
              rounded="rounded-none"
              className="h-full w-full transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
