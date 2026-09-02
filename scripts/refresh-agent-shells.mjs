import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['emery.html', 'capsa.html', 'addie.html', 'heri.html'];

const logo = `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
  <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#8FE0C6"/>
  <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#4FC9B5" transform="rotate(60 50 50)"/>
  <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#2BAE9E" transform="rotate(120 50 50)"/>
  <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#2E8FB8" transform="rotate(180 50 50)"/>
  <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#2368A8" transform="rotate(240 50 50)"/>
  <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#1B4E82" transform="rotate(300 50 50)"/>
  <circle cx="50" cy="50" r="7" fill="#ffffff"/>
  <circle cx="50" cy="50" r="3.2" fill="#2BAE9E"/>
</svg>`;

const header = `<a class="skip-link" href="#main-content">Skip to main content</a>
<header class="site-header">
  <div class="wrap nav-inner">
    <a class="brand" href="index.html" aria-label="Spirantix home">${logo}<span>Spirantix<span>.ai</span></span></a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu" data-nav-toggle>
      <span class="visually-hidden">Open menu</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
    <nav id="site-menu" class="nav-links" aria-label="Primary" data-nav-menu>
      <a href="learn.html">Learn</a>
      <a href="safety.html">Stay Safe</a>
      <a href="classes.html">Classes & Talks</a>
      <a href="products.html" aria-current="page">Products</a>
      <a href="about.html">About</a>
      <a class="nav-cta" href="contact.html?type=speaking">Request a Session</a>
    </nav>
  </div>
</header>`;

const footer = `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div><a class="brand" href="index.html" aria-label="Spirantix home">${logo}<span>Spirantix<span>.ai</span></span></a><p class="small muted" style="margin-top:16px;max-width:360px">Helping seniors understand AI, use it with confidence, and protect what matters.</p></div>
    <div><h2>Learn</h2><div class="footer-links"><a href="learn.html">Learning hub</a><a href="safety.html">Stay Safe</a><a href="classes.html">Classes & Talks</a></div></div>
    <div><h2>Spirantix</h2><div class="footer-links"><a href="products.html">Products</a><a href="about.html">About</a><a href="faq.html">Questions</a></div></div>
    <div><h2>Contact</h2><div class="footer-links"><a href="contact.html">Contact us</a><a href="privacy.html">Privacy</a><a href="mailto:hello@spirantix.ai">hello@spirantix.ai</a></div></div>
  </div>
  <div class="wrap footer-bottom"><span>&copy; 2026 Spirantix, a division of <a href="https://www.futureinsites.com" target="_blank" rel="noopener">FutureInSites</a>.</span><span>Designed for clarity, privacy, and confidence.</span></div>
</footer>`;

for (const file of files) {
  const target = resolve(root, file);
  let html = await readFile(target, 'utf8');

  if (!html.includes('assets/site.css')) {
    html = html.replace('</style>', '</style>\n<link rel="stylesheet" href="assets/site.css">');
  }

  if (!html.includes('class="site-header"')) {
    html = html.replace(/<nav>[\s\S]*?<\/nav>/, header);
  }
  if (!html.includes('class="site-footer"')) {
    html = html.replace(/<footer>[\s\S]*?<\/footer>/, footer);
  }
  html = html.replaceAll('index.html#products', 'products.html');
  html = html.replaceAll('assets/og-image.png', 'assets/og-image-mission.png');
  html = html.replace(/href="mailto:hello@spirantix\.ai\?subject=[^"]+"/g, 'href="contact.html?type=product"');
  if (!html.includes('id="main-content"')) {
    html = html.replace('<main class="wrap">', '<main id="main-content" class="wrap">');
  }
  html = html.replace(/<\/main>\r?\n\r?\n<section class="how">/, '\n\n<section class="how">');
  html = html.replace(/\r?\n<main(?: id="main-content")? class="wrap">\r?\n\r?\n  <div class="twocol">/, '\n<div class="wrap">\n\n  <div class="twocol">');
  html = html.replace(/<\/main>\r?\n\r?\n<!-- Lightbox/, '</div>\n</main>\n\n<!-- Lightbox');
  html = html.replace(
    /<img (src="assets\/[^"]*onepager\.webp" alt="[^"]+" loading="lazy") onclick="document\.getElementById\('lightbox'\)\.classList\.add\('open'\)">/i,
    '<button class="onepager-trigger" type="button" aria-label="Enlarge agent overview" onclick="document.getElementById(\'lightbox\').classList.add(\'open\')"><img $1></button>'
  );
  html = html.replace(
    /<div id="lightbox" class="lightbox"(?: role="dialog" aria-modal="true" aria-label="Enlarged agent overview")*/,
    '<div id="lightbox" class="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged agent overview"'
  );

  if (!html.includes('assets/site.js')) {
    html = html.replace('</body>', '<script src="assets/site.js" defer></script>\n</body>');
  }

  await writeFile(target, html, 'utf8');
}

console.log(`Refreshed ${files.length} agent pages.`);
