<!-- SPDX-License-Identifier: MIT -->

# Banner & Social Preview

**Status:** placeholder SVG committed at [`assets/banner.svg`](assets/banner.svg)
(referenced by the README). Generate the final raster hero + 1280×640 GitHub
social preview from the single prompt below, then commit them locally as
`assets/banner.png` (hero) and `assets/social-preview.png` so they never
rate-limit or 404.

## The prompt (use verbatim with `brandkit` / `imagegen-frontend-web`)

> A clean, technical, editorial GitHub banner on a solid freeCodeCamp-navy
> background `#0A0A23` (no gradients, no AI-slop glow). Center concept: a small
> **microservice mesh** — five circular API nodes connected by thin off-white
> `#D0D0D5` routing lines into a tidy service map. The two left nodes converge on
> a labelled **"Bun + Express" core** badge in the middle; from the
> **exercise-tracker** node a single line branches to a small **MongoDB** leaf
> icon (it is the only stateful service). Each node carries a minimal monoline
> glyph and tiny lowercase label: a running figure ("exercise-tracker"), a file
> ("file-metadata"), a globe ("header-parser"), a clock ("timestamp"), a link
> ("url-shortener"). Five accent dots, one per node, in a restrained cool→warm
> sweep. Lowercase monospace wordmark **`freecodecamp-portfolio`** with generous
> letter-spacing, and the subtitle **"5 Express microservices · one Bun
> workspace"**. Flat, crisp, lots of negative space, dark-tech developer-tool
> aesthetic. Render two crops: a wide README hero (1280×320) and a centered
> 1280×640 GitHub social-preview card.

## Deliverables

| Asset | Size | Use |
|---|---|---|
| `assets/banner.svg` | scalable | README hero (committed placeholder, in use) |
| `assets/banner.png` | 1280×320 | README hero raster export |
| `assets/social-preview.png` | 1280×640 | GitHub → Settings → Social preview |
