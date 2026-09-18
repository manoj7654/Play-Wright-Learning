import { test, expect } from "@playwright/test";
test.setTimeout(120000);
test('Lazi Loading', async ({ page }) => {
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201t0500');

    let previousHeight = 0;

    while (true) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(2000)
        const updatedHeight = await page.evaluate(() => {
            return document.body.scrollHeight
        })

        console.log("============================================")
        console.log(`Previous Height : ${previousHeight}`)
        console.log(`Update Height : ${updatedHeight}`)

        if (previousHeight === updatedHeight) {
            break;
        }
        previousHeight = updatedHeight
    }

  const productCount=await page.locator('#productsDiv').allInnerTexts()
  console.log(productCount.length)
})


