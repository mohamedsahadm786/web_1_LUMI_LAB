import { useEffect, useState } from 'react';

/**
 * Rotating typewriter headline — types a phrase, holds, deletes, advances.
 * Mirrors the original hero's two-phrase rotation.
 */
export function useTypewriter(
  phrases: string[],
  { typeSpeed = 55, deleteSpeed = 28, hold = 1800 } = {},
) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(phrases[0]);
      return;
    }
    const current = phrases[index % phrases.length];
    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && text === current) {
      delay = hold;
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
      delay = 320;
    }

    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, hold]);

  return text;
}
