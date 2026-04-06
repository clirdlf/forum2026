# forum2026.diglib.org

Static site for the DLF Forum 2026, built with Eleventy, PostCSS, and Tailwind CSS.

## Requirements

- Node.js 22 or newer
- `pnpm` 10.32.1 or compatible

If you use Corepack, you can enable the pinned package manager version with:

```bash
corepack enable
corepack prepare pnpm@10.32.1 --activate
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the local development server and CSS watcher:

```bash
pnpm dev
```

This runs Eleventy in serve mode and writes the generated site to `_site/`. By default, Eleventy serves the site locally at `http://localhost:8080`.

## Common Commands

Build a production-ready site:

```bash
pnpm build
```

Run the test suite:

```bash
pnpm test
```

Run linters:

```bash
pnpm lint
pnpm lint:html
```

Check formatting:

```bash
pnpm format:check
```

Apply formatting:

```bash
pnpm format
```

## Project Structure

- `src/`: templates, data files, styles, includes, layouts, and static assets
- `_site/`: generated output from local builds and development runs
- `tests/`: post-build site tests
- `.eleventy.js`: Eleventy configuration

## Notes

- Static assets in `src/static/` are copied through to the built site.
- CSS is compiled from `src/styles/` into `_site/` during development and production builds.
- `pnpm test` runs a fresh build before executing the Node-based site tests.

## Images

- [Compare Fibre](https://unsplash.com/@comparefibre?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/macbook-air-displaying-woman-in-white-shirt-fRGoTJFQAHM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- [Jason Dent](https://unsplash.com/@jdent?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/green-and-white-abstract-painting-UNDqO_CL30s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Photo by [Samantha Borges](https://unsplash.com/@samich_18?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/macbook-pro-on-brown-wooden-table-ax3lbQfdXP0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
