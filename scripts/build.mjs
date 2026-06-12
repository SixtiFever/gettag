import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

copyFile(path.join(root, 'index.html'), path.join(dist, 'index.html'));
copyRecursive(path.join(root, 'privacy'), path.join(dist, 'privacy'));
copyRecursive(path.join(root, 'terms'), path.join(dist, 'terms'));
copyRecursive(path.join(root, 'your-data'), path.join(dist, 'your-data'));
copyRecursive(path.join(root, 'js'), path.join(dist, 'js'));
copyRecursive(path.join(root, 'assets'), path.join(dist, 'assets'));
copyFile(path.join(root, 'css', 'legal.css'), path.join(dist, 'css', 'legal.css'));

for (const file of fs.readdirSync(path.join(root, 'public'))) {
  const src = path.join(root, 'public', file);
  const dest = path.join(dist, file);
  if (fs.statSync(src).isDirectory()) {
    copyRecursive(src, dest);
  } else {
    copyFile(src, dest);
  }
}

console.log('Static site copied to dist/');
