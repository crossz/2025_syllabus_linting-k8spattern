import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function captureSlides() {
  console.log('🚀 启动截图脚本...');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // 设置视口大小
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log('📄 访问页面...');
    await page.goto('http://localhost:5173/slides/chapter5', { 
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
    
    console.log('📸 开始截取每个slide...');
    
    const slidesData = [];
    
    // 截取每个slide
    for (let i = 1; i <= 20; i++) {
      console.log(`  截取第 ${i} 个slide...`);
      
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
              x: Math.max(rect.left + window.scrollX - 10, 0),
              y: Math.max(rect.top + window.scrollY - 10, 0),
              width: rect.width + 20,
              height: rect.height + 20
            };
          }
        }
        return null;
      }, i);
      
      if (slideScreenshot) {
        // 截取slide区域
        const screenshotPath = path.join(screenshotDir, `slide-${String(i).padStart(2, '0')}.png`);
        await page.screenshot({
          path: screenshotPath,
          clip: slideScreenshot,
          quality: 90
        });
        
        slidesData.push({
          number: i,
          path: screenshotPath,
          title: `Slide ${i}`
        });
        
        console.log(`  ✅ 第 ${i} 个slide截图完成`);
      } else {
        console.log(`  ❌ 第 ${i} 个slide未找到`);
      }
      
      // 短暂延迟，确保页面稳定
      await page.waitForTimeout(500);
    }
    
    console.log('✅ 所有slide截图完成！');
    
    // 创建PDF
    await createPDF(slidesData);
    
  } catch (error) {
    console.error('❌ 截图过程中发生错误:', error);
  } finally {
    await browser.close();
    console.log('🔌 浏览器已关闭');
  }
}

async function createPDF(slidesData) {
  console.log('📄 开始生成PDF...');
  
  try {
    const { PDFDocument } = await import('pdf-lib');
    const pdfDoc = await PDFDocument.create();
    
    // 按顺序添加每个slide截图到PDF
    for (const slide of slidesData) {
      if (fs.existsSync(slide.path)) {
        console.log(`   添加 ${slide.path} 到PDF...`);
        
        const imageBytes = fs.readFileSync(slide.path);
        const image = await pdfDoc.embedPng(imageBytes);
        const page = pdfDoc.addPage([800, 600]); // 自定义页面尺寸
        
        // 将图片缩放以适应页面
        const { width, height } = page.getSize();
        const imageDims = image.scaleToFit(width, height);
        
        // 将图片居中放置在页面中
        page.drawImage(image, {
          x: (width - imageDims.width) / 2,
          y: (height - imageDims.height) / 2,
          width: imageDims.width,
          height: imageDims.height,
        });
        
        // 添加页码
        page.drawText(`Slide ${slide.number}`, {
          x: 50,
          y: 30,
          size: 12,
        });
      }
    }
    
    // 保存PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('./chapter5-slides.pdf', pdfBytes);
    
    console.log('✅ PDF生成完成: chapter5-slides.pdf');
    console.log(`📊 共生成 ${slidesData.length} 个slides的PDF文件`);
    
  } catch (error) {
    console.error('❌ 生成PDF时发生错误:', error);
    
    // 如果PDF生成失败，提供备选方案
    console.log('💡 备选方案：您可以使用以下命令手动创建PDF：');
    console.log('   # 使用ImageMagick（如果已安装）：');
    console.log('   convert slides-screenshots/slide-*.png chapter5-slides.pdf');
    console.log('   ');
    console.log('   # 或者使用系统预览工具打开图片并导出为PDF');
  }
}

// 运行截图脚本
captureSlides().catch(console.error);