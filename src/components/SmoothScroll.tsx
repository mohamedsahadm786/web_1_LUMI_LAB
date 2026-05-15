import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap';

let lenis: Lenis | null = null;

/** Provides Lenis smooth scroll and keeps GSAP ScrollTrigger in sync. */
export default function SmoothScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // anchor + route navigation
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
        else el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export const getLenis = () => lenis;
