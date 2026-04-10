# forum2026.diglib.org

Static site for the DLF Forum 2026, built with Eleventy 3, Tailwind CSS 4, and PostCSS.

## Requirements

- Node.js 22 or newer
- `pnpm` 10.32.1 or compatible

The repository pins the package manager in `package.json`. With Corepack:

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
```

## Quick Start

Install dependencies:

```bash
pnpm install
```

Start Eleventy and the PostCSS watcher:

```bash
pnpm dev
```

The development server writes to `_site/` and usually serves the site at `http://localhost:8080`.

## Commands

```bash
pnpm dev
```

Run Eleventy in serve mode and watch CSS.

```bash
pnpm build
```

Clean `_site/`, build Eleventy with production transforms, then compile CSS.

```bash
pnpm test
```

Run a fresh production build, then execute the Node test suite in `tests/`.

```bash
pnpm lint
pnpm lint:html
```

Run JavaScript/CSS linting, and HTML/template validation.

```bash
pnpm format:check
pnpm format
```

Check or apply Prettier formatting.

## Project Structure

- `src/`: Eleventy source files
- `src/_data/`: global data, including `metadata.json`
- `src/_includes/`: shared partials such as navigation, footer, Open Graph, and CTAs
- `src/_layouts/`: base page layouts
- `src/resources/`: resource landing page and resource entries
- `src/static/`: passthrough assets copied to `_site/static/`
- `src/styles/site.css`: Tailwind import, theme tokens, and shared component CSS
- `tests/`: post-build checks against generated HTML
- `_site/`: generated output, not source
- `.eleventy.js`: Eleventy configuration, plugins, filters, collections, and passthrough rules

## Content Conventions

Most pages are Nunjucks templates with YAML front matter. Use `layout: base.njk` for standard pages and `layout: page.njk` for pages that need the large image-backed hero.

Navigation is driven by `eleventyNavigation` front matter and rendered from `collections.all | eleventyNavigation` in the navigation and footer includes:

```yaml
eleventyNavigation:
  key: Resources
  order: 3
```

Resource cards on `/resources/` are driven by the `resources` collection. Add a resource page under `src/resources/` with resource tags:

```yaml
tags: [resources]
eleventyNavigation:
  key: For Presenters
  parent: Resources
  order: 1
```

Utility output files and private reference pages should be omitted from collections:

```yaml
eleventyExcludeFromCollections: true
```

The styleguide is available at `/styleguide/` as a direct reference page, but is intentionally excluded from 11ty collections so it does not appear in navigation, footer links, sitemap collection loops, or resource listings.

## Styling

Shared design tokens live in `src/styles/site.css` inside the Tailwind `@theme` block. Prefer the existing color, font, radius, and shadow tokens before adding new values.

Common reusable classes include:

- `editorial-grid`
- `eyebrow`
- `section-title`
- `surface-card`
- `showcase-grid`
- `button-primary`
- `button-secondary`
- `button-ghost`
- `text-link`
- `form-field`
- `form-label`
- `callout`

The current visual direction is editorial and practical: warm surface colors, strong Manrope headings, Public Sans body text, rounded content blocks, concise CTAs, and clear section bands.

## Data And URLs

Global site metadata is in `src/_data/metadata.json`. This includes the production URL, site title, description, Google Analytics ID, and proposal URL used by the navigation and CTA buttons.

The Eleventy config sets a `pathPrefix` of `/forum2026/` when building from the `dev` branch. Other branches build with no prefix.

## Assets And Images

Files in `src/static/` are copied through to `_site/static/`. The Eleventy image transform plugin is enabled for generated image formats, but explicit static assets are still managed in `src/static/`.

Image credits:

- [Compare Fibre](https://unsplash.com/@comparefibre?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/macbook-air-displaying-woman-in-white-shirt-fRGoTJFQAHM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- [Jason Dent](https://unsplash.com/@jdent?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/green-and-white-abstract-painting-UNDqO_CL30s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- [Samantha Borges](https://unsplash.com/@samich_18?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/macbook-pro-on-brown-wooden-table-ax3lbQfdXP0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## Testing

The test suite reads generated files from `_site/`, so run `pnpm build` before `node --test tests/site.test.mjs` if running the test command manually. `pnpm test` already performs the build first.

Current tests check accessibility and navigation basics, including:

- skip link and focusable main landmark
- `aria-current` on active navigation entries
- proposal CTAs rendering as links or clear placeholder text
- decorative Material Symbols hidden from assistive technology

## Deployment

GitHub Actions builds and deploys the site to GitHub Pages from pushes to `main` and `dev`. The deploy workflow installs dependencies with `pnpm install --frozen-lockfile`, runs `pnpm build`, uploads `_site/`, and deploys through Pages.

CI also runs on pushes and pull requests targeting `main` and `dev`.
