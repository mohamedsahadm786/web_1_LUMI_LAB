type Props = {
  /** section folder this asset belongs to — see /assets/<section>/ */
  section: string;
  label?: string;
  tint?: [string, string];
  className?: string;
  rounded?: string;
};

/**
 * Visual stand-in for a real photo. Sized to the real slot so layout is final.
 * Swap with a real image from assets/<section>/ later — see assets/README.md.
 */
export default function Placeholder({
  section,
  label,
  tint = ['#181818', '#2a2a2a'],
  className = '',
  rounded = 'rounded-2xl',
}: Props) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${rounded} border border-hairline ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 25% 20%, ${tint[1]} 0%, ${tint[0]} 70%)`,
      }}
      data-asset-slot={section}
    >
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 stroke-white/30"
          fill="none"
          strokeWidth="1.2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <circle cx="8.5" cy="8.5" r="1.8" />
          <path d="M21 16l-5-5L5 21" />
        </svg>
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
          {label ?? section}
        </span>
      </div>
    </div>
  );
}
