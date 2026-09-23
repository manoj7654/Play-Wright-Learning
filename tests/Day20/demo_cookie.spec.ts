import { test, chromium } from '@playwright/test';

test('Demo cookies', async ({}) => {

    // Creating own browser
    const browser = await chromium.launch();

    // Creating own context
    const context = await browser.newContext();

    // Creating own page
    const page = await context.newPage();

    // Add cookies
    await context.addCookies([
        {
            name: 'username',
            value: 'Manoj',
            domain: 'playwright.dev',
            path: '/',
            httpOnly: false,
            secure: true,
            sameSite: 'Lax'
        },
        {
            name: 'auth_token',
            value: 'xyz123secret',
            url: 'https://www.example.com'
        }
    ]);

    await page.goto('https://playwright.dev/');

    const cookies = await context.cookies();

    console.log(cookies);
});