#!/usr/bin/env node
import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'images');
const input = join(publicDir, 'logo.png');
const outputWebp = join(publicDir, 'logo.webp');
const outputPng = join(publicDir, 'logo-64.png'); // fallback, smaller PNG

if (!existsSync(input)) {
  console.error('logo.png not found in public/images/');
  process.exit(1);
}

// Nav shows 32x28, use 64px breed voor 2x retina (hoogte volgt aspect ratio — geen padding = geen streep)
const width = 64;

try {
  const pipeline = sharp(input)
    .trim({ threshold: 1 }) // Verwijder eventuele rand-artefacten uit bron
    .resize(width); // Alleen breedte, hoogte volgt aspect — voorkomt padding/streep van contain
  
  await pipeline.clone().webp({ quality: 85 }).toFile(outputWebp);
  const webpStats = statSync(outputWebp);
  const meta = await sharp(outputWebp).metadata();
  console.log(`Created logo.webp (${meta.width}x${meta.height}) — ${(webpStats.size / 1024).toFixed(1)} KiB`);
  
  const inputStats = statSync(input);
  console.log(`Original logo.png — ${(inputStats.size / 1024).toFixed(1)} KiB`);
  console.log(`Saved ~${Math.round((inputStats.size - webpStats.size) / 1024)} KiB`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
