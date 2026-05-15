import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** entry direction */
  from?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  /** distance travelled, px */
  distance?: number;
};

const offset = (from: Props['from'], d: number) => {
  switch (from) {
    case 'down':
      return { y: -d };
    case 'left':
      return { x: -d };
    case 'right':
      return { x: d };
    default:
      return { y: d };
  }
};

/** Scroll-reveal wrapper — fade + slide, plays once when in view. */
export default function Reveal({
  children,
  from = 'up',
  delay = 0,
  distance = 48,
  className,
}: Props) {
  const move = offset(from, distance);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...move }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
