import puppeteer from 'puppeteer';

async function debugSlides() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1200, height: 800 });
    
    // Navigate to the slides page
    await page.goto('http://localhost:5173/slides/chapter5', { 
        waitUntil: 'networkidle0' 
    });
    
    // Wait a bit for content to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get all slide elements
    const slideInfo = await page.evaluate(() => {
        const slides = Array.from(document.querySelectorAll('*[class*="slide"]'));
        const elements = Array.from(document.querySelectorAll('div'));
        
        const slideElements = elements.filter(el => {
            const rect = el.getBoundingClientRect();
            return rect.height > 200 && rect.width > 500;
        });
        
        return {
            slidesCount: slides.length,
            elementsCount: elements.length,
            slideElements: slideElements.map((el, i) => ({
                index: i,
                className: el.className,
                text: el.textContent.substring(0, 100),
                height: el.getBoundingClientRect().height,
                width: el.getBoundingClientRect().width
            })).filter(slide => slide.height > 200)
        };
    });
    
    console.log('Page Analysis:');
    console.log(`Total slides found: ${slideInfo.slidesCount}`);
    console.log(`Total div elements: ${slideInfo.elementsCount}`);
    console.log('\nPotential slide elements:');
    slideInfo.slideElements.forEach((slide, i) => {
        console.log(`\nSlide ${i + 1}:`);
        console.log(`  Classes: ${slide.className}`);
        console.log(`  Size: ${slide.width}x${slide.height}`);
        console.log(`  Text: ${slide.text}...`);
    });
    
    await browser.close();
}

debugSlides().catch(console.error);