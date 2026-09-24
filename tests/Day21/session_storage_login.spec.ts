import { test, chromium, expect } from '@playwright/test';
import fs from 'fs'

const BaseURL = 'https://sdetqa.vercel.app/login_app'

//test.describe.configure({ mode: 'serial' })

test('Login as a admin and check dashboard', async ({ browser }) => {

    const context = await browser.newContext();

    //Read session storage from file
    const sessionStorageData=JSON.parse(fs.readFileSync('../../storage-data/admin_session_data.json','utf8'))

    await context.addInitScript((storage)=>{
     for(let key in storage){
        sessionStorage.setItem(key, storage[key])
     }
    },sessionStorageData)

    const page = await context.newPage();
    await page.goto(BaseURL)
    await expect(page.locator('#displayUser')).toContainText('admin')
    await page.waitForTimeout(5000)

    await context.close()

});

test('Login as a user and check dashboard', async ({ browser }) => {

    const context = await browser.newContext();

    //Read session storage from file
    const sessionStorageData=JSON.parse(fs.readFileSync('../../storage-data/user_seesion_data.json','utf8'))

    await context.addInitScript((storage)=>{
     for(let key in storage){
        sessionStorage.setItem(key, storage[key])
     }
    },sessionStorageData)

    const page = await context.newPage();
    await page.goto(BaseURL)
    await expect(page.locator('#displayUser')).toContainText('testuser1')
    await page.waitForTimeout(5000)

    await context.close()

});



