import { test, expect } from '@playwright/test';
import fs from 'fs';

const filePath='./tablepagination.txt';

if(fs.existsSync(filePath)){
    fs.unlinkSync(filePath);
}


test('Table Pagination Validation', async ({ page }) => {

    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

    const tableRowLocator = page.locator('#example tbody tr');
    const nextButton = page.getByRole('link', { name: 'Next' });

    let hasNextPage = true;
    let pageCount = 1;

    while (hasNextPage) {
        await tableRowLocator.first().waitFor({ state: 'visible' });

        const rows = await tableRowLocator.all();
        let pageDataSting = `......Page ${pageCount}.....\n`;
        for (const row of rows) {
            const cell = await row.locator('td').allTextContents();
            if (cell.length > 0) {
                pageDataSting += cell.join(', ') + '\n';

            }
        }

        fs.appendFileSync(filePath, pageDataSting);

        if (await nextButton.isVisible() && await nextButton.isEnabled()) {
            await nextButton.click();
            pageCount++;
            await page.waitForTimeout(5000); // Wait for the next page to load
        } else {
            console.log('Reached the last page');
            hasNextPage = false;
        }

    }


})