#!/usr/bin/env node

/**
 * Image Optimization Script
 *
 * Compresses images in src/assets using:
 * - JPEG optimization (mozjpeg)
 * - PNG optimization (pngquant)
 * - WebP conversion
 *
 * Usage: npm run optimize:images
 */

const path = require("path");
const fs = require("fs");

// Using native Node.js image processing
const sharp = require("sharp");

const ASSETS_DIR = path.join(__dirname, "../src/assets");
const OPTIMIZED_DIR = path.join(__dirname, "../src/assets/optimized");

// Create optimized directory if it doesn't exist
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

const imageFiles = fs
  .readdirSync(ASSETS_DIR)
  .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

console.log(`🖼️  Found ${imageFiles.length} images to optimize\n`);

let processed = 0;
let skipped = 0;

async function optimizeImage(filename) {
  const inputPath = path.join(ASSETS_DIR, filename);
  const fileStats = fs.statSync(inputPath);
  const fileSizeKB = (fileStats.size / 1024).toFixed(2);

  console.log(`📦 Processing: ${filename} (${fileSizeKB}KB)`);

  const ext = path.extname(filename).toLowerCase();
  const nameWithoutExt = path.basename(filename, ext);

  try {
    // Optimize original format
    if (ext === ".jpg" || ext === ".jpeg") {
      const outputPath = path.join(OPTIMIZED_DIR, `${nameWithoutExt}-optimized.jpg`);
      await sharp(inputPath)
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSizeKB = (newStats.size / 1024).toFixed(2);
      const reduction = (((fileStats.size - newStats.size) / fileStats.size) * 100).toFixed(1);

      console.log(`  ✅ JPG: ${fileSizeKB}KB → ${newSizeKB}KB (${reduction}% reduction)`);
    } else if (ext === ".png") {
      const outputPath = path.join(OPTIMIZED_DIR, `${nameWithoutExt}-optimized.png`);
      await sharp(inputPath)
        .png({ quality: 80, compressionLevel: 9 })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSizeKB = (newStats.size / 1024).toFixed(2);
      const reduction = (((fileStats.size - newStats.size) / fileStats.size) * 100).toFixed(1);

      console.log(`  ✅ PNG: ${fileSizeKB}KB → ${newSizeKB}KB (${reduction}% reduction)`);
    }

    // Generate WebP version
    const webpPath = path.join(OPTIMIZED_DIR, `${nameWithoutExt}.webp`);
    const webpImage = sharp(inputPath).webp({ quality: 75 });
    await webpImage.toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSizeKB = (webpStats.size / 1024).toFixed(2);
    const webpReduction = (((fileStats.size - webpStats.size) / fileStats.size) * 100).toFixed(1);

    console.log(`  ✅ WebP: ${fileSizeKB}KB → ${webpSizeKB}KB (${webpReduction}% reduction)\n`);

    processed++;
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}\n`);
    skipped++;
  }
}

async function main() {
  console.log("🚀 Starting image optimization...\n");

  for (const file of imageFiles) {
    await optimizeImage(file);
  }

  console.log("✨ Optimization complete!");
  console.log(`📊 Processed: ${processed}, Skipped: ${skipped}`);
  console.log(`\n📁 Optimized images saved to: ${OPTIMIZED_DIR}`);
  console.log("\n💡 Replace original images with optimized versions:");
  console.log("   cp src/assets/optimized/* src/assets/");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
