import {test,expect} from "@playwright/test"

test('Auto Wait',async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/',);

    // Auto works
    await expect(page).toHaveTitle('Demo Web Shop',{timeout:1000});
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/',{timeout:1000})
    await expect(page.getByText('Welcome to our store')).toBeVisible()

    //Assertion
    const serach=page.locator('#small-searchterms')
    await serach.fill('Laptops')

    //Disable non-esential actionability checks
    //will not check that target element actually recieve click events.
    const searchButton=page.locator('.button-1.search-box-button')
    await searchButton.click({force:true});
})