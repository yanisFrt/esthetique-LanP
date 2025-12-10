#!/usr/bin/env node

import path from "path";
import fs from "fs";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ASSETS_DIR = path.join(__dirname, "../src/assets");
const COMPRESSED_DIR = path.join(__dirname, "../public/images");

if (!fs.existsSync(COMPRESSED_DIR)) {
  fs.mkdirSync(COMPRESSED_DIR, { recursive: true });
}

const imageFiles = fs
  .readdirSync(ASSETS_DIR)
  .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     🚀 AGGRESSIVE IMAGE COMPRESSION FOR MAXIMUM SPEED        ║
╚═══════════════════════════════════════════════════════════════╝
`);

console.log(`📦 Found ${imageFiles.length} images to compress\n`);

let processed = 0;
let totalOriginal = 0;
let totalCompressed = 0;

const BREAKPOINTS = [
  { width: 640, suffix: "-sm", label: "Mobile" },
  { width: 1024, suffix: "-md", label: "Tablet" },
  { width: 1920, suffix: "-lg", label: "Desktop" },
];

async function compressImage(filename) {
  const inputPath = path.join(ASSETS_DIR, filename);
  const fileStats = fs.statSync(inputPath);
  const fileSizeKB = (fileStats.size / 1024).toFixed(2);
  const fileSizeMB = (fileStats.size / 1024 / 1024).toFixed(2);

  totalOriginal += fileStats.size;

  console.log(`\n${"═".repeat(60)}`);
  console.log(`📸 Processing: ${filename}`);
  console.log(`   Original: ${fileSizeMB}MB (${fileSizeKB}KB)`);
  console.log(`${"─".repeat(60)}`);

  const ext = path.extname(filename).toLowerCase();
  const nameWithoutExt = path.basename(filename, ext);

  try {
    const metadata = await sharp(inputPath).metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;

    console.log(`   Dimensions: ${width}x${height}px`);

    const formats = ["jpeg", "webp", "avif"];

    for (const format of formats) {
      for (const breakpoint of BREAKPOINTS) {
        if (width <= breakpoint.width) {
          continue;
        }

        const filename_variant = `${nameWithoutExt}${breakpoint.suffix}.${
          format === "jpeg" ? "jpg" : format
        }`;
        const outputPath = path.join(COMPRESSED_DIR, filename_variant);

        let pipeline = sharp(inputPath).resize(breakpoint.width, null, {
          withoutEnlargement: true,
          fit: "outside",
        });

        if (format === "jpeg") {
          pipeline = pipeline.jpeg({
            quality: 75,
            progressive: true,
          });
        } else if (format === "webp") {
          pipeline = pipeline.webp({ quality: 70 });
        } else if (format === "avif") {
          pipeline = pipeline.avif({ quality: 65 });
        }

        await pipeline.toFile(outputPath);

        const newStats = fs.statSync(outputPath);
        const newSizeKB = (newStats.size / 1024).toFixed(2);
        const reduction = (((fileStats.size - newStats.size) / fileStats.size) * 100).toFixed(1);

        totalCompressed += newStats.size;

        console.log(
          `   ✅ ${format.toUpperCase().padEnd(5)} ${breakpoint.label.padEnd(7)}: ${newSizeKB}KB (${reduction}% smaller)`
        );
      }
    }

    const originalFormats = ["jpeg", "webp", "avif"];
    for (const format of originalFormats) {
      const filename_orig = `${nameWithoutExt}.${format === "jpeg" ? "jpg" : format}`;
      const outputPath = path.join(COMPRESSED_DIR, filename_orig);

      let pipeline = sharp(inputPath);

      if (format === "jpeg") {
        pipeline = pipeline.jpeg({
          quality: 80,
          progressive: true,
        });
      } else if (format === "webp") {
        pipeline = pipeline.webp({ quality: 75 });
      } else if (format === "avif") {
        pipeline = pipeline.avif({ quality: 70 });
      }

      await pipeline.toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSizeKB = (newStats.size / 1024).toFixed(2);
      const reduction = (((fileStats.size - newStats.size) / fileStats.size) * 100).toFixed(1);

      totalCompressed += newStats.size;

      console.log(
        `   ✅ ${format.toUpperCase().padEnd(5)} ${"Full".padEnd(7)}: ${newSizeKB}KB (${reduction}% smaller)`
      );
    }

    processed++;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
}

async function main() {
  for (const file of imageFiles) {
    await compressImage(file);
  }

  const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(2);
  const totalCompressedMB = (totalCompressed / 1024 / 1024).toFixed(2);
  const totalReduction = (((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1);

  console.log(`\n${"═".repeat(60)}`);
  console.log(`\n✨ COMPRESSION COMPLETE!`);
  console.log(`\n📊 Results Summary:`);
  console.log(`   Original Total   : ${totalOriginalMB}MB`);
  console.log(`   Compressed Total : ${totalCompressedMB}MB`);
  console.log(`   Total Reduction  : ${totalReduction}% 🎉`);
  console.log(`\n📁 Output Directory: ${COMPRESSED_DIR}`);
  console.log(`\n💡 Next Steps:`);
  console.log(`   1. Review compressed images in: ${COMPRESSED_DIR}`);
  console.log(`   2. Copy to src/assets if satisfied`);
  console.log(`   3. Update image imports in components`);
  console.log(`   4. Deploy and measure performance improvement\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
