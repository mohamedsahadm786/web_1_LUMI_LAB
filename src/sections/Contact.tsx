import Reveal from '../components/Reveal';
import Img from '../components/Img';

/**
 * "Get in Touch" — recreated from the reference site, rendered in a
 * black & white palette (a white panel above a grayscale image).
 */
export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <div className="overflow-hidden rounded-[2.2rem]">
            {/* white panel */}
            <div className="bg-white px-6 py-9 text-ink sm:px-10 md:px-14 md:py-12">
              {/* contact details — top right */}
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-ink/55">Level 5, Dubai, UAE</p>
                  <a
                    href="mailto:sales@lumauae.com"
                    className="text-sm text-ink/55 transition-colors hover:text-ink"
                  >
                    sales@lumauae.com
                  </a>
                  <p className="mt-1.5 font-display text-xl font-semibold text-ink md:text-2xl">
                    +971 54 380 0625
                  </p>
                </div>
              </div>

              {/* heading */}
              <h2
                className="-mt-1 font-display font-semibold uppercase leading-[0.95] text-ink"
                style={{ fontSize: 'clamp(2.8rem, 9vw, 6.5rem)' }}
              >
                Get in Touch
              </h2>

              {/* paragraph + chat button */}
              <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <p className="max-w-md text-sm leading-relaxed text-ink/55">
                  Reach out anytime for product details, order help, or
                  personalised assistance — we&rsquo;re here to support you
                  smoothly.
                </p>
                <a
                  href="https://wa.me/971543800625"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-ink py-2.5 pl-6 pr-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.04] md:self-auto"
                >
                  Chat With Us
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>

            {/* full-width image — black & white */}
            <Img
              name="extra/E_3"
              alt="Get in touch with Luma"
              label="Contact"
              rounded="rounded-none"
              className="aspect-[3/2] w-full grayscale sm:aspect-[2/1] md:aspect-[5/2]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
