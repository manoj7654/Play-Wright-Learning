import { test, expect } from "@playwright/test"

test.describe("Handle shadow dom", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://sdetqa.vercel.app/autoplay');
        await expect(page.getByText('AutoPlay')).toBeVisible();
    })

    test('Shadow Dom', async ({ page }) => {

        // checking heading is visible or not
        const heading = page.locator('h3', { hasText: 'Shadow DOM' })
        await expect(heading).toBeVisible()

        await heading.scrollIntoViewIfNeeded(); //optional

        const shadow_host = page.locator('#shadow_host');

        await expect(shadow_host.getByText('Mobiles')).toBeVisible()
        await expect(shadow_host.getByText('Laptops')).toBeVisible()

        const bloag = shadow_host.getByRole('link', { name: 'Blog' })
        await expect(bloag).toBeVisible();
        await expect(bloag).toHaveAttribute('href', 'https://www.pavantestingtools.com/');

        // Verifying text box
        const textInput = shadow_host.locator('input[type="text"]');
        await textInput.fill('Welcome');
        await expect(textInput).toHaveValue('Welcome')

        // Verifying checkbox
        const checkbox = shadow_host.locator('input[type="checkbox"]');
        await checkbox.check();
        await expect(checkbox).toBeChecked();

        // Uploading file
        const file = shadow_host.locator('input[type="file"]');
        await file.setInputFiles('../../uploads/dummy.txt')

        //Verifying Youtube link
        const youTube=page.getByRole('link',{name:'Youtube'})
        await expect(youTube).toBeVisible();
        await expect(youTube).toHaveAttribute('href','https://www.youtube.com/@sdetpavan/videos')
    })


})