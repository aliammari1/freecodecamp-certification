<!-- SPDX-License-Identifier: MIT -->

# Banner & Social Preview — Art Direction

**Status:** placeholder SVG committed in [`assets/`](assets/); final raster
hero + 1280×640 GitHub social preview to be generated with the `brandkit` /
`imagegen-frontend-web` skills (needs an image-gen run — see TODO in the README).

## Direction: "microservice mesh" (freeCodeCamp navy)

- **Palette:** freeCodeCamp navy `#0A0A23` background, off-white `#D0D0D5`
  text/lines, with five accent dots — one per service — in a restrained
  cool-to-warm sweep.
- **Concept:** five nodes (the services) connected by thin routing lines into a
  small "mesh", evoking a service map. Each node labelled with its glyph:
  exercise-tracker (running figure), file-metadata (file), header-parser (globe),
  timestamp (clock), url-shortener (link).
- **Type:** monospace wordmark `freecodecamp-portfolio`, lowercase, generous
  letter-spacing; subtitle "5 Express microservices · one Bun workspace".
- **Mood:** clean, technical, editorial — not gradient-heavy AI-slop.

## Deliverables

| Asset | Size | Use |
|---|---|---|
| `assets/banner.svg` | scalable | README hero (committed placeholder) |
| `assets/banner.png` | 1280×320 | README hero (TODO: raster export) |
| `assets/social-preview.png` | 1280×640 | GitHub Settings → Social preview (TODO) |

Commit all final assets locally (SVG/PNG) so they never rate-limit or 404.
