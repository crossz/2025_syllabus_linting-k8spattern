import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pptxgen from 'pptxgenjs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createPPT() {
  // Create a new presentation
  const pptx = new pptxgen();
  
  // Set presentation properties
  pptx.title = 'Kubernetes Patterns - Chapter 4: Health Probe';
  pptx.author = 'Bilgin Ibryam & Roland Huß';
  
  // Get all slide images
  const slidesDir = path.join(__dirname, 'slides-images');
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(file => file.endsWith('.png'))
    .sort();
  
  console.log(`Creating PPT from ${slideFiles.length} slides...`);
  
  // Add each slide image to the presentation
  for (const [index, slideFile] of slideFiles.entries()) {
    console.log(`Adding slide ${index + 1} of ${slideFiles.length}...`);
    
    const slidePath = path.join(slidesDir, slideFile);
    
    // Add a new slide
    const slide = pptx.addSlide();
    
    // Add the image to the slide
    slide.addImage({
      path: slidePath,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%'
    });
  }
  
  // Save the presentation
  const outputPath = path.join(__dirname, 'chapter4-presentation.pptx');
  await pptx.writeFile(outputPath);
  
  console.log(`PPT created successfully at ${outputPath}`);
}

createPPT().catch(console.error);