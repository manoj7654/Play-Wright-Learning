import { test, expect, chromium } from "@playwright/test";

//Pge fixture
test('Page fixture', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    await page.locator('.ico-register').click();
    await expect(page).toHaveURL(/register/);

})

//2. context Fixture 
test('Context fixture', async ({context}) => {

   const page1=await context.newPage()
   const page2=await context.newPage()

    await page1.goto('https://demowebshop.tricentis.com/');
    await page2.goto('https://www.google.com');
})

//3. browser Fixture 
test('Broser fixture', async ({browser}) => {

    const context1=await browser.newContext();
    const context2=await browser.newContext()

   const page1=await context1.newPage()
   const page2=await context2.newPage()

    await page1.goto('https://demowebshop.tricentis.com/');
    await page2.goto('https://www.google.com');


    await page1.waitForTimeout(5000)
    await page2.waitForTimeout(5000)

})
