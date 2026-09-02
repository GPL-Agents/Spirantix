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

console.log(`Generated ${outputs.length} pages.`);
