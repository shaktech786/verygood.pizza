const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputPath = path.join(__dirname, '../public/logo.png');
const outputDir = path.join(__dirname, '../public');

async function generateFavicons() {
  try {
    // Generate 32x32 favicon.ico (standard size)
    await sharp(inputPath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'favicon-32x32.png'));

    // Generate 16x16 favicon
    await sharp(inputPath)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'favicon-16x16.png'));

    // Generate 180x180 apple-touch-icon
    await sharp(inputPath)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    console.log('✅ Favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
