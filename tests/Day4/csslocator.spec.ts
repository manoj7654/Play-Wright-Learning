import { test, expect } from '@playwright/test';
const URL = "https://demowebshop.tricentis.com/";

    // test hooks
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    })

    // tag with Id or Id

    test("CSS with ID", async ({ page }) => {
        await page.locator("#small-searchterms").fill("14.1-inch Laptop");

        await page.locator('[value="Search"]').click();

        await expect(page.locator("[class='product-title'] a")).toHaveText("14.1-inch Laptop");

    })

    test("CSS with Class", async ({ page }) => {
        await page.locator(".search-box-text").fill("14.1-inch Laptop");

        await page.locator('[value="Search"]').click();

        await expect(page.locator("[class='product-title'] a")).toHaveText("14.1-inch Laptop");

    })

    // css with attribute

    test("CSS with Attribute", async ({ page }) => {
        await page.locator('[value="Search store"]').fill("14.1-inch Laptop");

        await page.locator('[value="Search"]').click();

        await expect(page.locator("[class='product-title'] a")).toHaveText("14.1-inch Laptop");

    })

    // css with class attribute

    test("CSS with Class Attribute", async ({ page }) => {
        await page.locator('.search-box-text[name="q"]').fill("14.1-inch Laptop");

        await page.locator('[value="Search"]').click();

        await expect(page.locator("[class='product-title'] a")).toHaveText("14.1-inch Laptop");

    })


