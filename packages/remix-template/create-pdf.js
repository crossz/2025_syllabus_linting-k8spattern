import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createPDF() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Get all slide images
  const slidesDir = path.join(__dirname, 'slides-images');
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(file => file.endsWith('.png'))
    .sort();
  
  console.log(`Creating PDF from ${slideFiles.length} slides...`);
  
  // Add each slide image to the PDF
  for (const [index, slideFile] of slideFiles.entries()) {
    console.log(`Adding slide ${index + 1} of ${slideFiles.length}...`);
    
    const slidePath = path.join(slidesDir, slideFile);
    const slideImageBytes = fs.readFileSync(slidePath);
    
    // Embed the image in the PDF
    const slideImage = await pdfDoc.embedPng(slideImageBytes);
    
    // Get image dimensions
    const { width, height } = slideImage.scale(0.5); // Scale down to fit better
    
    // Add a new page with the image dimensions
    const page = pdfDoc.addPage([width, height]);
    
    // Draw the image on the page
    page.drawImage(slideImage, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }
  
  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, 'chapter4-presentation.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  
  console.log(`PDF created successfully at ${outputPath}`);
}

createPDF().catch(console.error);