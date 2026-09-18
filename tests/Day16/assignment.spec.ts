import { test, expect } from "@playwright/test";
test.setTimeout(120000);

// Product Count
test('Product Count', async ({ page }) => {
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201t0500');

    let previousHeight = 0;

    while (true) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(2000)
        const updatedHeight = await page.evaluate(() => {
            return document.body.scrollHeight
        })

        const productCount = await page.locator('#divItemCard').count()
       // console.log(`Product Count :${productCount}`)        
        //console.log("============================================")
        //console.log(`Previous Height : ${previousHeight}`)
       // console.log(`Update Height : ${updatedHeight}`)

        if (previousHeight === updatedHeight) {
            break;
        }
        previousHeight = updatedHeight
    }


})


test('Product Name Find', async ({ page }) => {
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201t0500');

    let previousHeight = 0;
    let isBookFound=false;

    while (true) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(2000)
        const updatedHeight = await page.evaluate(() => {
            return document.body.scrollHeight
        })

        // Getting product name in an array
        const productCount = page.locator('#divItemCard')
        let productName:string[]=[];

        for(let i=0;i<await productCount.count();i++){
            let product=await productCount.nth(i).locator('h3').innerText();
            productName.push(product)
        }

        // find specific book name exist or not
        for(let i=0;i<productName.length;i++){
            if(productName[i]==='Star Wars What is a Wookiee?'){
                isBookFound=true;
                break;
            }
        }
         if(isBookFound)break;

        if (previousHeight === updatedHeight) {
            break;
        }
        previousHeight = updatedHeight
    }
  expect(isBookFound).toBe(true)

})

