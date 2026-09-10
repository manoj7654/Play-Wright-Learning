import { test, expect } from "@playwright/test";


test('New Window', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();

    const [newWindow] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.getByRole('button', { name: 'New Window' }).click()
        ]
    )
    await page.waitForTimeout(5000)
    await expect(newWindow).toHaveTitle(/Playwright/)
    await expect(newWindow).toHaveURL(/playwright.dev/)

})


