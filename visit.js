const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Otevírám Weathercloud...');
  await page.goto('https://weathercloud.net', { 
    waitUntil: 'networkidle',
    timeout: 60000 
  });
  
  // Počká 10 sekund, aby se stihly odeslat všechny statistiky a načíst data
  await page.waitForTimeout(10000);
  
  console.log('Hotovo, zavírám prohlížeč.');
  await browser.close();
})();
