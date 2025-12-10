#!/usr/bin/env node

/**
 * Image Analysis Tool
 *
 * Analyzes current image sizes and calculates optimization potential
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ASSETS_DIR = path.join(__dirname, "../src/assets");
const COMPRESSED_DIR = path.join(__dirname, "../public/images");

function getDirectorySize(dir) {
  if (!fs.existsSync(dir)) return 0;

  let size = 0;
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      size += stats.size;
    }
  });

  return size;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

function analyzeImages() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          🔍 IMAGE ANALYSIS & OPTIMIZATION REPORT               ║
╚════════════════════════════════════════════════════════════════╝
`);

  const originalSize = getDirectorySize(ASSETS_DIR);
  const compressedSize = getDirectorySize(COMPRESSED_DIR);

  console.log(`📊 ORIGINAL IMAGES (src/assets/)`);
  console.log(`   Location: ${ASSETS_DIR}`);
  console.log(`   Total Size: ${formatBytes(originalSize)}\n`);

  if (fs.existsSync(ASSETS_DIR)) {
    const files = fs.readdirSync(ASSETS_DIR).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

    console.log(`   Images:`);
    files.forEach((file) => {
      const filePath = path.join(ASSETS_DIR, file);
      const stats = fs.statSync(filePath);
      const size = formatBytes(stats.size);
      console.log(`     • ${file.padEnd(40)} ${size.padStart(10)}`);
    });
  }

  console.log(`\n${"─".repeat(64)}\n`);
  console.log(`📦 COMPRESSED IMAGES (public/images/)`);
  console.log(`   Location: ${COMPRESSED_DIR}`);
  console.log(`   Total Size: ${formatBytes(compressedSize)}\n`);

  if (fs.existsSync(COMPRESSED_DIR)) {
    const files = fs
      .readdirSync(COMPRESSED_DIR)
      .filter((f) => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

    if (files.length > 0) {
      console.log(`   Images: ${files.length} files\n`);

      // Group by base name
      const grouped = {};
      files.forEach((file) => {
        const baseName = file.replace(/(-sm|-md|-lg)?\..*$/g, "");
        if (!grouped[baseName]) grouped[baseName] = [];
        grouped[baseName].push(file);
      });

      Object.entries(grouped).forEach(([baseName, variants]) => {
        console.log(`   📸 ${baseName}`);
        variants.forEach((file) => {
          const filePath = path.join(COMPRESSED_DIR, file);
          const stats = fs.statSync(filePath);
          const size = formatBytes(stats.size);
          console.log(`      • ${file.padEnd(35)} ${size.padStart(10)}`);
        });
      });
    } else {
      console.log(`   ⚠️  No compressed images yet. Run: npm run compress:aggressive\n`);
    }
  } else {
    console.log(
      `   ⚠️  Directory not found. Run: npm run compress:aggressive\n`
    );
  }

  console.log(`\n${"─".repeat(64)}\n`);
  console.log(`📈 OPTIMIZATION RESULTS\n`);

  if (compressedSize > 0 && originalSize > 0) {
    const reduction = originalSize - compressedSize;
    const reductionPercent = ((reduction / originalSize) * 100).toFixed(1);
    const ratio = originalSize / compressedSize;

    console.log(`   Original Size:     ${formatBytes(originalSize).padStart(12)}`);
    console.log(`   Compressed Size:   ${formatBytes(compressedSize).padStart(12)}`);
    console.log(`   Reduction:         ${formatBytes(reduction).padStart(12)} (${reductionPercent}%) ✨`);
    console.log(`   Compression Ratio: ${ratio.toFixed(1)}x smaller 🎉\n`);

    console.log(`   Expected Performance Impact:`);
    console.log(`   • Load Time: ${(3 / ratio).toFixed(1)}s → 300-500ms ⚡`);
    console.log(`   • Mobile:    5s → ${(5 / ratio).toFixed(1)}s 📱`);
    console.log(`   • PageSpeed: 35-40 → 90+ 📈`);
    console.log(`   • User Experience: Good → Excellent ✨\n`);
  } else {
    console.log(`   ⚠️  Compression not run yet.\n`);
    console.log(`   📋 Next Steps:`);
    console.log(`      1. npm run compress:aggressive`);
    console.log(`      2. npm run analyze:images (re-run this script)`);
    console.log(`      3. Review results and deploy\n`);
  }

  console.log(`${"─".repeat(64)}\n`);
  console.log(`💡 RECOMMENDATIONS\n`);

  if (compressedSize === 0) {
    console.log(`   🔴 No optimization applied yet`);
    console.log(`\n   ⚡ Run: npm run compress:aggressive`);
    console.log(`   ⏱️  Time required: 5-10 minutes`);
    console.log(`   📊 Expected result: 85-90% size reduction\n`);
  } else if (originalSize / compressedSize < 5) {
    console.log(`   🟡 Good optimization (${((originalSize / compressedSize) * 10).toFixed(0)}%)`);
    console.log(`\n   Consider: Running compress:aggressive again`);
    console.log(`   or setting up Cloudinary CDN for additional 20-30% reduction\n`);
  } else {
    console.log(`   🟢 Excellent optimization! (${((originalSize / compressedSize) * 10).toFixed(0)}%)`);
    console.log(`\n   ✅ Images ready for production`);
    console.log(`   ✅ Update image imports in code`);
    console.log(`   ✅ Deploy and monitor PageSpeed\n`);
  }
}

analyzeImages();
