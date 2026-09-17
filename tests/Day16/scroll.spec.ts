import { test, expect } from "@playwright/test";

const URL = 'https://www.worldometers.info/geography/flags-of-the-world/'

test('1 Automatic scrolling', async ({ page }) => {
    await page.goto(URL);

    const indFlag = page.getByAltText('Flag of India');

    await expect(indFlag).toBeVisible()
})

test('2 Scroll by Pixel Values', async ({ page }) => {
    await page.goto(URL);

    await page.evaluate(() => {
        window.scrollBy(0, 2000)
    })

    await page.waitForTimeout(5000)
})

test('3 Scroll to a Specific Element', async ({ page }) => {
    await page.goto(URL);
    const indFlag = page.getByAltText('Flag of India');
    await indFlag.scrollIntoViewIfNeeded();

    await expect(indFlag).toBeVisible()

    await page.waitForTimeout(5000)
})

test('4. Scroll to the Bottom of the Page', async ({ page }) => {
    await page.goto(URL);
    await page.evaluate(()=>{
        window.scrollTo(0,document.body.scrollHeight)
    })
    await page.waitForTimeout(5000)
})

test('5. Scroll Back to the Top', async ({ page }) => {
    await page.goto(URL);
    await page.evaluate(()=>{
        window.scrollTo(0,0)
    })
    await page.waitForTimeout(5000)
})

test.only('Count the number of element on the page', async ({ page }) => {
    await page.goto(URL);
    await page.evaluate(()=>{
        window.scrollTo(0,0)
    })
    await page.waitForTimeout(5000)
})

