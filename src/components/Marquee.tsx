const PHRASES = [
  'Premium Research Formulations',
  'Fast WhatsApp Support',
  'Trusted by Thousands',
  'Customer-Focused Service',
  'Easy WhatsApp Ordering',
  'Precision in Every Product',
];

/** Infinite horizontal marquee strip — pure CSS loop, pauses on hover. */
export default function Marquee() {
  const row = [...PHRASES, ...PHRASES];
  return (
    <section
      aria-hidden
      className="group border-y border-hairline bg-ink py-6 overflow-hidden"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0">
            {row.map((p, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center whitespace-nowrap font-display text-2xl font-medium text-white/85 md:text-3xl"
              >
                {p}
                <span className="mx-7 text-white/25 md:mx-10">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
