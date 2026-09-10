import { test, expect } from "@playwright/test";

test.describe('alerts, confirm and prompt', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://sdetqa.vercel.app/autoplay');
        await expect(page.getByText('AutoPlay')).toBeVisible();
    })



    test('Simple dialog', async ({ page }) => {
        const simple = page.getByRole('button', { name: 'Simple' });
        page.on('dialog', dialog => {
            expect(dialog.type()).toBe('alert')
            expect(dialog.message()).toContain('Simple alert!')
            dialog.accept();

        })
        await simple.click()

    })

     test('Confirm dialog', async ({ page }) => {
        const Confirm = page.getByRole('button', { name: 'Confirm' });
        page.on('dialog', dialog => {
            expect(dialog.type()).toBe('confirm')
            expect(dialog.message()).toContain('Confirm?')

            dialog.dismiss();

        })
        //await page.waitForTimeout(5000)
        await Confirm.click()
        await page.waitForTimeout(5000)

    })

     test('Prompt dialog', async ({ page }) => {
        const Prompt = page.getByRole('button', { name: 'Prompt' });
        page.on('dialog', dialog => {
            if(dialog.type()==='prompt'){
                dialog.accept('Welcome')
            }else if(dialog.type()==='alert'){
                dialog.accept()
            }

        })
        //await page.waitForTimeout(5000)
        await Prompt.click()
        await page.waitForTimeout(5000)

    })

})