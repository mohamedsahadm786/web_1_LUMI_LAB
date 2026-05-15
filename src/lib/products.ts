export type Product = {
  slug: string;
  name: string;
  price: string | null;
  /** placeholder tint pair — swap the image in assets/products/ later */
  tint: [string, string];
  blurb: string;
};

/** Catalogue mirrors the original 8-item shop. Prices in AED (د.إ). */
export const products: Product[] = [
  {
    slug: 'bpc-157-tb-500-40mg',
    name: 'BPC-157 & TB-500 40mg',
    price: 'د.إ 999.00',
    tint: ['#1c1c1c', '#2e2e2e'],
    blurb:
      'A dual research blend prepared under controlled conditions for consistent, reliable handling.',
  },
  {
    slug: 'glow-5mg',
    name: 'Glow 5mg',
    price: null,
    tint: ['#202020', '#343434'],
    blurb:
      'A precise low-dose formulation developed for structured research applications.',
  },
  {
    slug: 'glow-70mg',
    name: 'Glow 70mg',
    price: 'د.إ 1,199.00',
    tint: ['#1a1a1a', '#2a2a2a'],
    blurb:
      'A higher-capacity formulation packed securely to preserve freshness and stability.',
  },
  {
    slug: 'retatrutide-20mg',
    name: 'Retatrutide 20mg',
    price: null,
    tint: ['#222222', '#383838'],
    blurb:
      'Developed with a strong focus on purity, consistency, and safe handling practices.',
  },
  {
    slug: 'retatrutide-40mg',
    name: 'Retatrutide 40mg',
    price: 'د.إ 1,990.00',
    tint: ['#1d1d1d', '#303030'],
    blurb:
      'A research formulation produced with uniform standards for a dependable experience.',
  },
  {
    slug: 'tirzepatide-20mg',
    name: 'Tirzepatide 20mg',
    price: null,
    tint: ['#1e1e1e', '#2c2c2c'],
    blurb:
      'Checked thoroughly to maintain clean, high-quality formulations you can rely on.',
  },
  {
    slug: 'tirzepatide-40mg',
    name: 'Tirzepatide 40mg',
    price: null,
    tint: ['#232323', '#3a3a3a'],
    blurb:
      'Sealed and protected to preserve overall product integrity through delivery.',
  },
  {
    slug: 'tirzepatide-5mg',
    name: 'Tirzepatide 5mg',
    price: null,
    tint: ['#1b1b1b', '#292929'],
    blurb:
      'A starter-scale formulation sourced from verified suppliers and carefully packed.',
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
