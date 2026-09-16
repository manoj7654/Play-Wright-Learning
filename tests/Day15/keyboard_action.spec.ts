import { test, expect } from "@playwright/test";


test('Keyboar action', async ({ page }) => {
    await page.goto('https://gotranscript.com/text-compare');
    const inputField=page.locator('.form-control').nth(0);
    await inputField.focus();

    // type the text in the input box
    await page.keyboard.type('Welcome')

    //se.ect the text
    await page.keyboard.press('Control+A')

    //copy the text
    await page.keyboard.press('Control+C');

    //go to next input field
    await page.keyboard.press('Tab');

    //paste the text in the next input field
    await page.keyboard.press('Control+V')
    
 await page.waitForTimeout(5000)
})

