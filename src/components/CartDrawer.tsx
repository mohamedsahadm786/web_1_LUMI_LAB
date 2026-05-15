import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useLockScroll } from '../hooks/useLockScroll';

type Props = {
  open: boolean;
  onClose: () => void;
  count?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Right-side slide-in cart panel. Empty state for now — line items come later. */
export default function CartDrawer({ open, onClose, count = 0 }: Props) {
  useLockScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return createPortal(
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
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease }}
            className="fixed right-0 top-0 z-[310] flex h-full w-full max-w-[420px] flex-col border-l border-hairline bg-ink"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
              <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-white">
                Cart ({count} {count === 1 ? 'Item' : 'Items'})
              </h2>
              <button
                aria-label="Close cart"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition-transform duration-300 hover:rotate-90"
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

            {/* empty state */}
            <div className="flex flex-1 flex-col items-center px-6 pt-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease }}
                className="flex flex-col items-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-24 w-24 text-white/35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="17.5" cy="20" r="1.5" />
                  <path d="M2 3h3.2l2.5 12.2a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.5L23.2 7H6" />
                </svg>
                <p className="mt-6 text-sm lowercase tracking-wide text-body">
                  your cart is empty
                </p>
              </motion.div>

              <Link
                to="/shop"
                onClick={onClose}
                className="mt-9 w-full border border-hairline bg-ink py-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:bg-white hover:text-ink"
              >
                Browse Shop
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
