import { test, expect } from "@playwright/test"

const URL = "https://sdetqa.vercel.app/autoplay"

test.describe("Date entry form validation", () => {

    // hooks

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    })

    test("1. Page Load Validation", async ({ page }) => {
        await expect(page).toHaveURL("https://sdetqa.vercel.app/autoplay")
        await expect(page.getByText("AutoPlay")).toBeVisible()
    })

    test("2. Input Fields Validation", async ({ page }) => {
        //Locate Full name field
        const FullName = page.getByLabel("Full name")
        await expect(FullName).toBeVisible();
        await expect(FullName).toBeEnabled()

        //Check maxlength attribute of Full name
        await expect(FullName).toHaveAttribute('maxlength', '15');

        //Enter "John Canedy" in Full name
        await FullName.fill('John Canedy');
        await expect(FullName).toHaveValue('John Canedy');


        //Locate Email field 
        const email = page.getByLabel('email');
        await expect(email).toBeVisible()


        //Enter "manojsfstm5@gmail.com"

        email.fill("manojsfstm5@gmail.com");
        await expect(email).toHaveValue('manojsfstm5@gmail.com')


        //Locate Phone field 
        const phone = page.getByLabel('Phone');
        await expect(phone).toBeVisible();

        //Enter "+91 7654504943"
        phone.fill('7654504943');
        await expect(phone).toHaveValue('7654504943');

        //Locate Address field
        const address = page.getByLabel('Address');
        await expect(address).toBeVisible();

        //Enter multi-line address
        address.fill('d-block \n gali no 12');
        await expect(address).toHaveValue('d-block \n gali no 12');

    })

    test("3. Radio Button (Gender) Validation", async ({ page }) => {
        const male = page.getByLabel('Male', { exact: true });
        const female = page.getByLabel('Female', { exact: true });

        await expect(male).toBeVisible();
        await expect(female).toBeVisible();

        //Select Female radio button
        female.check();
        await expect(female).toBeChecked();

        //Verify Male radio button
        //male.uncheck();
        //await expect(male).not.toBeChecked();



    })

    test('4. Checkbox (Days) Validation', async ({ page }) => {
        let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        let checkboxes = days.map((day) => {
            return page.getByLabel(day)
        })
        //Select Sun checkbox
        //const sunday=page.getByLabel("Sun",{exact:true})
        //sunday.check();
        //await expect(sunday).toBeChecked()

        //Select all checkboxes (Mon–Sun)
        /* let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
 
         for (const day of days) {
             const res = page.getByLabel(day)
             res.check();
             await expect(res).toBeChecked()
         }
         */

        //Uncheck last 3 (Fri, Sat, Sun)
        /*let selectedDay = ['Fri', 'Sat', 'Sun'];
        for (const index of selectedDay) {
            const result = page.getByLabel(index)
            result.uncheck();
            await expect(result).not.toBeChecked()
        }
        */

        //Toggle all checkboxes
        /*for (const day of days) {
            const checkbox = page.getByLabel(day);

            if (await checkbox.isChecked()) {
                checkbox.uncheck()
                await expect(checkbox).not.toBeChecked()
            } else {
                checkbox.check();
                await expect(checkbox).toBeChecked()
            }

        }
            */

        //Select checkboxes using index (1,3,6 → Tue, Thu, Sun)
        let index = [1, 3, 6];
        for (const i of index) {
            checkboxes[i].check();
            await expect(checkboxes[i]).toBeChecked()
        }


    })

    test('5. Submit Button Validation', async ({ page }) => {
        //Locate Submit button
        const button = page.getByRole('button', { name: 'Submit' }).first();
        await expect(button).toBeVisible()

        //Click on Submit button
        await button.click();
        await expect(button).toBeEnabled()



    })

    test('6. Additional (Recommended) Test Cases', async ({ page }) => {
        //Leave all fields empty and click Submit 
        // Validation message should appear (if implemented)
        const FullName = page.getByLabel("Full name")
        const email = page.getByLabel('email');
        const phone = page.getByLabel('Phone');
        const address = page.getByLabel('Address');
        const submit = page.getByRole('button', { name: 'Submit' }).first();
        const errorMessage = page.locator('#formErrors');

        await FullName.fill(' ');
        await email.fill(' ');
        await phone.fill(' ');
        await address.fill(' ');

        await submit.click();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Please fix the following:');

    })

    test('Enter invalid email format Error should be show', async ({ page }) => {
        const email = page.getByLabel('email');
        const submit = page.getByRole('button', { name: 'Submit' }).first();
        const errorMessage = page.locator('#formErrors');

        await email.fill('xyz.com');
        await submit.click();

        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Please enter a valid email address.')

       

    })

    test('Enter more than 15 chars in name Input should be restricted', async({page})=>{
        const FullName = page.getByLabel("Full name")
        await FullName.fill('1234abc456def789fgh')
        await expect(FullName).toHaveValue('1234abc456def78');
        await expect(FullName).toHaveValue(/.{15}/)
 
  

    })

    test('Enter alphabets in phone field Should be restricted (if validation exists)', async({page})=>{
     
    const phone=page.getByLabel('Phone');
    await phone.fill('123456asd890')
    await expect(phone).toHaveValue(/^[^A-Za-z]*$/)

     await page.waitForTimeout(5000)
    })
})