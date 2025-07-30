const fs = require('fs');
const path = require('path');

// This script will help optimize images for web deployment
// You'll need to install sharp: npm install sharp

async function optimizeImages() {
  console.log('Image optimization script');
  console.log('To optimize images, install sharp: npm install sharp');
  console.log('Then run: node scripts/optimize-images.js');
  
  const imageDirs = [
    'public/images/concert',
    'public/images/Art',
    'public/images/Automobile',
    'public/images/Commercial theater',
    'public/images/Potraits'
  ];
  
  console.log('\nImage directories found:');
  imageDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      console.log(`${dir}: ${files.length} files`);
    }
  });
}

optimizeImages().catch(console.error);