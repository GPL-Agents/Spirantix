import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirectories = new Set(['.git', 'api', 'New', 'scripts', 'site-src']);

async function collectHtml(directory, files = []) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ignoredDirectories.has(entry.name)) continue;
    const full = resolve(directory, entry.name);
    if (entry.isDirectory()) await collectHtml(full, files);
    if (entry.isFile() && extname(entry.name).toLowerCase() === '.html') files.push(full);
  }
  return files;
}

function localTarget(fromFile, value) {
  if (!value || value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('tel:')) return null;
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return null;
  const withoutQuery = value.split('#')[0].split('?')[0];
  if (!withoutQuery) return null;
  return resolve(dirname(fromFile), withoutQuery);
}

const errors = [];
const htmlFiles = await collectHtml(root);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const relative = file.slice(root.length + 1).replaceAll('\\', '/');

  if (!/^<!DOCTYPE html>/i.test(html.trim())) errors.push(`${relative}: missing HTML doctype`);
  if (!/<html\s+lang="en"/i.test(html)) errors.push(`${relative}: missing page language`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${relative}: missing title`);
  if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) errors.push(`${relative}: missing description`);
  if (relative !== '404.html' && !/<link\s+rel="canonical"\s+href="https:\/\/spirantix\.ai\//i.test(html)) errors.push(`${relative}: missing canonical URL`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push(`${relative}: expected exactly one h1`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/gi)].map(match => match[1]);
  for (const id of new Set(ids)) {
    if (ids.filter(value => value === id).length > 1) errors.push(`${relative}: duplicate id ${id}`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
    const target = localTarget(file, match[1]);
    if (!target) continue;
    try {
      await access(target);
    } catch {
      errors.push(`${relative}: missing local target ${match[1]}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages with no missing local links or structural errors.`);
