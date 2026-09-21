import { test, expect } from "@playwright/test";

test('Handle Nested Frame', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();

    const outerFrame=page.locator('iframe').first().contentFrame();

    const innerFrame=outerFrame.frameLocator('iframe').locator('#innerInput');
    await innerFrame.fill("Manoj")

    await expect(innerFrame).toHaveValue('Manoj')

 await page.waitForTimeout(5000)
})

test('External ifram loads the expected URL',async({page})=>{
     await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();
    
    const outerFrame=page.locator('iframe').nth(1);
    await expect(outerFrame).toHaveAttribute('src','https://playwright.dev/')

    const innerFrame=outerFrame.contentFrame()
    await expect(innerFrame.getByAltText('Playwright logo').first()).toBeVisible()
})