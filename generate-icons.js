const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


const generateIcon = async () => {
  try {
    const svgBuffer = fs.readFileSync(path.join(__dirname, 'public', 'favicon.svg'));
    
    const sizes = [192, 512];
    
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, 'public', `logo${size}.png`));
      
      console.log(`Generated logo${size}.png`);
    }

    // png works ??
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon.ico'));
    
    console.log('Generated favicon.ico');
    console.log('All icons generated successfully!');
    
  } catch (error) {
    console.error('Error generating icons:', error);
  }
};

generateIcon();
