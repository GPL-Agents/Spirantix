const navItems = [
  ['learn', 'Learn', 'learn.html'],
  ['safety', 'Stay Safe', 'safety.html'],
  ['classes', 'Classes & Talks', 'classes.html'],
  ['products', 'Products', 'products.html'],
  ['about', 'About', 'about.html']
];

function logo() {
  return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#8FE0C6"/>
    <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#4FC9B5" transform="rotate(60 50 50)"/>
    <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#2BAE9E" transform="rotate(120 50 50)"/>
    <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#2E8FB8" transform="rotate(180 50 50)"/>
    <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#2368A8" transform="rotate(240 50 50)"/>
    <path d="M50,50 C50,25 60,13 83,13 C72,24 73,37 50,50Z" fill="#1B4E82" transform="rotate(300 50 50)"/>
    <circle cx="50" cy="50" r="7" fill="#ffffff"/>
    <circle cx="50" cy="50" r="3.2" fill="#2BAE9E"/>
  </svg>`;
}

function header(active, base) {
  const links = navItems.map(([key, label, href]) => {
    const current = active === key ? ' aria-current="page"' : '';
    return `<a href="${base}${href}"${current}>${label}</a>`;
  }).join('\n        ');

  return `<a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header">
    <div class="wrap nav-inner">
      <a class="brand" href="${base}index.html" aria-label="Spirantix home">
        ${logo()}
        <span>Spirantix<span>.ai</span></span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu" data-nav-toggle>
        <span class="visually-hidden">Open menu</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <nav id="site-menu" class="nav-links" aria-label="Primary" data-nav-menu>
        <div class="nav-primary-links">
          ${links}
        </div>
        <a class="nav-cta" href="${base}contact.html?type=speaking">Request a Session</a>
      </nav>
    </div>
  </header>`;
}

function footer(base) {
  return `<footer class="site-footer">
    <div class="wrap footer-grid">
      <div>
        <a class="brand" href="${base}index.html" aria-label="Spirantix home">${logo()}<span>Spirantix<span>.ai</span></span></a>
        <p class="small muted" style="margin-top:16px;max-width:360px">Helping seniors understand AI, use it with confidence, and protect what matters.</p>
      </div>
      <div>
        <h2>Learn</h2>
        <div class="footer-links">
          <a href="${base}learn.html">Learning hub</a>
          <a href="${base}safety.html">Stay Safe</a>
          <a href="${base}classes.html">Classes & Talks</a>
        </div>
      </div>
      <div>
        <h2>Spirantix</h2>
        <div class="footer-links">
          <a href="${base}products.html">Products</a>
          <a href="${base}about.html">About</a>
          <a href="${base}faq.html">Questions</a>
        </div>
      </div>
      <div>
        <h2>Contact</h2>
        <div class="footer-links">
          <a href="${base}contact.html">Contact us</a>
          <a href="${base}privacy.html">Privacy</a>
          <a href="mailto:hello@spirantix.ai">hello@spirantix.ai</a>
        </div>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <span>&copy; 2026 Spirantix, a division of <a href="https://www.futureinsites.com" target="_blank" rel="noopener">FutureInSites</a>.</span>
      <span>Designed for clarity, privacy, and confidence.</span>
    </div>
  </footer>`;
}

export function renderPage({
  title,
  description,
  path,
  active = '',
  body,
  depth = 0,
  jsonLd = null,
  noindex = false
}) {
  const base = depth ? '../'.repeat(depth) : '';
  const canonical = `https://spirantix.ai/${path === 'index.html' ? '' : path}`;
  const socialImage = 'https://spirantix.ai/assets/og-image-mission.png';
  const json = jsonLd ? `\n<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>` : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  ${noindex ? '<meta name="robots" content="noindex">' : ''}
  <link rel="canonical" href="${canonical}">
  <link rel="apple-touch-icon" href="${base}assets/apple-touch-icon.png">
  <link rel="icon" type="image/svg+xml" href="${base}assets/favicon.svg">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Spirantix.ai">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${socialImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${base}css/site.css?v=20260903-8">${json}
</head>
<body>
  ${header(active, base)}
  <main id="main-content">${body}</main>
  ${footer(base)}
  <script src="${base}js/site.js" defer></script>
</body>
</html>
`;
}
