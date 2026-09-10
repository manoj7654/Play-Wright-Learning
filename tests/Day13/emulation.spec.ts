import { test, expect, chromium, devices } from "@playwright/test";

//Emolation demo fixture
test.skip('Emolution fixture', async () => {
const broser= await chromium.launch();
const context=await broser.newContext({...devices['iPhone 15'], colorScheme:'dark'});
const page=await context.newPage();

await page.goto('https://www.google.com/')

await page.waitForTimeout(5000)

})

//Page size demo 
test('Page size demo', async ({page}) => {
await page.setViewportSize({height:1,width:1})
await page.goto('https://www.google.com/')

await page.waitForTimeout(5000)

})
