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
- `css/site.css` contains the shared visual system.
- `js/site.js` contains mobile navigation and contact-form behavior.
- `assets/` holds images only.

The four detailed agent pages remain independent pages because each has a specialized design and established content. They still use the shared site navigation links after this expansion.

## Agent page and outreach updates

- Run `node scripts/refresh-agent-shells.mjs` after changing the shared agent-page header, footer, or metadata.
- Run `python scripts/build-outreach-pdf.py` after changing the one-page classes and talks handout. The public PDF is written to `output/pdf/spirantix-classes-and-talks.pdf`.

## Checks before publishing

1. Run `node scripts/build-site.mjs`.
2. Run `node scripts/refresh-agent-shells.mjs`.
3. Run `node scripts/validate-site.mjs` to check page structure and local links.
4. Run `node scripts/test-contact.mjs` to check the contact endpoint validation and spam trap.
5. Preview the site at desktop and mobile sizes before committing.
