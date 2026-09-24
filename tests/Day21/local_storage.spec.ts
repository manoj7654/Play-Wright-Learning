import { chromium, expect } from '@playwright/test';

const BaseURL = 'https://sdetqa.vercel.app/login_app'

async function saveAdminStorage() {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(BaseURL)

    //Login data
    const username = page.getByLabel('username');
    await username.fill('admin');

    const password = page.getByLabel('password');
    await password.fill('admin123')

    // Click on cookie to save cookies
    //await page.getByText('🍪 Cookie').check();

    //Click on local storage to save 
    await page.getByText('💾 Local').check()

    //click on login button 
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Dashboard Welcome')).toBeVisible();

    // able to capture both cookies and local storage
    await context.storageState({ path: '../../storage-data/admin_data.json' })

    await browser.close()
}

async function saveUserStorage() {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(BaseURL)

    //Login data
    const username = page.getByLabel('username');
    await username.fill('testuser1');

    const password = page.getByLabel('password');
    await password.fill('testuser123 ')

    // Click on cookie to save cookies
    await page.getByText('🍪 Cookie').check();

    //Click on local storage to save 
    //await page.getByText('💾 Local').check()

    //click on login button 
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Dashboard Welcome')).toBeVisible();

    // able to capture both cookies and local storage
    await context.storageState({ path: '../../storage-data/user_data.json' })

    await browser.close()


}

//Calling the function
saveAdminStorage()
saveUserStorage()