import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function captureSlides() {
  console.log('启动浏览器...');
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // 设置视口大小
    await page.setViewport({ width: 1920, height: 1080 });
    
    // 访问页面
    console.log('访问页面...');
    await page.goto('http://localhost:5175/slides/chapter5', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // 等待页面加载完成
    await page.waitForSelector('.bg-white', { timeout: 10000 });
    
    // 创建截图目录
    const screenshotDir = './slides-screenshots';
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    console.log('开始截取每个slide...');
    
    // 截取每个slide
    for (let i = 1; i <= 20; i++) {
      console.log(`截取第 ${i} 个slide...`);
      
      // 滚动到对应的slide
      await page.evaluate((slideNumber) => {
        const slides = document.querySelectorAll('.mb-16');
        if (slides[slideNumber - 1]) {
          slides[slideNumber - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, i);
      
      // 等待滚动完成
      await page.waitForTimeout(1000);
      
      // 获取slide的主干部分
      const slideScreenshot = await page.evaluate((slideNumber) => {
        const slides = document.querySelectorAll('.mb-16');
        const slide = slides[slideNumber - 1];
        
        if (slide) {
          // 获取slide中的白色卡片内容
          const card = slide.querySelector('.bg-white');
          if (card) {
            const rect = card.getBoundingClientRect();
            return {
              x: rect.left + window.scrollX,
              y: rect.top + window.scrollY,
              width: rect.width,
              height: rect.height
            };
          }
        }
        return null;
      }, i);
      
      if (slideScreenshot) {
        // 截取slide区域
        await page.screenshot({
          path: path.join(screenshotDir, `slide-${i}.png`),
          clip: slideScreenshot,
          quality: 90
        });
        
        console.log(`第 ${i} 个slide截图完成`);
      } else {
        console.log(`第 ${i} 个slide未找到`);
      }
      
      // 短暂延迟，确保页面稳定
      await page.waitForTimeout(500);
    }
    
    console.log('所有slide截图完成！');
    
    // 创建PDF
    await createPDF(screenshotDir);
    
  } catch (error) {
    console.error('截图过程中发生错误:', error);
  } finally {
    await browser.close();
    console.log('浏览器已关闭');
  }
}

async function createPDF(screenshotDir) {
  console.log('开始生成PDF...');
  
  // 检查是否安装了必要的库
  try {
    const { PDFDocument } = await import('pdf-lib');
    
    const pdfDoc = await PDFDocument.create();
    
    // 按顺序添加每个slide截图到PDF
    for (let i = 1; i <= 20; i++) {
      const imagePath = path.join(screenshotDir, `slide-${i}.png`);
      
      if (fs.existsSync(imagePath)) {
        console.log(`添加第 ${i} 个slide到PDF...`);
        
        const imageBytes = fs.readFileSync(imagePath);
        const image = await pdfDoc.embedPng(imageBytes);
        const page = pdfDoc.addPage();
        
        // 设置页面尺寸为A4
        const { width, height } = page.getSize();
        const imageDims = image.scaleToFit(width, height);
        
        // 将图片居中放置在页面中
        page.drawImage(image, {
          x: (width - imageDims.width) / 2,
          y: (height - imageDims.height) / 2,
          width: imageDims.width,
          height: imageDims.height,
        });
      }
    }
    
    // 保存PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('./chapter5-slides.pdf', pdfBytes);
    
    console.log('PDF生成完成: chapter5-slides.pdf');
    
  } catch (error) {
    console.error('生成PDF时发生错误:', error);
    console.log('建议安装 pdf-lib: npm install pdf-lib');
  }
}

// 运行截图脚本
captureSlides().catch(console.error);