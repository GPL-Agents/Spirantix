# Spirantix site maintenance

The public site remains static HTML. Shared page structure and content live in `site-src`, and `scripts/build-site.mjs` generates the public HTML files at the repository root and in `learn`.

## Update shared pages

1. Edit the relevant file in `site-src`.
2. Run the site generator with Node.js.
3. Review the generated HTML changes before committing.

The generator has no external package dependencies. It does not change the Vercel deployment model.

## Source files

- `site-src/layout.mjs` contains the shared header, navigation, footer, metadata, and page shell.
- `site-src/data.mjs` contains event, lesson-index, and product-card information.
- `site-src/pages.mjs` contains the main public pages.
- `site-src/lessons.mjs` contains the published tutorials.
- `assets/site.css` contains the shared visual system.
- `assets/site.js` contains mobile navigation and contact-form behavior.

The four detailed agent pages remain independent pages because each has a specialized design and established content. They still use the shared site navigation links after this expansion.
