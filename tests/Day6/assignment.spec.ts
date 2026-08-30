import { test, expect } from "@playwright/test"

const URL = "https://sdetqa.vercel.app/autoplay"

test.describe("Assignment", () => {

    // hooks

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    })
    // When click on forms button on navbar it should be redirect to particalr page and show text

    test('data entry form should be visible', async ({ page }) => {
        const form = page.getByRole('listitem').nth(1);
        await form.click();
        await expect(page.getByText('Data Entry Form')).toBeVisible();
        await expect(page).toHaveURL('https://sdetqa.vercel.app/autoplay#forms')

    })

        // When click on table button on navbar it should be redirect to particalr page and show text

    test('table should be visible', async ({ page }) => {
        const table = page.getByRole('listitem').nth(2);
        const text = page.getByText('Static Web Table')
        await table.click();
        await expect(text).toBeVisible();
        await expect(page).toHaveURL('https://sdetqa.vercel.app/autoplay#tables')

        // await page.waitForTimeout(5000)

    })

    // When click on popups button on navbar it should be redirect to particalr page and show text

    test('Popups should be visible', async ({ page }) => {
        const table = page.getByRole('listitem').nth(3);
        const popups = page.getByText('Alerts')
        await table.click();
        await expect(popups).toBeVisible();
        await expect(page).toHaveURL('https://sdetqa.vercel.app/autoplay#popups')

        // await page.waitForTimeout(5000)

    })

    // When click on file button on navbar it should be redirect to particalr page and show text

    test('Files should be visible', async ({ page }) => {
        const table = page.getByRole('listitem').nth(4);
        const files = page.getByText('File Upload')
        await table.click();
        await expect(files).toBeVisible();
        await expect(page).toHaveURL('https://sdetqa.vercel.app/autoplay#files')

        //await page.waitForTimeout(5000)

    })

    // When click on advance button on navbar it should be redirect to particalr page and show text
    test('Advance should be visible', async ({ page }) => {
        const table = page.getByRole('listitem').last();
        const advance = page.getByText(' Interactive Tooltip')
        await table.click();
        await expect(advance).toBeVisible();
        await expect(page).toHaveURL('https://sdetqa.vercel.app/autoplay#advanced')

        await page.waitForTimeout(5000)

    })


})