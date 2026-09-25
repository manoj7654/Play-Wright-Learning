import { test, expect } from '@playwright/test';
import fs from 'fs';

const jsonPath='../../test-data/data.json';


const loginCredentials:any=JSON.parse(fs.readFileSync(jsonPath,'utf-8'))


test.describe('Data driven login test with json data', async() => {
    for (const {email, password, validity} of loginCredentials) {
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

