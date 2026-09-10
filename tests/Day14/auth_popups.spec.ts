import { test, expect } from "@playwright/test";

test.describe('basic auth popups', () => {

    test('Auth pop-up', async ({ browser }) => {

        const context=await browser.newContext({
            httpCredentials:{
                username:'admin',
                password:'admin'
            }
        });
        const page=await context.newPage()
        
        await page.goto('https://the-internet.herokuapp.com/basic_auth');
        //await expect(page.locator('text=Congratulations')).toBeVisible();
        await expect(page.getByText("Congratulations")).toBeVisible()
    })

})