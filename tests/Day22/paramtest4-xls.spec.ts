import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import fs from 'fs';

//Reading data form excel file
const excelPath = '../../test-data/data.xlsx';
const workbook = XLSX.readFile(excelPath)
const sheetNames = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetNames]

const excelLoginData:any = XLSX.utils.sheet_to_json(worksheet)
console.log(excelLoginData)

test.describe('Data driven login test with json data', async () => {
    for (let { email, password, validity } of excelLoginData) {
        test(`Login for user ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');
            await expect(page).toHaveTitle('Demo Web Shop. Login');

            //login
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password)
            await page.getByLabel('Remember me?').check()
            await page.locator('input[value="Log in"]').click()

            if (validity.toLowerCase() === 'valid') {
                const logout = page.locator('.ico-logout');
                await expect(logout).toBeVisible();
            } else {
                const message = page.locator('.message-error')
                await expect(message).toBeVisible()

                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login')
            }
        })
    }
})
