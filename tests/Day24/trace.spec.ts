
// Programatically (start and stop tracing manullay within a test)
// Configure tracing in playwright.confi.ts(used in most real project)
// Using command line


import { test, chromium, expect } from '@playwright/test';

test('Capture trace manually', async ({ }, testInfo) => {

    const brower = await chromium.launch();
    const context = await brower.newContext();

    await context.tracing.start({
        screenshots:true,
        snapshots:true,
        sources:true,
    })

    const page = await context.newPage();
    await page.goto('https://demoblaze.com/')

    //Click on login
    await page.locator('#login2').click();

    // Fill the login details
    await page.locator('#loginusername').fill('Manoj Kumar')
    await page.locator('#loginpassword').fill('Manoj@7654')


    const logIn = page.getByRole('button', { name: 'Log in' })
    await expect(logIn).toBeVisible();
    await logIn.click();

    await expect(page.locator('#nameofuser')).toContainText('Welcome Manoj Kumar',{ timeout: 50000 })

    const tracePath=`./traces/trace-${Date.now()}.zip`

    await context.tracing.stop({
        path:tracePath
    })


    //Attached the trace file in html repot
    await testInfo.attach('Trace Manually', {
        path: tracePath,
        contentType: 'application/zip'
    })

    await brower.close()

})