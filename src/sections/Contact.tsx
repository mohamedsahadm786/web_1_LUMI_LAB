import Reveal from '../components/Reveal';
import Img from '../components/Img';

/**
 * "Get in Touch" — a full-bleed block: a white panel above a banner image.
 */
export default function Contact() {
  return (
    <section id="contact" className="relative pt-20 md:pt-28">
      <Reveal>
        {/* white panel — full screen width */}
        <div className="bg-white py-10 text-ink md:py-14">
          <div className="shell">
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

            {/* heading — same font treatment as other section headings */}
            <h2 className="mt-2 font-display text-3xl font-medium leading-[1.12] text-ink md:text-[2.7rem]">
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
        </div>

        {/* full-width banner image */}
        <Img
          name="extra/E_3"
          alt="Get in touch with Luma"
          label="Contact"
          rounded="rounded-none"
          className="aspect-[3/2] w-full sm:aspect-[2/1] md:aspect-[5/2]"
        />
      </Reveal>
    </section>
  );
}
