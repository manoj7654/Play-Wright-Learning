import { test, expect } from "@playwright/test";

test('JQUERY daterange picker', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay')
    await expect(page.getByText('AutoPlay')).toBeVisible();

    const startDate = page.locator('#start-date')
    const endDate = page.locator("#end-date")
    const button=page.getByRole('button',{name:'Submit'}).nth(1);
    const result=await page.locator('#result')
    await startDate.click();

    await startDate.fill('2026-10-15');
    await endDate.fill('2026-12-10');

    await button.click()

    await expect(result).toBeVisible();

    await expect(startDate).toHaveValue('2026-10-15')
    await expect(endDate).toHaveValue('2026-12-10')
    await page.waitForTimeout(3000)

})
