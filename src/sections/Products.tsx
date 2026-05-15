import { Link } from 'react-router-dom';
import RevealText from '../components/RevealText';
import Reveal from '../components/Reveal';
import SectionLabel from '../components/SectionLabel';
import ProductCard from '../components/ProductCard';
import { products } from '../lib/products';

export default function Products() {
  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="shell">
        <SectionLabel>Our Products</SectionLabel>

        <div className="mt-10 flex flex-col items-end justify-between gap-6 md:flex-row">
          <RevealText
            as="h2"
            className="max-w-xl font-display text-3xl font-medium leading-[1.12] text-white md:text-[2.6rem]"
          >
            Research formulations packed with precision and care
          </RevealText>
          <Reveal delay={0.1}>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-hairline px-6 py-3 text-sm text-white transition-colors hover:bg-white hover:text-ink"
            >
              View All Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
