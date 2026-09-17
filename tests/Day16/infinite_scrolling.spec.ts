import { test, expect } from "@playwright/test";
test('Infinite Scrolling', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();

    const dropDown = page.locator('#scrollable')

    await dropDown.evaluate(async (select: HTMLSelectElement) => {
        while (true) {

            const itemFound = Array.from(select.options).some((option) => option.text === 'Item 500');
            if (itemFound) {
                break;
            }
            select.scrollTop = select.scrollHeight
            await new Promise((resolve) => setTimeout(resolve, 100))
        }

    })

    await dropDown.selectOption({ label: 'Item 500' });

    await expect(dropDown).toHaveValue('Item 500')

})


