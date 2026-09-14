import { test, expect } from "@playwright/test";

test('Open PDF', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();

    const [openPDF]=await Promise.all([
        page.context().waitForEvent('page'),
        page.locator('button',{hasText:'Open PDF'}).click()
    ])

    expect(openPDF).toBeTruthy();
    await page.waitForTimeout(5000)
    //await page.close();
    
})



