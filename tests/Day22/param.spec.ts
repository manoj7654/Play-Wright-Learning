import { test, expect } from '@playwright/test';

const searchItem: string[] = ['Laptop', 'Gift Card', 'Smartphone', 'monitor'];

test.describe('Param test', async () => {
    for (let item of searchItem) {
        test(`Search item for ${item}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await expect(page).toHaveTitle('Demo Web Shop');

            await page.locator('#small-searchterms').fill(item);
            await page.locator('.button-1.search-box-button').click();
            await expect(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase:false})
        })

    }
})

