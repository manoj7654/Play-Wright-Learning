import { test, expect } from "@playwright/test";

test.describe('File Upload', async () => {

    test('Single File Upload', async ({ page }) => {

        await page.goto('https://sdetqa.vercel.app/autoplay');
        await expect(page.getByText('AutoPlay')).toBeVisible();

        const singleFileUpload = page.locator('#singleFileInput');
        const fileUploadButton = page.getByRole('button', { name: 'Upload Single File' })
        const message = page.locator('#singleFileStatus');

        singleFileUpload.setInputFiles('../../uploads/dummy.txt')
        await fileUploadButton.click();
        await expect(message).toHaveText(/Single file selected: dummy.txt/)

        await page.waitForTimeout(5000)

    })


    test('Multi File Upload', async ({ page }) => {

        await page.goto('https://sdetqa.vercel.app/autoplay');
        await expect(page.getByText('AutoPlay')).toBeVisible();

        const singleFileUpload = page.locator('#multipleFilesInput');
        const fileUploadButton = page.getByRole('button', { name: 'Upload Multiple Files' })
        const message = page.locator('#multipleFilesStatus');

        singleFileUpload.setInputFiles(['../../uploads/dummy.txt', '../../uploads/Filters.pdf'])
        await fileUploadButton.click();
        await expect(message).toContainText(/dummy.txt/)
        await expect(message).toContainText(/Filters.pdf/)


        await page.waitForTimeout(5000)

    })

})
