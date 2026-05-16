import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Logo from './Logo';
import { useSectionNav } from '../hooks/useSectionNav';

const QUICK = [
  { label: 'Home', to: '/#home' },
  { label: 'About Us', to: '/#about' },
  { label: 'Products', to: '/#products' },
  { label: 'Why Us', to: '/#why-us' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Contact', to: '/#contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const goToSection = useSectionNav();

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-ink pt-20">
      <div className="shell">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr]">
          {/* brand / contact */}
          <Reveal>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
              Here to Help You Anytime
            </p>
            <Logo size="lg" />
            <ul className="mt-7 space-y-2 text-sm uppercase tracking-wide text-body">
              <li>Level 5, Dubai, UAE</li>
              <li>
                <a href="tel:+971543800625" className="hover:text-white">
                  +971 54 380 0625
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@lumauae.com"
                  className="hover:text-white"
                >
                  sales@lumauae.com
                </a>
              </li>
            </ul>
            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3 text-sm text-white transition-colors hover:bg-white hover:text-ink"
            >
              Start Your Order
              <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>

          {/* quick links */}
          <Reveal delay={0.1}>
            <h4 className="mb-6 font-display text-lg text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-body">
              {QUICK.map((q) => (
                <li key={q.label}>
                  <Link
                    to={q.to}
                    onClick={(e) => goToSection(q.to.split('#')[1], e)}
                    className="inline-block transition-transform duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* newsletter */}
          <Reveal delay={0.2}>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/40">
              Get Latest Offers
            </p>
            <h4 className="mb-3 font-display text-2xl text-white">
              Don&rsquo;t miss the latest offers
            </h4>
            <p className="mb-6 text-sm text-body">
              Be the first to know about new products, promotions, and store
              updates from Luma.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="flex items-center gap-2 rounded-full border border-hairline p-1.5"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={sent ? 'Subscribed — thank you' : 'Enter your email'}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105"
              >
                &rarr;
              </button>
            </form>
            <div className="mt-7 flex gap-6 text-xs uppercase tracking-[0.2em] text-body">
              <a href="#" className="hover:text-white">
                Facebook
              </a>
              <a href="#" className="hover:text-white">
                Instagram
              </a>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-hairline py-7 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Luma. All Rights Reserved.</p>
          <p>Recreation build — placeholder assets.</p>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.18em] text-center font-caps uppercase leading-[0.8] text-white/[0.04]"
           style={{ fontSize: 'clamp(6rem, 26vw, 24rem)' }}>
          Luma
        </p>
      </div>
    </footer>
  );
}
