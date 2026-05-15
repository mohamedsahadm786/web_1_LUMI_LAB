import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { products } from '../lib/products';
import { useLockScroll } from '../hooks/useLockScroll';
import Img from './Img';
import Logo from './Logo';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Slide-down search panel. Results link through to product pages. */
export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useLockScroll(open);

  // focus the field once the panel has slid in
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 420);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-[2px]"
          />

          {/* panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease }}
            className="fixed inset-x-0 top-0 z-[310] border-b border-hairline bg-ink"
            role="dialog"
            aria-label="Search"
          >
            <div className="shell py-7 md:py-9">
              {/* top row: logo · input · close */}
              <div className="flex items-center gap-5 md:gap-10">
                <div className="hidden shrink-0 sm:block">
                  <Logo size="sm" onClick={onClose} />
                </div>

                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your search words..."
                    className="w-full border-b border-hairline bg-transparent py-3 pr-10 font-display text-lg text-white outline-none transition-colors placeholder:text-white/30 focus:border-white md:text-2xl"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                </div>

                <button
                  aria-label="Close search"
                  onClick={onClose}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline text-white transition-colors duration-300 hover:bg-white hover:text-ink"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* results */}
              <div className="mt-7">
                <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-white/35">
                  {query.trim()
                    ? `${results.length} result${results.length === 1 ? '' : 's'}`
                    : 'Popular products'}
                </p>

                {results.length === 0 ? (
                  <p className="py-8 text-center text-sm text-body">
                    No products match &ldquo;{query}&rdquo;.
                  </p>
                ) : (
                  <div className="grid max-h-[52vh] grid-cols-2 gap-3 overflow-y-auto pr-1 md:grid-cols-3 lg:grid-cols-4">
                    {results.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/product/${p.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-3 rounded-xl border border-hairline bg-surface p-3 transition-colors duration-300 hover:border-white/30 hover:bg-surface2"
                      >
                        <Img
                          name={`products/${p.slug}`}
                          alt={p.name}
                          label=""
                          tint={p.tint}
                          rounded="rounded-lg"
                          className="h-14 w-14 shrink-0"
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-display text-sm text-white">
                            {p.name}
                          </span>
                          <span className="text-xs text-body">
                            {p.price ?? 'Enquire'}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
