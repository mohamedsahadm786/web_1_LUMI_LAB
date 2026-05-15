import { useEffect } from 'react';
import { getLenis } from '../components/SmoothScroll';

/** Freezes page scroll (Lenis + native) while an overlay is open. */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
