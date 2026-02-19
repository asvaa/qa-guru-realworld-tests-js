const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://realworld.qa.guru/login');
  await page.waitForLoadState('networkidle');

  const inputs = await page.locator('input').all();
  for (const input of inputs) {
    const type = await input.getAttribute('type');
    const placeholder = await input.getAttribute('placeholder');
    console.log(`type="${type}" placeholder="${placeholder}"`);
  }

  await browser.close();
})();