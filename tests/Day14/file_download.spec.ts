import { test, expect } from "@playwright/test";
import fs from 'fs';

test('File download', async ({ page }) => {

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();

    const [downloadFile] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('button', { hasText: 'Download File' }).click()
    ])

    expect(downloadFile.suggestedFilename()).toContain('sample.txt');
    
    //file path where to download
    const downloadPath = '../../downloads/sample.txt';
    //save the file for specific folder
    await downloadFile.saveAs(downloadPath)

    //check if the file is exist or not
    const isFileExist = fs.existsSync(downloadPath);

    expect(isFileExist).toBeTruthy();

    // if the file exist then it clean up
    if (isFileExist) {
        fs.unlinkSync(downloadPath)
    }

})



