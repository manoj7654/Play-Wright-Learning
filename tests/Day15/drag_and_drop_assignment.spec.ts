import { test, expect } from "@playwright/test";


test('Drag and drop assignment', async ({ page }) => {
    await page.goto('https://demo.guru99.com/test/drag_drop.html');

    const message=page.locator('.table4_result a')

    //Debit side
    const bank=page.locator('#credit2');
    const targetBank=page.locator('#bank');

    await bank.dragTo(targetBank);

    const amount=page.locator('#fourth a').nth(1);
    const targetAmount=page.locator('#amt7');

    await amount.dragTo(targetAmount)

    //credit side
    const creditAccount=page.locator('#credit1');
    const targetCreditAccount=page.locator('#loan')

    await creditAccount.dragTo(targetCreditAccount)

    const creditAmount=page.locator('#fourth a').nth(0);
    const targetCreditAmount=page.locator('#amt8')

    await creditAmount.dragTo(targetCreditAmount)

    await expect(message).toContainText('Perfect!')
})

