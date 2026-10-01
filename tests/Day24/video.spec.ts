import { test, chromium, expect } from '@playwright/test';

test('Record Video for single test', async ({ }, testInfo) => {

    const brower = await chromium.launch();
    const context = await brower.newContext({
        recordVideo: {
            dir: './videos',
            size: {
                height: 720,
                width: 1280
            }
        }
    });

    const page = await context.newPage();
    await page.goto('https://demoblaze.com/')

    //Click on login
    await page.locator('#login2').click();

    // Fill the login details
    await page.locator('#loginusername').fill('pavnol')
    await page.locator('#loginpassword').fill('test@123')


    const logIn = page.getByRole('button', { name: 'Log in' })
    await expect(logIn).toBeVisible();
    await logIn.click();

    await expect(page.locator('#nameofuser')).toContainText('Welcome pavnol')

    // Save the video
    await context.close();

    //Attached the recorded vidoe in html repot
    const videoPath = await page.video()?.path();
    await testInfo.attach('Execution Video', {
        path: videoPath,
        contentType: 'video/webm'
    })

})