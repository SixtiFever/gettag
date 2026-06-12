# Tag Landing Page — Technical Reference

Static marketing site for [tag-social.com](https://www.tag-social.com). Four HTML pages, Tailwind CSS, and two small vanilla JS modules. No framework, no prerender, no server-side rendering.

**Support email:** hello@tag-social.com

## Site map

| URL | File | Purpose |
|-----|------|---------|
| `/` | `index.html` | Landing page with early-access signup and product demo |
| `/privacy` | `privacy/index.html` | Privacy Policy |
| `/terms` | `terms/index.html` | Terms of Service |
| `/your-data` | `your-data/index.html` | Data handling and account deletion |

Use `www.tag-social.com` consistently — the apex domain redirects to www.

All page content is visible in **View Source**. Meta tags (`<title>`, `<meta name="description">`) are in each HTML file's `<head>`.

## Architecture

```
Source files (repo root)
        │
        ▼
  scripts/build.mjs  ──►  dist/  (HTML, JS, assets, public extras)
        │
        ▼
  Tailwind CLI  ──►  dist/css/styles.css
        │
        ▼
  Vercel serves dist/
```

- **HTML** — hand-written markup with Tailwind utility classes
- **CSS** — Tailwind v4 compiled from `css/input.css`; legal pages also load `css/legal.css`
- **JS** — only where interactivity is needed (email form, video mockup)
- **Build** — copy static files, then compile CSS (~1 second total)

## Repository layout

| Path | Role |
|------|------|
| `index.html` | Landing page |
| `privacy/`, `terms/`, `your-data/` | Legal pages (`index.html` in each) |
| `css/input.css` | Tailwind source + base body styles |
| `css/legal.css` | BEM styles for legal page typography and links |
| `js/email-form.js` | Early-access email signup |
| `js/debate-mockup.js` | Phone mockup video cycling |
| `assets/icons/` | Favicon (`speech.png`) |
| `assets/screenshots/` | Hero phone screenshots |
| `assets/debate-demo/` | Demo videos and avatars for mockup |
| `public/` | Deploy extras copied to `dist/` root (robots, TikTok verify, app-config) |
| `scripts/build.mjs` | Copies source files into `dist/` |
| `dist/` | Build output (gitignored, served by Vercel) |

## CSS

**Tailwind (`css/input.css`)**

```css
@import "tailwindcss";
@source "../*.html";
@source "../**/*.html";
```

The `@source` directives tell Tailwind v4 to scan all HTML files for utility classes. The compiled output is written to `dist/css/styles.css` during build, or `css/styles.css` during dev watch.

**Legal pages (`css/legal.css`)**

Separate BEM stylesheet for legal content: `.legal-page__title`, `.legal-page__section`, `.legal-page__link`, etc. Loaded alongside Tailwind on legal pages only.

## JavaScript

### `js/email-form.js`

Handles the landing page early-access flow:

1. User clicks "Get Early Access" → reveals email input form
2. Validates email format client-side
3. POSTs `{ email }` to the Cloud Function:
   `https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail`
4. Shows success message or inline error

DOM IDs: `early-access-cta`, `early-access-form`, `early-access-success`, `email-input`, `email-submit`, `email-error`.

### `js/debate-mockup.js`

Drives the phone mockup in "The Debate Chain" section:

- Cycles through 3 demo takes (video + avatar + username)
- Advances on `video.ended`
- Updates avatar highlight chain in the debate UI

Root element: `#debate-mockup`. Assets in `assets/debate-demo/`.

## Build pipeline

```bash
npm run build
```

Runs two steps in order:

1. **`node scripts/build.mjs`** — wipes `dist/`, copies HTML pages, `js/`, `assets/`, `css/legal.css`, and everything in `public/` to `dist/`
2. **`tailwindcss -i css/input.css -o dist/css/styles.css --minify`** — compiles Tailwind into the output directory

Tailwind runs after the copy step so its output is not wiped.

## Local development

```bash
npm install
npm run build && npm run preview   # full preview at http://localhost:4173
```

For CSS-only iteration:

```bash
npm run dev   # watches css/input.css → css/styles.css
```

Run `npm run build` before preview when HTML or JS changes. The dev watch only recompiles CSS to the repo root (not `dist/`).

## Deployment

Configured in `vercel.json`:

```json
{
  "framework": null,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true
}
```

- **`cleanUrls: true`** — `/privacy` serves `dist/privacy/index.html` without `.html` in the URL
- No SPA rewrites — each route is a real static HTML file
- Push to the connected Git branch; Vercel runs `npm ci && npm run build`

## Deploy extras (`public/`)

Files in `public/` are copied to the `dist/` root during build:

| File | Purpose |
|------|---------|
| `robots.txt` | Search engine directives |
| `tiktokHtkXenpFyQKVqzQGFM8237uag8LO94Xh.txt` | TikTok domain verification |
| `app-config.json` | App configuration (`sendpulseAddressbookId`) |

These are not referenced by HTML — they must exist at the site root for crawlers and platform verifiers.

## Editing content

- **Landing copy** — edit `index.html` directly
- **Legal text** — edit the relevant `privacy/index.html`, `terms/index.html`, or `your-data/index.html`
- **Nav/footer** — duplicated across all 4 pages (intentional; no templating layer)
- **Styles** — Tailwind classes in HTML; legal typography in `css/legal.css`
- **New pages** — add an HTML file, include it in `@source` paths if outside existing scan patterns, update footer links on all pages
