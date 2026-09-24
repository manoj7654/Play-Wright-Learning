import { chromium, expect } from '@playwright/test';
import fs from 'fs';

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


    //Click on session storage to save session data
    await page.getByText('⏳ Session').check()

    //click on login button 
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Dashboard Welcome')).toBeVisible();

    // able to capture session storage data
    const sessionStorageData = await page.evaluate(() => {
        return sessionStorage
    })

    fs.writeFileSync('../../storage-data/admin_session_data.json', JSON.stringify(sessionStorageData))

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

    //Click on session storage to save session data
    await page.getByText('⏳ Session').check()

    //click on login button 
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Dashboard Welcome')).toBeVisible();

    // able to capture session storage data
    const sessionStorageData = await page.evaluate(() => {
        return sessionStorage
    })

    fs.writeFileSync('../../storage-data/user_seesion_data.json', JSON.stringify(sessionStorageData))


}

//Calling the function
saveAdminStorage()
saveUserStorage()