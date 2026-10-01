import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/')

})

test('View Port Screenshor', async ({ page }) => {
    await page.screenshot({ path: './screenshot/01-viewport.png' })
})

test('Full Page Screenshor', async ({ page }) => {
    await page.screenshot({ path: './screenshot/02-fullpage.png', fullPage: true })
})

// JPEG screenshort with quality
//Quality works with only JPEG
test('JPEG screenshort', async ({ page }) => {
    await page.screenshot({ path: './screenshot/03-quality.jpg', type: 'jpeg', quality: 70 })
})

//Capture specific area (clip)
//x,y,width,height

test('Clip screenshort', async ({ page }) => {
    await page.screenshot(
        {
            path: './screenshot/04-clip.png',
            clip: {
                x: 100,
                y: 100,
                height: 700,
                width: 400
            }
        })
})

//Screenshort of specific elements

test('Specific element screenshort', async ({ page }) => {
    const logo = page.getByAltText('Playwright logo');
    await logo.screenshot(
        {
            path: './screenshot/05-logo.png',

        })
})

//Screenshort after scrolling

test('Screenshort after scrolll', async ({ page }) => {
    page.evaluate(() => window.scrollBy(0, 500))
    await page.screenshot(
        {
            path: './screenshot/06-scroll.png',

        })
})

//Screenshort with mask

test('Screenshort with mask', async ({ page }) => {
    const search = page.locator('.DocSearch-Button')
    await page.screenshot(
        {
            path: './screenshot/07-mask.png',
            mask: [search]

        })
})

//Hide caret
//Useful while capturing form

test('Hide caret', async ({ page }) => {
    await page.keyboard.press('/')
    await page.screenshot(
        {
            path: './screenshot/08-hide-caret.png',
            caret: 'hide'

        })
})

//Omit background
//work with png only
//Transparend background

test('Transparent Background', async ({ page }) => {
    page.evaluate(() => window.scrollBy(0, 500))
    await page.screenshot(
        {
            path: './screenshot/09-transparent.png',
            omitBackground: true

        })
})

//Disable Animation

test('Disable Animation', async ({ page }) => {
    await page.screenshot(
        {
            path: './screenshot/10-no-animation.png',
            animations: 'disabled'

        })
})

//Full page + Mask + Disable Animation
// Multiple option together

test('Multiple Screenshots Options', async ({ page }) => {
    const search = page.locator('.DocSearch-Button')

    await page.screenshot(
        {
            path: './screenshot/11-combine.png',
            fullPage: true,
            mask: [search],
            animations: 'disabled'

        })
})

// Save screenshot with time stamps (Dynamics)

test('Dynamic name screenshot', async ({ page }, testInfo) => {
    const timeStamp = Date.now()

    // Adding current millisecond
    let fileName = `./screenshot/12-homepage-${timeStamp}.png`
    //await page.screenshot({ path: fileName })

    //Adding test name with timestamp
    fileName = `./screenshot/${testInfo.title}-${timeStamp}.png`
    await page.screenshot({ path: fileName })

})

// Capture screenshot into buffer
// No file created

test('Buffer screenshot', async ({ page }) => {
   const buffer= await page.screenshot()
   console.log(`Buffer Size: ${buffer.length} bytes`)

})

//Attched screenshot wih HTML repot
test('Attached screenshot with HTML report', async ({ page },testInfo) => {

   const screnshot= await page.screenshot()

   await testInfo.attach('Home Page Screenshot',{
    body:screnshot,
    contentType:'img/png'
   })

})

// Save screenshort first then attached html report

test('Save screenshort and attached with HTML report', async ({ page },testInfo) => {

    const timeStamp=Date.now();
    const fileName=`./screenshot/13_Home_${timeStamp}.png`
   await page.screenshot({path:fileName})

   await testInfo.attach('Home Page Screenshot',{
    path:fileName,
    contentType:'img/png'
   })

})