# Thashy Gift Hub

The storefront is built with React and vinext and deployed as a static site on
GitHub Pages.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static site is written to `dist/client`.

## Deployment

Every push to `main` runs the GitHub Pages workflow in
`.github/workflows/deploy-pages.yml`. In the repository settings, set **Pages →
Build and deployment → Source** to **GitHub Actions**.
