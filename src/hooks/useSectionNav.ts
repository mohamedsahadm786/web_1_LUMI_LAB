import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../components/SmoothScroll';

/** Briefly shakes an element — feedback for a same-page nav click. */
function shake(el: HTMLElement) {
  el.classList.remove('section-shake');
  void el.offsetWidth; // reflow so the animation can restart
  el.classList.add('section-shake');
  el.addEventListener(
    'animationend',
    () => el.classList.remove('section-shake'),
    { once: true },
  );
}

/**
 * Section navigation for the home-page anchor links.
 *
 * On the home page it scrolls straight to the section every time it is
 * called — even when that section is already in view — gives a shake for
 * feedback, and adds NO history entry. On any other route it does nothing,
 * letting the surrounding <Link> navigate home as usual.
 *
 * This keeps the browser history clean (so "back" reaches the real previous
 * page) and makes a nav click work regardless of the current location.
 */
export function useSectionNav() {
  const { pathname } = useLocation();

  return useCallback(
    (id: string, e?: MouseEvent) => {
      if (pathname !== '/') return; // let the <Link> handle cross-page nav
      e?.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -90 });
      else el.scrollIntoView({ behavior: 'smooth' });
      shake(el);
    },
    [pathname],
  );
}
