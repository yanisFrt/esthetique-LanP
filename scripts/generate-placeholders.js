#!/usr/bin/env node

/**
 * Blur Placeholder Generator
 *
 * Generates tiny blur-up placeholders (data URIs) for every image
 * Shows during lazy loading for better perceived performance
 *
 * Creates JSON file with data URIs for all images
 * Usage in components:
 * <img placeholder={placeholders['hero-home']} blurDataURL={...} />
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const ASSETS_DIR = path.join(__dirname, "../src/assets");
const OUTPUT_FILE = path.join(__dirname, "../src/utils/image-placeholders.json");

const imageFiles = fs
  .readdirSync(ASSETS_DIR)
  .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

console.log(`
╔════════════════════════════════════════════════╗
║   🎨 Generating Blur Placeholders             ║
╚════════════════════════════════════════════════╝
`);

const placeholders = {};

async function generatePlaceholder(filename) {
  const inputPath = path.join(ASSETS_DIR, filename);
  const nameWithoutExt = path.basename(filename, path.extname(filename));

  try {
    console.log(`📸 Processing: ${filename}...`);

    // Create tiny blurred version (10px width)
    const buffer = await sharp(inputPath)
      .resize(10, 10, {
        fit: "cover",
        position: "center",
      })
      .blur(5) // Heavy blur for smooth effect
      .jpeg({ quality: 50 })
      .toBuffer();

    // Convert to data URI
    const base64 = buffer.toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64}`;

    placeholders[nameWithoutExt] = {
      dataUri,
      size: dataUri.length,
    };

    console.log(`   ✅ Placeholder created (${dataUri.length} bytes)`);
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
  }
}

async function main() {
  for (const file of imageFiles) {
    await generatePlaceholder(file);
  }

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(placeholders, null, 2));

  console.log(`\n✨ Placeholders generated!`);
  console.log(`📁 Output: ${OUTPUT_FILE}`);
  console.log(`\n💡 Usage in components:`);
  console.log(`
import { imagePlaceholders } from '@/utils/image-placeholders';

<img
  src={imagePath}
  placeholder="blur"
  blurDataURL={imagePlaceholders['hero-home'].dataUri}
  alt="..."
/>
  `);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
