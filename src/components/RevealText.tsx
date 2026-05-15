import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap';

type Props = {
  children: string;
  /** element tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
};

/**
 * Masked line-by-line heading reveal — GSAP SplitText + ScrollTrigger.
 * Mirrors the original's word/line reveal on section headings.
 */
export default function RevealText({ children, as = 'h2', className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const split = new SplitText(el, {
        type: 'lines',
        linesClass: 'split-line',
      });
      const inner = new SplitText(el, { type: 'lines' });

      gsap.set(inner.lines, { yPercent: 115 });
      gsap.to(inner.lines, {
        yPercent: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      });

      return () => {
        split.revert();
        inner.revert();
      };
    },
    { scope: ref },
  );

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export { ScrollTrigger };
