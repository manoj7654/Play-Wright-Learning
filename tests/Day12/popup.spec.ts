import {test,expect} from "@playwright/test";

test('Common popup overlay',async({page})=>{

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page.getByText('AutoPlay')).toBeVisible();

   await page.locator('#PopUp').click();
   const popupbox=page.locator('#inlinePopup');
   await expect(popupbox).toBeVisible();

   await expect(popupbox.getByRole('heading',{name:'Be always in touch'})).toBeVisible()

   await popupbox.getByRole('button',{name:'Yes'}).click();
   await expect(popupbox).toBeHidden()

})