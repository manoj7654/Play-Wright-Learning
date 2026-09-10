import { test, expect, chromium } from "@playwright/test";


//chrome Fixture 
test('Chrome fixture', async () => {

    //created chromium browser
    const chrome = await chromium.launch()

    //created context
    const context = await chrome.newContext();

    //created page
    const page = await context.newPage();

    await page.goto('https://demowebshop.tricentis.com/');
    await page.locator('.ico-login').click();
    await expect(page).toHaveURL(/login/)
    await page.waitForTimeout(5000)
})

