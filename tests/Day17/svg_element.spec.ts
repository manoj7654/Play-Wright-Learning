import { test, expect } from "@playwright/test"

test.describe("Handle SVG Element", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://sdetqa.vercel.app/autoplay');
        await expect(page.getByText('AutoPlay')).toBeVisible();
    })

    test('Shpe test',async({page})=>{
        //click on svg circle icon
        let circle=page.locator('svg circle');
        await circle.click()
        await expect(circle).toBeVisible()

        //Locat svg rectangle with id
        const rect= page.locator('#rect-shape');
        await rect.click();

        //Locat SVG circle using attributes;
        circle=page.locator('circle[fill="DeepSkyBlue"');
        expect(circle).toBeVisible

        //Verify svg color
        const color=await page.locator('svg circle').getAttribute('fill')
        expect(color).toBe('DeepSkyBlue')

        //count multiple svg icon
        const shape_count=page.locator('.shape');
        expect(shape_count).toHaveCount(4)

    })

    test('SVG bar chart', async ({ page }) => {

        // checking heading is visible or not
        const heading = page.locator('h3', { hasText: 'SVG Elements' })
        await expect(heading).toBeVisible()

        await heading.scrollIntoViewIfNeeded(); //optional

        await page.locator('svg rect').nth(1).click();

        const bars = page.locator('svg').nth(1).locator('rect');
        expect(await bars.count()).toBe(5)

        const bars_count = await bars.count()

        const labels = page.locator('svg').nth(1).locator('text');
        expect(await labels.count()).toBe(5)
        const labels_count = await labels.count();

        expect(bars_count).toEqual(labels_count)

        //print height along with the label;

        for (let i = 0; i < bars_count; i++) {
            const label = await labels.nth(i).textContent()
            const height = await bars.nth(i).getAttribute('height');

            console.log(`${label}:${height}`)
        }

        // fine highest hight of the bars

        let maxHeight = 0;
        for (let i = 0; i < bars_count; i++) {
            const height = Number(await bars.nth(i).getAttribute('height'));

            if (height > maxHeight){
                maxHeight=height
            }
        }
        console.log(maxHeight)

    })


})