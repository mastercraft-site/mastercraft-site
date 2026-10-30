import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, watch: null },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const marker = '<!--app-html-->';
  assert.equal(template.split(marker).length - 1, 1, 'Expected one homepage prerender placeholder.');
  const markup = renderToString(createElement(App));
  assert.ok(markup.includes('id="main"'), 'The homepage content must be rendered at build time.');
  await writeFile(new URL('../dist/index.html', import.meta.url), template.replace(marker, () => markup));
  console.log('Prerendered homepage content for crawlers and visitors without JavaScript.');
} finally {
  await server.close();
}