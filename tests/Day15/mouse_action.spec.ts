import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();
})

test('Toggle button changes state when click', async ({ page }) => {
    const startButton = page.locator('#toggleBtn');
    const originalTex = await startButton.innerText();
    await startButton.click();
    const toggledText = await startButton.innerText();
    //expect(toggledText).not.toBe(originalTex);
})

test('Right click', async ({ page }) => {
    const rightButton = page.locator('#rightClickBtn');

    //right click properties
    await rightButton.click({ button: 'right' })

    //getting all option when clicking on right click
    const customMenu = await page.locator('#customContextMenu button').allInnerTexts(); //[ 'Edit', 'Cut', 'Copy', 'Paste', 'Delete', 'Quit' ]
    expect(customMenu).toEqual(['Edit', 'Cut', 'Copy', 'Paste', 'Delete', 'Quit'])
    const quite = page.locator('button', { hasText: 'Quit' });

    page.once('dialog', (dialog) => {
        expect(dialog.message()).toContain('Quit');
        dialog.accept()
    })
    await quite.click()
    await page.waitForTimeout(5000)
})


test('Mouse hover', async ({ page }) => {
    //getting hover text
    const hoverButton = page.locator("span:has-text('Hover me')")
    await expect(hoverButton).toBeVisible();

    // hovering on the text
    await hoverButton.hover();

    expect(await hoverButton.getAttribute('title')).toBe('This is a tooltip')
})

test('Double click', async ({ page }) => {

    page.once('dialog', dialog => {
        expect(dialog.message()).toContain('Double clicked!')
        dialog.accept()
    })

    await page.locator('button', { hasText: 'Double click' }).dblclick()
    await page.waitForTimeout(5000)
})

test('Double click with copy text', async ({ page }) => {
    const field1 = page.locator('#field1');
    const field2 = page.locator('#field2');
    const copyText = page.locator('button', { hasText: 'Copy Text' })

    await field1.fill("Welcome");
    await copyText.dblclick();
    await field2.fill('Welcome');
    await expect(field2).toHaveValue('Welcome')
    await page.waitForTimeout(5000)
})

test('Drag and drop', async ({ page }) => {
    const sourceItem = page.getByText('Drag me', { exact: true })
    const tragetItem = page.getByText('Drop zone', { exact: true })

    page.once('dialog', dialog => {
        expect(dialog.message()).toContain('Dropped!');
        dialog.accept()
    })

    await sourceItem.dragTo(tragetItem);
    await page.waitForTimeout(5000)
})

test('Slider range', async ({ page }) => {
    const priceSlider = page.locator('#priceSlider');
    await priceSlider.focus();

    // go inital point 0
    await page.keyboard.press('Home')

    //move slider till 50
    for (let i = 0; i < 50; i++) {
        await page.keyboard.press('ArrowRight')

    }
    await expect(priceSlider).toHaveValue('50')
    await page.waitForTimeout(5000)
})


test.only('Price range', async ({ page }) => {

    const priceRang = page.locator('#slider-range');
    let amount = await page.locator('#amount').inputValue();
    await priceRang.focus();

    const element1 = page.locator('.ui-slider-handle').nth(0);
    const element2 = page.locator('.ui-slider-handle').nth(1);

    // Minimum slider
    await element1.focus();
    await page.keyboard.press('Home');

    let price1 = '';

    for (let i = 0; i < 100; i++) {

        await page.keyboard.press('ArrowRight');

        amount = await page.locator('#amount').inputValue();

        price1 = amount.split('-')[0].trim();
        if (price1 === '$100') {
            break;
        }
    }

    // Maximum slider
    await element2.focus();
    await page.keyboard.press('End');

    let price2 = '';

    for (let i = 0; i < 300; i++) {

        await page.keyboard.press('ArrowLeft');

        amount = await page.locator('#amount').inputValue();

        price2 = amount.split('-')[1].trim();
        if (price2 === '$300') {
            break;
        }
    }

    const finalPrice = `${price1} - ${price2}`;

    console.log('Final Price:', finalPrice);
    await page.waitForTimeout(500)
    await expect(page.locator('#amount')).toHaveValue('$100 - $300');
});