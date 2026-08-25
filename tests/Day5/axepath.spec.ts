import { test, expect } from "@playwright/test";

const URL = "https://demowebshop.tricentis.com/";


test.describe("Axe Pathe locators", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(URL);
    })


    test("finding logo", async ({ page }) => {
        const logo = page.locator("//img[@alt='Tricentis Demo Web Shop']");
        await expect(logo).toBeVisible();

    })

    test("Search Box", async ({ page }) => {
        const search = page.locator("//input[@id='small-searchterms']");
        await expect(search).toBeVisible();

    })

    test("Find product", async ({ page }) => {
        const product = await page.locator("//h2//a[contains(@href,'computer')]");
        const ProductCount = await product.count();
        expect(ProductCount).toBeGreaterThan(0)
        console.log(await product.allTextContents())
    })
    // Multiple attributes

    test("Verify login url", async ({ page }) => {

        const login = page.locator('//li//a[@href="/login" and @class="ico-login"]');
        await expect(login).toHaveText("Log in")

    })

    // start with
    test("Verify product", async ({ page }) => {

        const product = page.locator("//h2//a[starts-with(@href,'/build')]");
        const pr = await product.count();

        await expect(pr).toBe(3);

    })
    // text function
    test("Verify text function", async ({ page }) => {

        const product = page.locator("//a[text()='Log in']");
        await expect(product).toHaveText("Log in")

    })

    // using last functin

    test("Verify last function", async ({ page }) => {

        const product = page.locator("//div[@class='column follow-us']//ul//li[last()]");
        await expect(product).toHaveText("Google+")

    })

    // position function
    test("Verify position function", async ({ page }) => {

        const position = page.locator("//div[@class='column follow-us']//ul//li[position()=2]");
        await expect(position).toHaveText("Twitter")

    })
})