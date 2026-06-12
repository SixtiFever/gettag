import { execSync } from 'node:child_process';

// Vercel uses @sparticuz/chromium at prerender time; skip the ~300MB Playwright download.
if (!process.env.VERCEL) {
  execSync('npx playwright install chromium', { stdio: 'inherit' });
}
