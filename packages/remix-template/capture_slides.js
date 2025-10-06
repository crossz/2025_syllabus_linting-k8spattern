import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function captureSlides() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set viewport size for slides
    await page.setViewport({ width: 1200, height: 800 });
    
    // Navigate to the slides page
    await page.goto('http://localhost:5173/slides/chapter5', { 
        waitUntil: 'networkidle0' 
    });
    
    // Wait for slides to load
    await page.waitForSelector('.mb-16.scroll-mt-24', { timeout: 10000 });
    
    // Create screenshots directory
    const screenshotsDir = './screenshots';
    try {
        await fs.access(screenshotsDir);
    } catch {
        await fs.mkdir(screenshotsDir);
    }
    
    console.log('Starting to capture screenshots...');
    
    // Get all slide containers
    const slideContainers = await page.$$('.mb-16.scroll-mt-24');
    console.log(`Found ${slideContainers.length} slide containers`);
    
    // Function to capture individual slide
    const captureSlide = async (slideNumber) => {
        console.log(`Capturing slide ${slideNumber}...`);
        
        try {
            // Scroll to the slide
            await page.evaluate((slideNum) => {
                const slides = document.querySelectorAll('.mb-16.scroll-mt-24');
                if (slides[slideNum - 1]) {
                    slides[slideNum - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, slideNumber);
            
            // Wait for scroll to complete and page to settle
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Capture screenshot of the specific slide container
            const slideElement = await page.$(`div.mb-16.scroll-mt-24:nth-of-type(${slideNumber})`);
            
            if (slideElement) {
                const screenshotPath = path.join(screenshotsDir, `slide-${slideNumber}.png`);
                await slideElement.screenshot({ 
                    path: screenshotPath,
                    type: 'png'
                });
                console.log(`✓ Slide ${slideNumber} captured`);
                return true;
            } else {
                console.log(`✗ Slide ${slideNumber} not found`);
                return false;
            }
        } catch (error) {
            console.log(`✗ Error capturing slide ${slideNumber}:`, error.message);
            return false;
        }
    };
    
    // Capture all 20 slides
    for (let i = 1; i <= 20; i++) {
        await captureSlide(i);
    }
    
    console.log('All screenshots captured!');
    
    await browser.close();
}

// Run the capture function
captureSlides().catch(console.error);