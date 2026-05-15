/**
 * Image registry — resolves files dropped into  src/images/<folder>/ .
 *
 * Every image OR video under src/images/ is detected automatically
 * (png, jpg, jpeg, webp, avif, svg, mp4, webm, mov). Look one up by
 * "<folder>/<name>" WITHOUT the extension — e.g. img('hero/render').
 *
 * No matching file yet  ->  returns null  ->  a placeholder is shown.
 * Drop the file in, save, and it appears. No code changes needed.
 *
 * See src/images/README.md for the full file list.
 */
const modules = import.meta.glob(
  '../images/**/*.{png,jpg,jpeg,webp,avif,svg,mp4,webm,mov,PNG,JPG,JPEG,WEBP,AVIF,SVG,MP4,WEBM,MOV}',
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
