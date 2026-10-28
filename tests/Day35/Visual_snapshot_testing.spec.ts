/*

Step 1: Capture the screenshot

Step 2, 3, 4: Run the test
*/


import { test, expect } from '@playwright/test'
test('Visual test', async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');

    //Method 1
    //expect(await page.screenshot()).toMatchSnapshot('Homepage')

    //Compare snapshot for the element
    const logo=page.locator("img[alt='Tricentis Demo Web Shop']")
    expect(await logo.screenshot()).toMatchSnapshot('logo.png')
})