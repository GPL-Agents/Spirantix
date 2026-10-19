import { readFileSync } from 'node:fs';
import { renderPage } from './layout.mjs';

const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const inline = (s) => escape(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
export function renderGuide() {
  const source = readFileSync(new URL('./guide-copy.md', import.meta.url), 'utf8');
  const blocks = source.trim().split(/\r?\n\s*\r?\n/);
  let firstHeading = true;
  const content = blocks.map((block) => {
    if (block.startsWith('### ')) {
      const level = firstHeading ? 1 : 2;
      firstHeading = false;
      return '<h' + level + '>' + inline(block.slice(4)) + '</h' + level + '>';
    }
    if (/^\*\*[^\n]+\*\*$/.test(block)) return '<h3>' + inline(block.slice(2, -2)) + '</h3>';
    if (/^(- |\d+\. )/.test(block)) {
      const ordered = /^\d/.test(block);
      const items = block.replace(/\r?\n(?!- |\d+\. )/g, ' ').split(/\r?\n/);
      const tag = ordered ? 'ol' : 'ul';
      return '<' + tag + '>' + items.map((s) => '<li>' + inline(s.replace(/^(- |\d+\. )/, '')) + '</li>').join('') + '</' + tag + '>';
    }
    return '<p>' + inline(block.replace(/\r?\n/g, ' ')) + '</p>';
  }).join('\n');
  const body = '<section class="lesson-shell"><div class="wrap"><article class="lesson-body concierge-guide">' + content + '<p><a href="support.html">Get help with Spirantix</a></p></article></div></section>';
  return { path: 'guide.html', html: renderPage({ path: 'guide', title: 'Spirantix Concierge Guide | Spirantix.ai', description: 'How to talk with the Spirantix Concierge, with example prompts and clear limits.', body }) };
}
