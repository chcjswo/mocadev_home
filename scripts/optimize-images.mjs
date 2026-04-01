/**
 * 이미지 압축 최적화 스크립트
 * 사용법: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '../public/images');

const PNG_OPTIONS = { compressionLevel: 9, quality: 85 };
const JPEG_OPTIONS = { quality: 82, progressive: true };
const MIN_SAVINGS_BYTES = 10_000;

let totalSavedBytes = 0;
let processedCount = 0;
let skippedCount = 0;

function formatBytes(bytes) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)}MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)}KB`;
  return `${bytes}B`;
}

/** 파일명 공백 제거: 공백 → 하이픈 */
async function sanitizeFilename(filePath) {
  const dir = dirname(filePath);
  const name = basename(filePath);
  if (!name.includes(' ')) return filePath;

  const sanitized = name.replace(/\s+/g, '-');
  const newPath = join(dir, sanitized);
  await rename(filePath, newPath);
  console.log(`  [rename] "${name}" → "${sanitized}"`);
  return newPath;
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const sanitizedPath = await sanitizeFilename(filePath);
  const { size: originalSize } = await stat(sanitizedPath);

  try {
    let pipeline = sharp(sanitizedPath);
    if (ext === '.png') {
      pipeline = pipeline.png(PNG_OPTIONS);
    } else {
      pipeline = pipeline.jpeg(JPEG_OPTIONS);
    }

    const compressed = await pipeline.toBuffer();

    if (compressed.length < originalSize - MIN_SAVINGS_BYTES) {
      const { writeFile } = await import('fs/promises');
      await writeFile(sanitizedPath, compressed);
      const saved = originalSize - compressed.length;
      totalSavedBytes += saved;
      processedCount++;
      console.log(
        `  ✓ ${basename(sanitizedPath).slice(0, 60).padEnd(60)} ${formatBytes(originalSize)} → ${formatBytes(compressed.length)} (-${formatBytes(saved)})`
      );
    } else {
      skippedCount++;
    }
  } catch (err) {
    console.error(`  ✗ Error processing ${sanitizedPath}: ${err.message}`);
  }
}

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else {
      await compressImage(fullPath);
    }
  }
}

console.log('이미지 최적화 시작...\n');
await walkDir(IMAGES_DIR);

console.log('\n─────────────────────────────────────────────');
console.log(`압축 완료: ${processedCount}개 파일 최적화`);
console.log(`변경 없음: ${skippedCount}개 파일 스킵`);
console.log(`총 절감:   ${formatBytes(totalSavedBytes)}`);
