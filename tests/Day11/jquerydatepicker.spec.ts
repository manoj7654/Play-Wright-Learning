import { test, expect, Page } from "@playwright/test";

async function selectDate(page: Page, targetMonth: string, targetYear: string, targetDate: string, isFuture: boolean) {


    while (true) {
        const month = await page.locator('.ui-datepicker-month').innerText();
        const year = await page.locator('.ui-datepicker-year').innerText();

        if (targetMonth === month && targetYear === year) {
            break;

        }
        if (isFuture) {
            await page.locator('.ui-datepicker-next').click()
        } else {
            await page.locator('.ui-datepicker-prev').click()
        }
    }

    const dates = await page.locator('.ui-datepicker-calendar td').all()

    for (const date of dates) {
        const dateText = await date.innerText();

        if (dateText == targetDate) {
            date.click();
            break;
        }
    }
}

test('JQUERY date picker', async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay')
    await expect(page.getByText('AutoPlay')).toBeVisible();

    const dates = page.locator('#datepicker1');
    await dates.click();

    const targetMonth = 'October';
    const targetYear = '2026'
    const targetDate = '15'


    await selectDate(page, targetMonth, targetYear, targetDate, true)

    await page.waitForTimeout(3000)

})
