import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, 'src/data');
const galleryDir = path.join(here, 'public/gallery');
const MAX_BODY = 15 * 1024 * 1024;

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
const writeJson = (file, value) => fs.writeFileSync(path.join(dataDir, file), JSON.stringify(value, null, 2) + '\n');

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) reject(new Error('Upload too large'));
      else chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString() || '{}')); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

const send = (res, code, body) => {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

/* Local-only admin API. Runs only under `npm run dev`; never ships in the build. */
function adminApi() {
  return {
    name: 'mastercraft-admin-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/admin', async (req, res) => {
        try {
          const route = req.url.split('?')[0];

          if (req.method === 'GET' && route === '/data') {
            return send(res, 200, { reviews: readJson('reviews.json'), gallery: readJson('gallery.json') });
          }
          if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

          const body = await readBody(req);

          if (route === '/review') {
            const rating = Number(body.rating);
            if (!body.name?.trim() || !body.text?.trim()) return send(res, 400, { error: 'Name and review text are required' });
            if (!Number.isInteger(rating) || rating < 1 || rating > 5) return send(res, 400, { error: 'Rating must be 1 to 5' });
            const reviews = readJson('reviews.json');
            reviews.unshift({
              id: Date.now().toString(36),
              name: body.name.trim(),
              rating,
              text: body.text.trim(),
              dateText: (body.dateText || '').trim(),
              url: (body.url || '').trim(),
            });
            writeJson('reviews.json', reviews);
            return send(res, 200, { ok: true });
          }

          if (route === '/photo') {
            const match = /^data:image\/(png|jpeg|webp);base64,(.+)$/.exec(body.dataUrl || '');
            if (!match) return send(res, 400, { error: 'Upload a PNG, JPG or WebP image' });
            const kind = body.kind === 'before-after' ? 'before-after' : 'gallery';
            const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
            const id = Date.now().toString(36);
            const file = `${id}.${ext}`;
            fs.mkdirSync(galleryDir, { recursive: true });
            fs.writeFileSync(path.join(galleryDir, file), Buffer.from(match[2], 'base64'));
            const gallery = readJson('gallery.json');
            gallery.unshift({
              id,
              kind,
              src: `/gallery/${file}`,
              alt: (body.alt || 'MasterCraft auto repair and collision work').trim(),
              caption: (body.caption || '').trim(),
            });
            writeJson('gallery.json', gallery);
            return send(res, 200, { ok: true });
          }

          if (route === '/pair') {
            const parse = (u) => /^data:image\/(png|jpeg|webp);base64,(.+)$/.exec(u || '');
            const before = parse(body.beforeDataUrl);
            const after = parse(body.afterDataUrl);
            if (!before || !after) return send(res, 400, { error: 'Upload both a before and an after image' });
            const id = Date.now().toString(36);
            fs.mkdirSync(galleryDir, { recursive: true });
            const save = (m, tag) => {
              const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
              const src = `/gallery/${id}-${tag}.${ext}`;
              fs.writeFileSync(path.join(here, 'public', src), Buffer.from(m[2], 'base64'));
              return src;
            };
            const gallery = readJson('gallery.json');
            gallery.unshift({
              id,
              kind: 'before-after',
              before: save(before, 'before'),
              after: save(after, 'after'),
              alt: (body.alt || 'Collision repair').trim(),
              caption: (body.caption || '').trim(),
            });
            writeJson('gallery.json', gallery);
            return send(res, 200, { ok: true });
          }

          if (route === '/delete') {
            if (body.collection === 'reviews') {
              writeJson('reviews.json', readJson('reviews.json').filter((r) => r.id !== body.id));
            } else if (body.collection === 'gallery') {
              const gallery = readJson('gallery.json');
              const item = gallery.find((g) => g.id === body.id);
              for (const src of [item?.src, item?.before, item?.after]) {
                if (src) fs.rmSync(path.join(here, 'public', src), { force: true });
              }
              writeJson('gallery.json', gallery.filter((g) => g.id !== body.id));
            } else {
              return send(res, 400, { error: 'Unknown collection' });
            }
            return send(res, 200, { ok: true });
          }

          return send(res, 404, { error: 'Not found' });
        } catch (err) {
          return send(res, 400, { error: err.message });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), adminApi()],
  base: '/', // Configured for custom domain deployment (e.g., yourshopname.com)
  build: { target: 'es2019', cssCodeSplit: true },
});
