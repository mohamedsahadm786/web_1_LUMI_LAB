import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/** Custom cursor: a small dot + a lagging ring that grows over interactive elements. */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);
    document.body.classList.add('has-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setActive(!!t.closest('a, button, [data-cursor="hover"]'));
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      document.body.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-white/50"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: active ? 56 : 30,
          height: active ? 56 : 30,
          opacity: active ? 1 : 0.55,
          borderColor: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
    </>
  );
}
