const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('[copy-static] Preserving static sub-projects into dist...');

if (!fs.existsSync(distDir)) {
  console.error('[copy-static] Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

// 1. Copy jardim-web intact
const jardimWebSrc = path.join(rootDir, 'jardim-web');
const jardimWebDest = path.join(distDir, 'jardim-web');
copyDirRecursive(jardimWebSrc, jardimWebDest);
console.log('[copy-static] Copied /jardim-web intact to dist/jardim-web');

// 2. Copy nfse-nacional intact
const nfseSrc = path.join(rootDir, 'nfse-nacional');
const nfseDest = path.join(distDir, 'nfse-nacional');
copyDirRecursive(nfseSrc, nfseDest);
console.log('[copy-static] Copied /nfse-nacional intact to dist/nfse-nacional');

// 3. Ensure .nojekyll in dist
const noJekyllDest = path.join(distDir, '.nojekyll');
if (!fs.existsSync(noJekyllDest)) {
  fs.writeFileSync(noJekyllDest, '');
  console.log('[copy-static] Created dist/.nojekyll');
}

// 4. Create 404.html as a duplicate of index.html for GitHub Pages fallback
const indexHtml = path.join(distDir, 'index.html');
const notFoundHtml = path.join(distDir, '404.html');
if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, notFoundHtml);
  console.log('[copy-static] Created dist/404.html from dist/index.html for GitHub Pages routing');
}

console.log('[copy-static] Static preservation completed successfully.');
