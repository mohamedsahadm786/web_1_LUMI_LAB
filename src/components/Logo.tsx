import { Link } from 'react-router-dom';
import { img } from '../lib/images';

type Props = {
  size?: 'sm' | 'lg';
  onClick?: () => void;
};

/**
 * Brand logo. Shows the image from src/images/logo/ if present,
 * otherwise the "LUMA" wordmark.
 */
export default function Logo({ size = 'sm', onClick }: Props) {
  const logo = img('logo/logo');
  const wordSize = size === 'lg' ? 'text-4xl' : 'text-2xl';
  const imgHeight = size === 'lg' ? 'h-11' : 'h-8';

  return (
    <Link
      to="/#home"
      onClick={onClick}
      className="group inline-flex items-center gap-1"
      aria-label="Luma — home"
    >
      {logo ? (
        <img src={logo} alt="Luma" className={`${imgHeight} w-auto`} />
      ) : (
        <span className="inline-flex items-baseline gap-1">
          <span
            className={`font-display ${wordSize} font-semibold tracking-tight text-white`}
          >
            LUMA
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-150" />
        </span>
      )}
    </Link>
  );
}
