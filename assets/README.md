# Asset slots

The rebuild ships with **generated placeholders** (the `<Placeholder>` component) so
every layout slot is final-sized. Drop your real images into the matching folder
here, then point the component at them.

## Folders (one per section)

| Folder           | Used by                          | Slot size (aspect) |
|------------------|----------------------------------|--------------------|
| `hero/`          | Hero 3D product render           | 3 : 4              |
| `about/`         | About — lab / formulation images | 4 : 5 and 1 : 1    |
| `products/`      | Product cards + product gallery  | 4 : 5 / 1 : 1      |
| `testimonials/`  | Reviewer avatars                 | 1 : 1 (circle)     |

## How to swap a placeholder for a real photo

1. Put the file in the right folder, e.g. `assets/hero/render.png`.
2. Move/import it under `src/` (Vite serves imported assets), or reference from
   `public/`.
3. Replace the `<Placeholder section="..." />` element in the relevant
   component with `<img src={...} className="<same classes>" />`.

Every `<Placeholder>` carries a `data-asset-slot` attribute and a `section`
prop naming the folder it maps to — search the codebase for `Placeholder` to
find all slots.
