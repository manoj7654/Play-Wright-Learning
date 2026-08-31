import { test, expect } from "@playwright/test"

const URL = "https://www.bstackdemo.com/"

test.describe("Assignment Verify Product Sorting and Information Retrieval", () => {

    // hooks

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    })

    //Navigate to the Webpage
    test('Navigate to the Webpage', async ({ page }) => {
        await expect(page).toHaveURL('https://www.bstackdemo.com/')
    })

    //Interact with the "Order by" Dropdown
    test('Interact with the "Order by" Dropdown', async ({ page }) => {
        const order = page.locator('.sort');
        await expect(order).toContainText('Order by')
        const dropdwon = page.locator('select')
        await expect(dropdwon).toBeVisible();
        await expect(dropdwon).toBeEnabled();
        await dropdwon.selectOption({ label: 'Lowest to highest' });
    })

    // Retrieve and Print Product Information
    test(' Retrieve and Print Product Information', async ({ page }) => {
        const price = await page.locator('.val').allTextContents();
        const priceCount = price.length;
        //console.log('Price Count: ',priceCount)
        const product = await page.locator('.shelf-item__title').allTextContents()
        const productCount = product.length;
        //console.log('Product Count: ',productCount)

        expect(productCount).toEqual(priceCount)
        await page.waitForTimeout(3000)

        for(let i=0;i<product.length;i++ ){
            console.log('Product Name', product[i] + ' Product price', price[i])
        } 
    })


      test('Identify and Print the Lowest Priced Product', async ({ page }) => {
        const price = await page.locator('.val').allTextContents();
        const product = await page.locator('.shelf-item__title').allTextContents()
        const firstProduct=product[0];
        console.log('First Product Name :',firstProduct)
        const firstPrice=price[0];
        console.log('First Product Price :',firstPrice)
        
        
    })


})