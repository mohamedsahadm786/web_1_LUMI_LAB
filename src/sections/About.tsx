import RevealText from '../components/RevealText';
import Reveal from '../components/Reveal';
import SectionLabel from '../components/SectionLabel';
import Img from '../components/Img';
import { useCountUp } from '../hooks/useCountUp';

export default function About() {
  const { ref, value } = useCountUp(1);

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionLabel>About Us</SectionLabel>

        <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* image composition — big image left, two rectangles right */}
          <Reveal from="left">
            <div className="flex gap-4">
              {/* big image — far left */}
              <Img
                name="about/home-about-large-image"
                alt="Luma research"
                label="Lab / Research"
                tint={['#161616', '#2c2c2c']}
                className="aspect-[3/4] w-[58%] shrink-0"
              />

              {/* the two rectangles, stacked to the right of the big image */}
              <div className="flex flex-1 flex-col gap-4">
                {/* stat counter chip */}
                <div className="flex flex-1 flex-col justify-center rounded-2xl border border-hairline bg-surface px-5 py-6">
                  <span
                    ref={ref}
                    className="font-display text-4xl font-semibold text-white md:text-5xl"
                  >
                    {value}+
                  </span>
                  <p className="mt-1 text-xs uppercase tracking-wide text-body">
                    High-Purity Research Peptides
                  </p>
                </div>

                {/* small image */}
                <Img
                  name="about/home-about-small-image"
                  alt="Luma formulation"
                  label="Formulation"
                  tint={['#1c1c1c', '#383838']}
                  className="aspect-square w-full"
                />
              </div>
            </div>
          </Reveal>

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
