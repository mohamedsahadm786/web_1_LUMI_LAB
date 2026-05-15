import { img } from '../lib/images';
import Placeholder from './Placeholder';

type Props = {
  /** "folder/name" without extension, e.g. "hero/render" */
  name: string;
  alt?: string;
  label?: string;
  tint?: [string, string];
  className?: string;
  rounded?: string;
  /** what to show when no image file exists yet */
  fallback?: 'placeholder' | 'none';
};

/**
 * Smart image. Renders the real photo if a matching file exists in
 * src/images/; otherwise falls back to a sized placeholder (or nothing).
 */
export default function Img({
  name,
  alt = '',
  label,
  tint,
  className = '',
  rounded = 'rounded-2xl',
  fallback = 'placeholder',
}: Props) {
  const url = img(name);

  if (!url) {
    if (fallback === 'none') return null;
    return (
      <Placeholder
        section={name.split('/')[0]}
        label={label}
        tint={tint}
        className={className}
        rounded={rounded}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      className={`${rounded} ${className} object-cover`}
    />
  );
}
