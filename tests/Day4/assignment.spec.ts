import { test, expect } from '@playwright/test';

const URL = "https://demowebshop.tricentis.com/";

test.describe("Assignment", () => {

    // hooks
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    })

    // Open the web page
    test("Open Application", async ({ page }) => {

        await expect(page).toHaveURL(URL);

    })
    // Verify the logo is visible

    test("Very the logo", async ({ page }) => {
        await expect(page.getByAltText("Tricentis Demo Web Shop")).toBeVisible();


    })
    // find product containing computer

    test("Find Product containing computer", async ({ page }) => {
        const count = await page.locator('h2 a[href*="computer"]').count();
        console.log("Containing computer", count)
        //await expect(count).toHaveCount;

        await expect(count);
    })
    // Pring product name

    test("Print product name", async ({ page }) => {
        const product = await page.locator('h2 a[href*="computer"]');
        const count = await product.count();

        // for (let i = 0; i < count; i++) {
        //     console.log(await product.nth(i).innerText())
        // }

    })
    //Print the product start with build


    test("Find product starting with /build", async ({ page }) => {
        const product = await page.locator('h2 a[href^="/build"]');
        const count = await product.count();

        for (let i = 0; i < count; i++) {
            console.log(await product.nth(i).innerText())
        }
        await expect(product).toHaveCount(count)

    })
    // Verify register URL
    test("Verify register URL", async ({ page }) => {
        const url = await page.locator('a[href="/register"]')
        await expect(url).toBeVisible();
    })

    // Verify the las social media link

test("Verify First Social Media Link", async ({ page }) => {
    const element = page.locator('.follow-us > ul > li:last-child');

    const text = await element.innerText();

    console.log("First social media link:", text);

    await expect(element).toHaveText("Google+");
});

test("Verify Second Social Media Link", async ({ page }) => {
    const element = page.locator('.follow-us > ul > li:nth-child(2)');

    const text = await element.innerText();

    console.log("Second social media link:", text);

    await expect(element).toHaveText("Twitter");
});


})