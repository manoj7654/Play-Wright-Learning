import { test, expect } from "@playwright/test"

const URL = "https://www.bstackdemo.com/"

test.describe("Assignment", () => {

    // hooks

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    })
    
})