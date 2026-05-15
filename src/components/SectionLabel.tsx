import { motion } from 'motion/react';

/** Oversized Six Caps eyebrow label, e.g. "ABOUT US", "OUR PRODUCTS". */
export default function SectionLabel({
  children,
  align = 'center',
}: {
  children: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 0.14, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`select-none font-caps uppercase leading-[0.8] text-white ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
      style={{ fontSize: 'clamp(5rem, 16vw, 14rem)', letterSpacing: '0.02em' }}
    >
      {children}
    </motion.div>
  );
}
