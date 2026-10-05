import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1280x800', width: 1280, height: 800 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '390x844', width: 390, height: 844 },
  { name: '360x740', width: 360, height: 740 },
];

const OUTPUT_DIR = path.resolve('C:/Users/acer/.gemini/antigravity-ide/brain/2a7d95d6-ce6a-4dfa-8a8b-0f71fa8543f5/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  const browser = await chromium.launch();
  console.log('Capturing responsive screenshots for redesigned SPAN Studio website...');

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Check for horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log(`[Viewport ${vp.name}] Inner width: ${vp.width}px, Scroll width: ${scrollWidth}px, Overflow: ${overflow}`);

    // Capture Hero fold screenshot
    const heroShotPath = path.join(OUTPUT_DIR, `hero-${vp.name}.png`);
    await page.screenshot({ path: heroShotPath, fullPage: false });
    console.log(`Saved hero screenshot: ${heroShotPath}`);

    // Capture Full page screenshot for 1920, 768, and 390
    if (['1920x1080', '768x1024', '390x844'].includes(vp.name)) {
      const fullShotPath = path.join(OUTPUT_DIR, `fullpage-${vp.name}.png`);
      await page.screenshot({ path: fullShotPath, fullPage: true });
      console.log(`Saved fullpage screenshot: ${fullShotPath}`);
    }

    // Capture contact page screenshot
    if (['1920x1080', '390x844'].includes(vp.name)) {
      await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(800);
      const contactShotPath = path.join(OUTPUT_DIR, `contact-${vp.name}.png`);
      await page.screenshot({ path: contactShotPath, fullPage: false });
      console.log(`Saved contact screenshot: ${contactShotPath}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
}

run().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
