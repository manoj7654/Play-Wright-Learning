import { test, chromium, expect } from '@playwright/test';
import fs from 'fs';

const cookieFile = '../../storage-data/cookies-data.json'
const BaseURL = 'https://sdetqa.vercel.app/login_app'

test.describe.configure({ mode: 'serial' })

test('Login and saved cookies', async ({ browser }) => {

    //create own context
    const context = await browser.newContext();

    //Create own Page
    const page = await context.newPage();

    // Launching the page
    await page.goto(BaseURL)

    //Login data
    const username = page.getByLabel('username');
    await username.fill('admin');

    const password = page.getByLabel('password');
    await password.fill('admin123')

    // Click on cookie to save cookies
    await page.getByText('🍪 Cookie').check();

    //click on login button 
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText('Dashboard Welcom')).toBeVisible();

    const cookies = await context.cookies();

    fs.writeFileSync(cookieFile, JSON.stringify(cookies, null, 2))

    console.log('Cookies saved successfully')

    await page.waitForTimeout(5000)


});


test('Login with saved cookes', async ({ browser }) => {

    //create own context
    const context = await browser.newContext();

    // Get the saved cookie and passed it to the context

    const savedCookies = JSON.parse(fs.readFileSync(cookieFile, 'utf8'))

    await context.addCookies(savedCookies)

    //Create own Page
    const page = await context.newPage();

    // Launching the page
    await page.goto(BaseURL)

    // without providing login caredentials
    await expect(page.getByText('Dashboard Welcom')).toBeVisible();

    await page.waitForTimeout(5000)

});