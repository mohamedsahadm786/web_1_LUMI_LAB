import { motion } from 'motion/react';
import Reveal from '../components/Reveal';
import Img from '../components/Img';

export default function HelpCta() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* full-bleed background image */}
      <Img
        name="extra/E_2"
        fallback="none"
        rounded="rounded-none"
        alt=""
        className="absolute inset-0 h-full w-full"
      />
      {/* darkening + edge fades so the heading reads and the section
          blends into the black sections above and below */}
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#030303_0%,rgba(3,3,3,0)_22%,rgba(3,3,3,0)_72%,#030303_100%)]" />

      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink/65 px-7 py-14 backdrop-blur-md md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-spinslow rounded-full border border-dashed border-white/10" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <p className="mb-4 inline-flex items-center gap-3 rounded-full border border-hairline px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-body">
                Here to Guide You
              </p>
              <h2
                className="font-display font-medium text-white"
                style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.6rem)', lineHeight: 1.08 }}
              >
                Let&rsquo;s Talk To
                <br />
                <span className="text-white/55">Get Instant Help</span>
              </h2>
              <p className="mt-5 max-w-sm text-base text-body">
                Transparent communication, every step of the way.
              </p>
            </div>

            <Reveal from="right" delay={0.15}>
              <a
                href="https://wa.me/971543800625"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-full bg-white py-3 pl-7 pr-3 text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="text-sm font-medium">Chat on WhatsApp</span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
                  &rarr;
                </span>
              </a>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
