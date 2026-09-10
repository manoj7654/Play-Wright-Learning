import { test, expect } from "@playwright/test";


test('New tab', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();

    const [newTab] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.getByRole('button', { name: 'New Tab' }).click()
        ]
    )
    await page.waitForTimeout(5000)
    await expect(newTab).toHaveTitle(/Playwright/)
    await expect(newTab).toHaveURL(/playwright.dev/)

})


