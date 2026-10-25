
/*
API Mocking and network interception

https://demo.playwright.dev/api-mocking

https://demo.playwright.dev/api-mocking/api/v1/fruits

*/

import {test,expect} from '@playwright/test'

test('Mocking API Respnse', async({page})=>{

    // Step 1: Intercept the API URL Pattern befor navigating
    await page.route('**/api/v1/fruits', async(route)=>{

        // Step 2: Fullfill the request with your mock data
        const mockedData=[
            {name:'Manoj', id:1},
            {name:'Mala', id:2}
        ]
        await route.fulfill({
            status:200,
            contentType:'application/json',
            body:JSON.stringify(mockedData)

        })
    })
    // Step 3: Go to the page and verify the UI Display the mocked data
    await page.goto('https://demo.playwright.dev/api-mocking')
    await expect(page.getByText('Manoj')).toBeVisible();
    await expect(page.getByText('Mala')).toBeVisible()

    await page.waitForTimeout(5000)

})

// Example 2: Modify Live API Response
// We canot mock directly API 
test('Modify API Respnse', async({request})=>{
const response= await request.get('https://demo.playwright.dev/api-mocking/api/v1/fruits');
const responseBody=await response.json();
console.log(responseBody)
})

// Example 3:


test('Modify live API Respnse', async({page})=>{

    // Step 1: Intercept the API URL Pattern befor navigating
    await page.route('**/api/v1/fruits', async(route)=>{
        // Fetch the actual response from the server
        const response=await route.fetch();
        const json=await response.json();
        
        // Apend or patch the real data
        json.push({
            name:'Manoj', id:100
        })

        // Full fill the route with modified data
      await route.fulfill({
        response,
        json
      })
    })
    // Step 3: Go to the page and verify the UI Display the mocked data
   await page.goto('https://demo.playwright.dev/api-mocking')
   await expect(page.getByText('Manoj')).toBeVisible();
   await page.waitForTimeout(5000)

})

// Network interception - Block specific image extension

test('Block image extension',async({page})=>{

    // block the image .png .jpg .jpeg .webp

  await page.route('**/*.{jpg,png,jpeg,webp}',async(route)=>{
    console.log(route.request().url())
    await route.abort()
  })

   await page.goto('https://demoblaze.com/')

   await page.waitForTimeout(5000)
})