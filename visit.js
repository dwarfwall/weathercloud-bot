const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'cs-CZ'
  });

  const page = await context.newPage();
  
  // Skryje příznak robota (webdriver)
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  console.log('Otevírám Weathercloud jako běžný uživatel...');
  await page.goto('https://weathercloud.net', { 
    waitUntil: 'networkidle',
    timeout: 60000 
  });
  
  // Nasimuluje pohyb myší a počká 15 sekund
  await page.mouse.move(300, 400);
  await page.waitForTimeout(15000);
  
  console.log('Hotovo.');
  await browser.close();
})();
