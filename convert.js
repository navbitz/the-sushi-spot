import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = path.join(process.cwd(), 'public/img');

async function convertImages() {
  try {
    const files = fs.readdirSync(directoryPath);
    
    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.png') {
        const inputPath = path.join(directoryPath, file);
        const outputPath = path.join(directoryPath, path.basename(file, '.png') + '.webp');
        
        console.log(`Converting ${file} to webp...`);
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        // Remove the original .png
        fs.unlinkSync(inputPath);
      }
    }
    console.log('Conversion complete!');
  } catch (err) {
    console.error('Error converting images:', err);
  }
}

convertImages();
