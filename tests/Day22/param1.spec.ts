import { test, expect } from '@playwright/test';

const loginCredentials: string[][] = [
    ['laura.taylor1234@example.com','test123','valid'],
    ['invaliduser@example.com','test321','invalid'],
    ['validuser@example.com','testxyz','invalid'],
    ['','','invalid']

];

test.describe('Data driven login test', async () => {
    for (let [email, password, validity] of loginCredentials) {
        test(`Login for user ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await expect(page).toHaveTitle('Demo Web Shop. Login');

            //login
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password)
            await page.getByLabel('Remember me?').check()
            await page.locator('input[value="Log in"]').click()

            if(validity.toLowerCase() === 'valid'){
            const logout=page.locator('.ico-logout');
            await expect(logout).toBeVisible();
            }else{
                const message=page.locator('.message-error')
                await expect(message).toBeVisible()

                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login')
            }
        })
    }
})

