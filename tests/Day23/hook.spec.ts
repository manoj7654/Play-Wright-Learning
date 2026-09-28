import { test, expect } from '@playwright/test';

const URL = 'https://www.saucedemo.com/'

// Run once befor all test

test.beforeAll(async () => {
    console.log('Test execution started')
})

// Run once after all test
test.afterAll(async () => {
    console.log('Test execution completed')
})

// Run before each test
test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click();
    console.log('Login Completed')

})

test('Check the title of the page', async ({ page }) => {
    await expect(page).toHaveTitle('Swag Labs')
})

test('Count the product', async ({ page }) => {
    const prodcut = page.locator('.inventory_item')
    await expect(prodcut).toHaveCount(6)
})
