import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const previewPort = 4173;
const previewHost = '127.0.0.1';
const previewUrl = `http://${previewHost}:${previewPort}`;

const routes = [
  { path: '/', output: 'index.html' },
  { path: '/privacy', output: 'privacy/index.html' },
  { path: '/terms', output: 'terms/index.html' },
  { path: '/your-data', output: 'your-data/index.html' },
];

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          resolve();
          return;
        }
      } catch {
        // Server not ready yet.
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Preview server did not start within ${timeoutMs}ms`));
        return;
      }

      setTimeout(check, 250);
    };

    check();
  });
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn(
      'npx',
      ['vite', 'preview', '--host', previewHost, '--port', String(previewPort), '--strictPort'],
      {
        cwd: root,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, NODE_ENV: 'production' },
      },
    );

    let startupLogs = '';

    server.stdout.on('data', (chunk) => {
      startupLogs += chunk.toString();
    });

    server.stderr.on('data', (chunk) => {
      startupLogs += chunk.toString();
    });

    server.on('error', reject);

    waitForServer(previewUrl)
      .then(() => resolve(server))
      .catch((error) => {
        server.kill('SIGTERM');
        reject(new Error(`${error.message}\n${startupLogs}`));
      });
  });
}

async function prerenderRoute(page, routePath) {
  await page.goto(`${previewUrl}${routePath}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-prerender-ready="true"]', { timeout: 30000 });
  return page.content();
}

async function main() {
  if (!fs.existsSync(distDir)) {
    throw new Error('dist/ not found. Run vite build before prerendering.');
  }

  console.log('Starting preview server...');
  const server = await startPreviewServer();

  let browser;

  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    for (const route of routes) {
      console.log(`Prerendering ${route.path}...`);
      const html = await prerenderRoute(page, route.path);
      const outputPath = path.join(distDir, route.output);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, html, 'utf8');
      console.log(`  → dist/${route.output}`);
    }

    console.log('Prerender complete.');
  } finally {
    if (browser) {
      await browser.close();
    }

    server.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
