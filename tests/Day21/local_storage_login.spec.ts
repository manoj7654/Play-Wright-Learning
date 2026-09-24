import { test, chromium, expect } from '@playwright/test';


const BaseURL = 'https://sdetqa.vercel.app/login_app'

//test.describe.configure({ mode: 'serial' })

test('Login as a admin and check dashboard', async ({ browser }) => {

    // Attaching the local storage date
    const context = await browser.newContext({ storageState: '../../storage-data/admin_data.json' });
    const page = await context.newPage();
    await page.goto(BaseURL)
    await expect(page.locator('#displayUser')).toContainText('admin')
    await page.waitForTimeout(5000)

    await context.close()

});

test('Login as a user and check dashboard', async ({ browser }) => {

    // Attaching the local storage date
    const context = await browser.newContext({ storageState: '../../storage-data/user_data.json' });
    const page = await context.newPage();
    await page.goto(BaseURL)
    await expect(page.locator('#displayUser')).toContainText('testuser1')
    await page.waitForTimeout(5000)

    await context.close()

});



