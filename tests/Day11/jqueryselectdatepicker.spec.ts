import { test, expect, Page } from "@playwright/test";

async function selectDate(
    page: Page,
    targetMonth: string,
    targetYear: string,
    targetDate: string
) {


    const month = await page.locator('.ui-datepicker-month option').all();
    const year = page.locator('.ui-datepicker-year');
    const selectedMonth: string[] = []
    for (let i = 0; i < month.length; i++) {
        selectedMonth.push(await month[i].innerText());
    }
    for (let i = 0; i < selectedMonth.length; i++) {

        if (selectedMonth[i] === targetMonth) {

            await page.locator('.ui-datepicker-month').selectOption(String(i));

            break;
        }
    }

    // Select year
    await year.selectOption({ label: targetYear });

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

    const dates = page.locator('#datepicker2');
    await dates.click();

    const targetMonth = 'Dec';
    const targetYear = '2023'
    const targetDate = '15'


    await selectDate(page, targetMonth, targetYear, targetDate)

    await page.waitForTimeout(3000)

})
