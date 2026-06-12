# Tag Landing Page (tag-social.com)

Production is a **React SPA** built with Vite, prerendered at build time with Playwright, and deployed to Vercel on every git push.

| URL | Route |
|-----|-------|
| https://www.tag-social.com/ | Landing page (`PipeLandingPage`) |
| https://www.tag-social.com/privacy | Privacy Policy |
| https://www.tag-social.com/terms | Terms of Service |
| https://www.tag-social.com/your-data | Your Data |

Use `www.tag-social.com` consistently — the apex domain redirects to www.

## Preview locally

```bash
npm install
npm run dev
```

Opens http://localhost:5173/ with hot reload. **View Source in dev mode shows an empty shell** — that is expected (Vite serves a client-only app during development).

## Production build

```bash
npm run build
npm run preview
```

Build output goes to `dist/`. The build runs Vite, then Playwright prerender snapshots `/`, `/privacy`, `/terms`, and `/your-data` into static HTML files so crawlers (including TikTok's verifier) see full page content without executing JavaScript.

After `npm run preview`, open http://localhost:4173/ and use **View Source** — you should see the hero copy, section content, and footer legal links in the HTML.

## Deploy

Push to the connected Git branch. Vercel runs `npm ci && npm run build` and serves `dist/`.

After deploy, verify crawlability:

```bash
curl -sL https://www.tag-social.com/ | grep -i "Privacy Policy"
curl -sL https://www.tag-social.com/ | grep -i "Short Form Video Debating"
curl -sL https://www.tag-social.com/privacy | grep -i "Information We Collect"
curl -sL https://www.tag-social.com/tiktokHtkXenpFyQKVqzQGFM8237uag8LO94Xh.txt
```

## Archived

Previous static HTML landing pages, old React designs, and the `newlp_pipe` prototype live in [`archived/`](archived/).

## Email signup

The landing page posts to the Cloud Function at `https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail`.
