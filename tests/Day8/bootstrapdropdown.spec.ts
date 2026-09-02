import { test, expect } from "@playwright/test";

test('Bootstrap Hidden Dropdown', async ({ page }) => {


    //Open the browser and navigate to OrangeHRM
    //Demo Application Login page should be displayed
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

    //Enter username as Admin Username should be entered successfully
   await page.locator('input[name="username"]').fill('Admin');
    await expect(page.locator('input[name="username"]')).toHaveValue('Admin')
    
    //Enter password as admin123 Password should be entered successfully
    await page.locator('input[name="password"]').fill('admin123')
  
    await expect(page.locator('input[name="password"]')).toHaveValue('admin123')

    //Click on Login button User should be logged in and dashboard should be displayed
    await page.locator('button[type="submit"]').click()
    await expect(page.getByRole('link',{name:'PIM'})).toBeVisible()

    //Click on PIM menu PIM page should be opened
    await page.getByRole('link',{name:'PIM'}).click()

    //Click on Job Title dropdown (hidden/bootstrap dropdown) Dropdown options should be displayed
    const jobtitledropdown=page.locator('form i').nth(2)
    await jobtitledropdown.click();

    //    //Capture all dropdown options All options should be identified successfully
    const listbox=page.locator('div[role="listbox"] span');
    await expect(listbox.first()).toBeVisible()

    //Count number of options Total number of options should be printed in console
    const count=await listbox.count();
    console.log(count)

    //Get text of all options All dropdown option texts should be printed in console
    const optionText=await listbox.allTextContents();
    console.log(optionText)

    //Iterate through options Each option text should be printed one by one
    for(let i=0;i<count;i++){
      const option=listbox.nth(i)
      const optiontext=await option.textContent();
     console.log(optiontext)

     //Click on "Automaton Tester" Selected option should be chosen in dropdown
     if(optiontext=="QA Engineer"){
        await option.click();
        break;
     }
    }

    await expect(page.locator('.oxd-select-text-input').nth(2)).toHaveText('QA Engineer')
    await page.waitForTimeout(3000)

})