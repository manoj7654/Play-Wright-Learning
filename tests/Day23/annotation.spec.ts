import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/'

//test.only-->It will run only particula test
//test.skip-->It will skip the particular test and also some condition fail then it will also skip
//test.fixme-->It will also skip if the test is failing while loading

/*
test.skip() Skip test
test.only() Run only selected test
test.describe.only() Run only one group
test.fixme() Known broken feature
test.fail() Expected failure
test.slow() Increase timeout
*/

test('login the page', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click();
    await expect(page).toHaveTitle('Swag Labs')
})

test('Count the product', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click();
    const prodcut = page.locator('.inventory_item')
    await expect(prodcut).toHaveCount(6)
})

//Test3
test('Verify the URL of the page', async ({ page }) => {
    await page.goto(URL);
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/)
})
