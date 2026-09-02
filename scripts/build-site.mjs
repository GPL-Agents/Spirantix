import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPages } from '../site-src/pages.mjs';
import { renderLessons } from '../site-src/lessons.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const outputs = [...renderPages(), ...renderLessons()];

for (const output of outputs) {
  const target = resolve(root, output.path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, output.html, 'utf8');
}

const sitemapPaths = [
  ...outputs.map(output => output.path).filter(path => path !== '404.html'),
  'emery.html',
  'capsa.html',
  'addie.html',
  'heri.html'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths.map(path => `  <url><loc>https://spirantix.ai/${path === 'index.html' ? '' : path}</loc><lastmod>2026-09-02</lastmod></url>`).join('\n')}
</urlset>
`;

await writeFile(resolve(root, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${outputs.length} pages and sitemap.xml.`);
