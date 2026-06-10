# Tag Landing Page (tag-social.com)

The live site is **static HTML** — not React. Production is served directly from these files at the repo root:

| File | URL |
|------|-----|
| **`index.html`** | https://tag-social.com/ |
| `privacy.html` | https://tag-social.com/privacy |
| `terms.html` | https://tag-social.com/terms |
| `your-data.html` | https://tag-social.com/your-data |

All CSS is inlined in each HTML file. Screenshots live in `assets/screenshots/`. No build step is required for deployment.

## Preview locally

```bash
npm run dev
```

Opens http://localhost:5173/ — the same static `index.html` that production serves.

Or without Node:

```bash
python3 -m http.server 8765
# → http://localhost:8765/
```

## Regenerate static pages

If you edit the React source or CSS in `src/` and want to refresh the static HTML:

```bash
npm run generate:static
```

This runs `scripts/build-static-html.mjs` and rewrites `index.html`, `privacy.html`, `terms.html`, and `your-data.html`.

## Legacy React app (optional)

The old client-rendered React app is still in `src/` for reference. To run it locally only:

```bash
npm run dev:react
```

This opens `dev.html` — **not** what tag-social.com serves.

## Deploy

Push to the connected Git branch. Vercel serves the repo root as static files (`vercel.json` disables the Vite build). After deploy, verify:

```bash
curl -s https://tag-social.com/ | grep "Global Video Debate"
```

You should see the hero text in the raw HTML (no `<div id="root">`).
