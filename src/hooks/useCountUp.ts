import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/** Counts 0 → target once the element scrolls into view. */
export function useCountUp(target: number, duration = 1.6) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: target,
      duration,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => setValue(Math.round(counter.n)),
    });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => tween.play(),
    });
    return () => {
      tween.kill();
      st.kill();
    };
  }, [target, duration]);

  return { ref, value };
}
