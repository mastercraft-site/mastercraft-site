import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const sourceDirectory = fileURLToPath(new URL('../Car collision pic /', import.meta.url));
const outputDirectory = fileURLToPath(new URL('../public/images/', import.meta.url));
const region = (left, top, width, height) => ({ left, top, width, height });
const photos = [
  {
    id: 'collision-audi',
    source: '959694.jpg',
    crops: [region(0, 0, 570, 425), region(574, 0, 566, 425)],
  },
  {
    id: 'collision-jeep',
    source: 'Before-After-Jeep.webp',
    crops: [region(0, 0, 570, 425), region(570, 0, 570, 425)],
  },
  {
    id: 'collision-acura',
    source: 'GetLibraryImage.jpeg',
    crops: [region(24, 24, 562, 538), region(614, 24, 562, 538)],
  },
  {
    id: 'collision-mustang',
    source: 'before-after-1920w.webp',
    crops: [region(0, 0, 350, 165), region(0, 176, 350, 197)],
  },
  {
    id: 'collision-red-sedan',
    source: '471957983_18295198900237765_3695677779504136255_n.jpg',
    crops: [region(0, 0, 1080, 535), region(0, 544, 1080, 536)],
  },
  {
    id: 'collision-mazda',
    source: 'mazda-3-front-bumper-repair-before-after-oklahoma-city.webp',
    crops: [region(0, 0, 736, 1032), region(772, 0, 734, 1032)],
  },
];

for (const photo of photos) {
  const original = await readFile(join(sourceDirectory, photo.source));
  const pair = [];

  for (const [index, crop] of photo.crops.entries()) {
    const side = index === 0 ? 'before' : 'after';
    const image = await sharp(original)
      .extract(crop)
      .flatten({ background: '#111111' })
      .resize(960, 720, { fit: 'contain', background: '#111111' })
      .webp({ quality: 88 })
      .toBuffer();
    await sharp(image).toFile(join(outputDirectory, `${photo.id}-${side}.webp`));
    const metadata = await sharp(image).metadata();
    assert.equal(metadata.width, 960);
    assert.equal(metadata.height, 720);
    pair.push(image);
  }

  await sharp({ create: { width: 1920, height: 720, channels: 3, background: '#111111' } })
    .composite(pair.map((input, index) => ({ input, left: index * 960, top: 0 })))
    .toFile(join(outputDirectory, photo.source));
  console.log(`${photo.id}: two 960x720 comparison images and an unblurred public composite.`);
}