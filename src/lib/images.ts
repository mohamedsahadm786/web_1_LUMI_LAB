/**
 * Image registry — resolves files dropped into  src/images/<folder>/ .
 *
 * Every image under src/images/ is detected automatically
 * (png, jpg, jpeg, webp, avif, svg). Look one up by "<folder>/<name>"
 * WITHOUT the extension — e.g. img('hero/render'), img('products/glow-5mg').
 *
 * No matching file yet  ->  returns null  ->  a placeholder is shown.
 * Drop the file in, save, and it appears. No code changes needed.
 *
 * See src/images/README.md for the full file list.
 */
const modules = import.meta.glob(
  '../images/**/*.{png,jpg,jpeg,webp,avif,svg,PNG,JPG,JPEG,WEBP,AVIF,SVG}',
  { eager: true, import: 'default' },
) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const m = path.match(/\.\.\/images\/(.+)\.[^./]+$/);
  if (m) byName[m[1].toLowerCase()] = url;
}

/** Resolve an image by "folder/name" (no extension). Returns null if absent. */
export function img(name: string): string | null {
  return byName[name.toLowerCase()] ?? null;
}
