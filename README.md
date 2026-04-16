# Savelon Website

Source code for the public Savelon website at [savelon.com](https://savelon.com).

This repository contains the marketing site and legal pages for the Savelon app.
The app itself is the main product; this repo is the website layer around it.

## Stack

- Vite + React + TypeScript
- Static deploy target in `docs/`
- GitHub Pages hosting with custom domain (`savelon.com`)

## Project Structure

- `site/` - website source code, build config, scripts
- `site/src/` - React landing page UI
- `site/scripts/generate-legal-pages.mjs` - post-build generation of static legal pages
- `site/public/` - static files copied to deploy output (`CNAME`, `robots.txt`, `sitemap.xml`, `404.html`)
- `docs/` - generated deploy artifact committed to git for GitHub Pages

## Local Development

Install dependencies:

```bash
npm --prefix site install
```

Run local dev server:

```bash
npm run dev
```

Build production output:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Build and Deployment Notes

- Production output is generated into `docs/`.
- Do not edit `docs/` manually; change source files in `site/` and regenerate.
- Legal pages are generated as static pages:
  - `/privacy` -> `docs/privacy/index.html`
  - `/terms` -> `docs/terms/index.html`
- Compatibility redirects are also generated:
  - `docs/privacy.html` -> `/privacy`
  - `docs/terms.html` -> `/terms`
- `docs/CNAME` is produced from `site/public/CNAME` to keep custom domain stable.
- `robots.txt` and `sitemap.xml` are shipped from `site/public/`.

## SEO / AI Crawlability Checklist

When changing layout or legal content, verify:

- Canonical URLs are correct (`/`, `/privacy`, `/terms`)
- `meta description`, Open Graph, and Twitter metadata remain present
- JSON-LD remains valid
- `robots.txt` references `https://savelon.com/sitemap.xml`
- `sitemap.xml` includes all public canonical pages

## Typical Release Flow

1. Update source in `site/`
2. Run `npm run lint`
3. Run `npm run build`
4. Review changes in `docs/`
5. Commit source + generated `docs/` together
6. Push to GitHub (GitHub Pages serves updated site)

## CI Quality Gate

- GitHub Actions runs lint + build on push/PR.
- CI also verifies generated `docs/` is up to date with source.
- Local equivalent: `npm run ci`
