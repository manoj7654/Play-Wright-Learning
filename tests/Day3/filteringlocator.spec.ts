import { test, expect } from "@playwright/test";

const URL = "https://sdetqa.vercel.app/filters_practice";

test.describe("Locator filtering", async () => {

    // hooks
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    })

    test('Verify "Add to cart" for Product 2', async ({ page }) => {
        const product2 = page.getByRole("listitem")
            .filter({ hasText: "Product 2" })
            .getByRole('button', { name: "Add to cart" });

        await expect(product2).toBeVisible()
    })

    test('Count items not having "Out of stock"', async ({ page }) => {
        const count = page.locator(".card").nth(1)
            .getByRole("listitem")
            .filter({ hasNotText: 'Out of stock' })

        await expect(count).toHaveCount(3)
    })

    test(' Find items with "In stock" ', async ({ page }) => {
        const count = page.getByRole("listitem")
            .filter({ hasText: 'In stock' })

        await expect(count).toHaveCount(3)
    })

    test('Find items with "Out of stock"', async ({ page }) => {
        const count = page.getByRole("listitem")
            .filter({ hasText: 'Out of stock' })

        await expect(count).toHaveCount(2)
    })

    test(' Verify elements using data-testid"', async ({ page }) => {
        const apple = page.getByTestId("apple")
        const banana = page.getByTestId("banana")
        const orange = page.getByTestId("orange")
        const kiwi = page.getByTestId("kiwi")
        const mango = page.getByTestId("mango")

        await expect(apple).toContainText('apple')
        await expect(banana).toContainText('banana')
        await expect(orange).toContainText('orange')
        await expect(kiwi).toContainText('kiwi')
        await expect(mango).toContainText('mango')
    })

    test('Count all elements with test ids', async ({ page }) => {
        const element = page.locator('[data-testid]');
        await expect(element).toHaveCount(5)
    })

    test('Find "Say goodbye" button for John', async ({ page }) => {
        const sayGoodBye = page.getByRole("listitem")
            .filter({ hasText: "John" })
            .getByRole('button', { name: 'Say goodbye' })

        await expect(sayGoodBye).toBeVisible()
    })

    test('Find "Say hello" button for Mary', async ({ page }) => {
        const sayHello = page.getByRole("listitem")
            .filter({ hasText: "Mary" })
            .getByRole('button', { name: 'Say hello' })

        await expect(sayHello).toBeVisible()
    })

    test('Count "Say hello" buttons for John', async ({ page }) => {
        const sayHelloCount = page.getByRole("listitem")
            .filter({ hasText: "John" })
            .getByRole('button', { name: 'Say hello' })

        await expect(sayHelloCount).toHaveCount(1)
    })


    test('Count "Say hello" buttons for Mary', async ({ page }) => {
        const sayHelloCount = page.getByRole("listitem")
            .filter({ hasText: "Mary" })
            .getByRole('button', { name: 'Say hello' })

        await expect(sayHelloCount).toHaveCount(1)
    })


    test('Count all buttons for John', async ({ page }) => {
        const countJohn = page.getByRole("listitem")
            .filter({ hasText: "John" })
            .getByRole('button')
        await expect(countJohn).toHaveCount(2)
    })

    test(' Find "Subscribe" buttons using multiple conditions', async ({ page }) => {
        const subscribe = page.getByRole('button')
            .and(page.getByTitle('Subscribe', { exact: true }))
        await expect(subscribe).toHaveCount(2)

        await expect(subscribe.first()).toBeVisible()
        await expect(subscribe.last()).toBeVisible()
    })


    test('Find "Unsubscribe" button', async ({ page }) => {
        const subscribe = page.getByRole('button')
            .and(page.getByTitle('Unsubscribe', { exact: true }))
        await expect(subscribe).toHaveCount(1)

        await expect(subscribe).toBeVisible()
    })

    test(' Find "details" buttons for done tasks', async ({ page }) => {
        const done = page.getByRole("listitem")
            .filter({ hasText: 'done' })
            .getByRole('button', { name: 'details' })

        await expect(done).toHaveCount(2)
    })

    test('Find "details" button for pending tasks', async ({ page }) => {
        const pending = page.getByRole("listitem")
            .filter({ hasText: 'pending' })
            .getByRole('button', { name: 'details' })

        await expect(pending).toHaveCount(1)
    })


    test('Count tasks with "done" status', async ({ page }) => {
        const doneStatus = page.getByRole("listitem")
            .filter({ hasText: 'done' })

        await expect(doneStatus).toHaveCount(2)
    })

    test('Find tasks not marked "done"', async ({ page }) => {
        const NotdoneStatus = page.locator(".card").last()
            .getByRole("listitem")
            .filter({ hasNotText: 'done' })

        await expect(NotdoneStatus).toHaveCount(2)
    })

    test('Verify Product 2 button', async ({ page }) => {
        const product2 = page.getByRole("listitem")
            .filter({ hasText: "Product 2" })
            .getByRole('button', { name: "Add to cart" });

        await expect(product2).toBeVisible()
    })

    test('Verify stock status counts', async ({ page }) => {
        const InstockCount = page.getByRole("listitem")
            .filter({ hasText: "In stock" })
        
        const outOfStcokCount= page.getByRole("listitem")
        .filter({hasText:'Out of stock'})

        await expect(InstockCount).toHaveCount(3)
        await expect(outOfStcokCount).toHaveCount(2)
    })
})

