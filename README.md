# Tag Landing Page (tag-social.com)

Static HTML site with Tailwind CSS, deployed to Vercel on every git push.

| URL | Page |
|-----|------|
| https://www.tag-social.com/ | Landing page |
| https://www.tag-social.com/privacy | Privacy Policy |
| https://www.tag-social.com/terms | Terms of Service |
| https://www.tag-social.com/your-data | Your Data |

Use `www.tag-social.com` consistently — the apex domain redirects to www.

## Preview locally

```bash
npm install
npm run build
npm run preview
```

Opens http://localhost:4173/ serving `dist/`. **View Source** shows full page content in HTML.

For CSS edits during development:

```bash
npm run dev
```

This watches `css/input.css` and recompiles to `css/styles.css`. Run `npm run build` before preview to pick up HTML changes.

## Deploy

Push to the connected Git branch. Vercel runs `npm ci && npm run build` and serves `dist/`. No Playwright or React build step.
