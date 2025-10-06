import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureSlides() {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to capture full slides
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Navigate to the slides page
  await page.goto('http://localhost:5173/slides/chapter4', { 
    waitUntil: 'networkidle2',
    timeout: 60000 
  });
  
  // Wait for the page to load completely
  await page.waitForSelector('.slide-container', { timeout: 60000 });
  
  // Get the total number of slides
  const totalSlides = 20;
  
  console.log(`Capturing ${totalSlides} slides...`);
  
  // Create output directory if it doesn't exist
  const outputDir = path.join(__dirname, 'slides-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Capture each slide
  for (let i = 1; i <= totalSlides; i++) {
    console.log(`Capturing slide ${i} of ${totalSlides}...`);
    
    // Scroll to the slide element
    const slideSelector = `.mb-16:nth-child(${i}) .slide-container`;
    
    try {
      // Wait for the slide to be visible
      await page.waitForSelector(slideSelector, { timeout: 10000 });
      
      // Get the bounding box of the slide
      const slideElement = await page.$(slideSelector);
      if (slideElement) {
        const boundingBox = await slideElement.boundingBox();
        if (boundingBox) {
          // Take screenshot of just the slide element
          const outputPath = path.join(outputDir, `slide-${i.toString().padStart(2, '0')}.png`);
          await slideElement.screenshot({ path: outputPath });
          console.log(`Saved slide ${i} to ${outputPath}`);
        } else {
          console.log(`Could not get bounding box for slide ${i}`);
        }
      } else {
        console.log(`Could not find element for slide ${i}`);
        // Take a full page screenshot as fallback
        const outputPath = path.join(outputDir, `slide-${i.toString().padStart(2, '0')}.png`);
        await page.screenshot({ path: outputPath, fullPage: true });
        console.log(`Saved full page screenshot for slide ${i} to ${outputPath}`);
      }
    } catch (error) {
      console.log(`Error capturing slide ${i}:`, error.message);
      // Take a full page screenshot as fallback
      const outputPath = path.join(outputDir, `slide-${i.toString().padStart(2, '0')}.png`);
      await page.screenshot({ path: outputPath, fullPage: true });
      console.log(`Saved full page screenshot for slide ${i} to ${outputPath}`);
    }
    
    // If not the last slide, try to click next button
    if (i < totalSlides) {
      try {
        // Try to click the next button if it exists
        const nextButton = await page.$('button:has-text("下一页")');
        if (nextButton) {
          await nextButton.click();
          await page.waitForTimeout(2000); // Wait for transition
        }
      } catch (error) {
        console.log(`Could not navigate to next slide: ${error.message}`);
      }
    }
  }
  
  console.log('Finished capturing all slides');
  await browser.close();
}

captureSlides().catch(console.error);