import {test,expect} from "@playwright/test";

test('Hard assertion', async({page})=>{

    //open the page and verify the page title
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle('Demo Web Shop');

    // Verify the URL
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/')

    //Verify the text appear on the page.
    await expect(page.getByText('Welcome to our store')).toBeVisible()


})
// Soft assertion will execute all the test event one test got failed
test.only('Soft assertion', async({page})=>{

    //open the page and verify the page title
    await page.goto('https://demowebshop.tricentis.com/');
    await expect.soft(page).toHaveTitle('Demo Web Shop2');

    // Verify the URL
    await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/')

    //Verify the text appear on the page.
    await expect.soft(page.getByText('Welcome to our store')).toBeVisible()


})