import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
    console.log('Starting PDF generation...');
    
    const screenshotsDir = './screenshots';
    const outputPath = './chapter5_slides.pdf';
    
    try {
        // Check if screenshots directory exists
        await fs.access(screenshotsDir);
        
        // Get all screenshot files
        const files = await fs.readdir(screenshotsDir);
        const screenshotFiles = files
            .filter(file => file.startsWith('slide-') && file.endsWith('.png'))
            .sort((a, b) => {
                const numA = parseInt(a.match(/slide-(\d+)\.png/)[1]);
                const numB = parseInt(b.match(/slide-(\d+)\.png/)[1]);
                return numA - numB;
            });
        
        console.log(`Found ${screenshotFiles.length} screenshots`);
        
        if (screenshotFiles.length === 0) {
            throw new Error('No screenshot files found');
        }
        
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        
        // Add each slide as a page in the PDF
        for (let i = 0; i < screenshotFiles.length; i++) {
            const filePath = path.join(screenshotsDir, screenshotFiles[i]);
            console.log(`Processing slide ${i + 1}...`);
            
            try {
                // Read the screenshot file
                const imageBuffer = await fs.readFile(filePath);
                
                // Convert to JPEG for better PDF compatibility
                const jpegBuffer = await sharp(imageBuffer)
                    .jpeg({ quality: 90 })
                    .toBuffer();
                
                // Embed the image in the PDF
                const jpegImage = await pdfDoc.embedJpg(jpegBuffer);
                
                // Create a new page with the same dimensions as the image
                const page = pdfDoc.addPage([jpegImage.width, jpegImage.height]);
                
                // Draw the image on the page
                page.drawImage(jpegImage, {
                    x: 0,
                    y: 0,
                    width: jpegImage.width,
                    height: jpegImage.height,
                });
                
                console.log(`✓ Slide ${i + 1} added to PDF`);
            } catch (error) {
                console.log(`✗ Error processing slide ${i + 1}:`, error.message);
            }
        }
        
        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        await fs.writeFile(outputPath, pdfBytes);
        
        console.log(`✓ PDF generated successfully: ${outputPath}`);
        console.log(`Total pages: ${pdfDoc.getPageCount()}`);
        
    } catch (error) {
        console.log('✗ Error generating PDF:', error.message);
    }
}

// Run the PDF generation
generatePDF().catch(console.error);