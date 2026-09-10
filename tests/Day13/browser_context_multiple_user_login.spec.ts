import { chromium, test } from "@playwright/test";

test('Browser context for multiple login users', async () => {
    const broser = await chromium.launch();

    //Admin context
    const adminContext = await broser.newContext();
    const AdminPage = await adminContext.newPage();


   //User context
    const userContext = await broser.newContext();
    const UserPage = await userContext.newPage();

    //Login as admin
    await AdminPage.goto('https://www.saucedemo.com/');
    await AdminPage.locator('#user-name').fill('standard_user')
    await AdminPage.locator('#password').fill('secret_sauce');
    await AdminPage.locator('#login-button').click();
    await UserPage.waitForTimeout(5000)

    // Login as user
    await UserPage.goto('https://www.saucedemo.com/');
    await UserPage.locator('#user-name').fill('visual_user')
    await UserPage.locator('#password').fill('secret_sauce')
    await UserPage.locator('#login-button').click();
    await UserPage.waitForTimeout(5000)

})