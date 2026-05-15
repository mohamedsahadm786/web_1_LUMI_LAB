import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

const NAV = [
  { label: 'Home', to: '/#home' },
  { label: 'About Us', to: '/#about' },
  { label: 'Products', to: '/#products' },
  { label: 'Why Us', to: '/#why-us' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Contact', to: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[200] transition-colors duration-500 ${
        scrolled || open
          ? 'border-b border-hairline bg-ink/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-[84px] items-center justify-between">
        <Link to="/#home" className="group flex items-baseline gap-[3px]">
          <span className="font-display text-2xl font-semibold tracking-tight text-white">
            LUMA
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-150" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="group relative text-sm text-body transition-colors hover:text-white"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.04] sm:block"
          >
            Buy Now
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                open ? 'translate-y-[3.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                open ? '-translate-y-[3.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <div className="shell flex flex-col gap-1 pb-6 pt-2">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  className="border-b border-hairline py-3 text-lg text-body"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/shop"
                className="mt-4 rounded-full bg-white py-3 text-center text-sm font-medium text-ink"
              >
                Buy Now
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
