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

// Runs after each test
test.afterEach(async({page}, testInfo)=>{
 console.log(`Test Name: ${testInfo.title}`)
 console.log(`Test Status: ${testInfo.status}`)

 //Logout
 await page.locator('#react-burger-menu-btn').click()
 await page.locator('#logout_sidebar_link').click();

 console.log('Logout Completed')

})

//Test1
test('Check the title of the page', async ({ page }) => {
    await expect(page).toHaveTitle('Swag Labs')
})

//Test2
test('Count the product', async ({ page }) => {
    const prodcut = page.locator('.inventory_item')
    await expect(prodcut).toHaveCount(6)
})


//Test3
test('Verify the URL of the page', async ({ page }) => {
    
    await expect(page).toHaveURL(/inventory/)
})
