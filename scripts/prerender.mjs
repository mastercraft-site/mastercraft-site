import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';
import { parse, parseFragment, serialize } from 'parse5';
import { pages, SITE_ORIGIN } from '../src/data/pages.js';

const outputDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const attribute = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
const findAll = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes || []).flatMap((child) => findAll(child, predicate)),
];
const find = (node, predicate) => findAll(node, predicate)[0];
const setAttribute = (node, name, value) => {
  assert.ok(node, `Missing element for attribute ${name}.`);
  const existing = node.attrs.find((item) => item.name === name);
  if (existing) existing.value = value;
  else node.attrs.push({ name, value });
};
const setText = (node, value) => { node.childNodes = [{ nodeName: '#text', value, parentNode: node }]; };
const xmlEscape = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const server = await createServer({
  server: { middlewareMode: true, watch: null },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const gallery = JSON.parse(await readFile(new URL('../src/data/gallery.json', import.meta.url), 'utf8'));
  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length, 'Page titles must be unique.');
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length, 'Page descriptions must be unique.');
  const sitemapEntries = [];

  for (const page of pages) {
    assert.ok(page.description.length >= 25 && page.description.length <= 160, `${page.path} meta description must be 25-160 characters; received ${page.description.length}.`);
    assert.match(page.lastmod, /^\d{4}-\d{2}-\d{2}$/, `Invalid lastmod for ${page.path}.`);
    const canonical = new URL(page.path, SITE_ORIGIN).href;
    const document = parse(template);
    const root = find(document, (node) => attribute(node, 'id') === 'root');
    const markup = renderToString(createElement(App, { pathname: page.path }));
    const fragment = parseFragment(root, markup);
    root.childNodes = fragment.childNodes;
    root.childNodes.forEach((child) => { child.parentNode = root; });
    assert.equal(findAll(root, (node) => node.tagName === 'h1').length, 1, `${page.path} must have one H1.`);
    assert.ok(find(root, (node) => attribute(node, 'id') === 'main'), `${page.path} needs main content.`);

    setText(find(document, (node) => node.tagName === 'title'), page.title);
    const meta = (name, value) => setAttribute(find(document, (node) => node.tagName === 'meta' && (attribute(node, 'name') === name || attribute(node, 'property') === name)), 'content', value);
    meta('description', page.description);
    meta('og:title', page.title);
    meta('og:description', page.description);
    meta('og:url', canonical);
    meta('twitter:title', page.title);
    meta('twitter:description', page.description);
    const image = new URL(page.image || '/images/hero-storefront.webp', SITE_ORIGIN).href;
    meta('og:image', image);
    meta('twitter:image', image);
    meta('og:image:alt', page.imageAlt || 'MasterCraft Auto Repair & Collision storefront in Long Island City, NY');
    meta('twitter:image:alt', page.imageAlt || 'MasterCraft Auto Repair & Collision storefront in Long Island City, NY');
    setAttribute(find(document, (node) => node.tagName === 'link' && attribute(node, 'rel') === 'canonical'), 'href', canonical);

    const schemaElement = find(document, (node) => node.tagName === 'script' && attribute(node, 'type') === 'application/ld+json');
    const schema = JSON.parse(schemaElement.childNodes.map((node) => node.value || '').join(''));
    schema['@graph'] = schema['@graph'].filter((entity) => entity['@type'] !== 'WebPage');
    const pageEntity = {
      '@type': page.kind === 'faq' ? 'FAQPage' : page.kind === 'about' ? 'AboutPage' : 'WebPage',
      '@id': `${canonical}#webpage`, url: canonical, name: page.title, description: page.description,
      inLanguage: 'en-US', dateModified: page.lastmod,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      about: { '@id': `${SITE_ORIGIN}/#business` },
      mainEntity: { '@id': `${SITE_ORIGIN}/#business` },
    };
    if (page.kind !== 'home') {
      pageEntity.breadcrumb = { '@id': `${canonical}#breadcrumbs` };
      schema['@graph'].push({
        '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: page.label, item: canonical },
        ],
      });
    }
    if (page.kind === 'service') {
      pageEntity.mainEntity = { '@id': `${canonical}#service` };
      schema['@graph'].push({
        '@type': 'Service', '@id': `${canonical}#service`, name: page.label,
        description: page.description, serviceType: page.heading, url: canonical,
        areaServed: 'Long Island City, Queens', provider: { '@id': `${SITE_ORIGIN}/#business` },
      });
    }
    if (page.kind === 'about') pageEntity.mainEntity = { '@id': `${SITE_ORIGIN}/#owner` };
    if (page.kind === 'faq') {
      pageEntity.mainEntity = page.questions.map((item) => ({
        '@type': 'Question', name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      }));
    }
    schema['@graph'].push(pageEntity);
    setText(schemaElement, JSON.stringify(schema).replace(/</g, '\\u003c'));

    const outputPath = page.path.endsWith('.html')
      ? join(outputDirectory, page.path.slice(1))
      : join(outputDirectory, ...page.path.split('/').filter(Boolean), 'index.html');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, serialize(document));

    const imagePaths = page.kind === 'home'
      ? ['/images/hero-storefront.webp', ...gallery.flatMap((item) => [item.before, item.after].filter(Boolean))]
      : page.image ? [page.image] : [];
    const imageEntries = [...new Set(imagePaths)].map((path) => `    <image:image><image:loc>${xmlEscape(new URL(path, SITE_ORIGIN).href)}</image:loc></image:image>`);
    sitemapEntries.push(['  <url>', `    <loc>${xmlEscape(canonical)}</loc>`, `    <lastmod>${page.lastmod}</lastmod>`, ...imageEntries, '  </url>'].join('\n'));
    console.log(`Prerendered ${page.path}`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemapEntries.join('\n')}\n</urlset>\n`;
  await writeFile(join(outputDirectory, 'sitemap.xml'), sitemap);
  await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
  console.log(`Generated ${pages.length} static pages and dated sitemap entries.`);
} finally {
  await server.close();
}