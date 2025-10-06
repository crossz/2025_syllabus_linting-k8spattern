import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function captureSlides() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // 设置视口大小
    await page.setViewport({ width: 1920, height: 1080 });
    
    // 访问目标页面
    console.log('正在访问页面...');
    await page.goto('http://localhost:5173/slides/chapter789', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // 等待页面加载完成
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 查找所有section元素
    console.log('正在查找section元素...');
    const sections = await page.$$eval('section, .slide, .section, [class*="slide"], [class*="section"]', 
      (elements) => {
        return elements.map((el, index) => {
          const rect = el.getBoundingClientRect();
          return {
            index,
            tagName: el.tagName,
            className: el.className,
            id: el.id,
            rect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            }
          };
        });
      }
    );

    console.log(`找到 ${sections.length} 个section元素`);

    // 如果没有找到section，截图整个页面
    if (sections.length === 0) {
      console.log('未找到section元素，将截图整个页面...');
      const screenshotPath = path.join(process.cwd(), 'screenshots', 'full-page.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      sections.push({ index: 0, rect: { x: 0, y: 0, width: 1920, height: await page.evaluate(() => document.body.scrollHeight) } });
    }

    // 创建截图目录
    const screenshotDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // 对每个section进行截图
    const screenshotPaths = [];
    
    for (const section of sections) {
      console.log(`正在截图第 ${section.index + 1} 个section...`);
      
      // 滚动到该section
      await page.evaluate((y) => {
        window.scrollTo(0, y);
      }, section.rect.y);
      
      await new Promise(resolve => setTimeout(resolve, 500));

      // 截图section区域
      const screenshotPath = path.join(screenshotDir, `slide-${section.index + 1}.png`);
      await page.screenshot({
        path: screenshotPath,
        clip: {
          x: section.rect.x,
          y: section.rect.y,
          width: Math.min(section.rect.width, 1920),
          height: Math.min(section.rect.height, 2000)
        }
      });

      screenshotPaths.push(screenshotPath);
      console.log(`已保存: ${screenshotPath}`);
    }

    // 生成PDF
    console.log('正在生成PDF...');
    await generatePDF(screenshotPaths);

    console.log('完成！PDF已生成在 slides.pdf');

  } catch (error) {
    console.error('截图过程中出现错误:', error);
  } finally {
    await browser.close();
  }
}

async function generatePDF(screenshotPaths) {
  const pdfDoc = await PDFDocument.create();

  for (const imagePath of screenshotPaths) {
    if (fs.existsSync(imagePath)) {
      const imageBytes = fs.readFileSync(imagePath);
      
      // 获取图片尺寸
      const { width, height } = await getImageDimensions(imagePath);
      
      // 创建PDF页面
      const page = pdfDoc.addPage([width, height]);
      
      // 嵌入图片
      let image;
      if (imagePath.endsWith('.png')) {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        image = await pdfDoc.embedJpg(imageBytes);
      }
      
      // 绘制图片
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    }
  }

  // 保存PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('slides-chapter789.pdf', pdfBytes);
}

async function getImageDimensions(imagePath) {
  // 简单的图片尺寸获取（假设图片分辨率）
  return { width: 1920, height: 1080 };
}

// 运行脚本
captureSlides().catch(console.error);