import { test, expect } from "@playwright/test"

const URL = "https://sdetqa.vercel.app/autoplay"

test.describe("Handle dropdown", () => {

    // hooks

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    })
    test('1. Test Cases – Single Select Dropdown (Country)', async ({ page }) => {

        // load page successfully
        await expect(page.getByText('AutoPlay')).toBeVisible()

        //Locate Country dropdown
        const countryDropdown = page.locator('#country');
        await expect(countryDropdown).toBeVisible()

        //Get default selected value
        await expect(countryDropdown).toHaveValue('india')

        //Select option using label "USA" 
        // Value should change to usa
        await countryDropdown.selectOption({ label: 'USA' })
        await expect(countryDropdown).toHaveValue('usa')

        //Select option using value "uk" 
        //Value should change to uk

        await countryDropdown.selectOption({ value: 'usa' })
        await expect(countryDropdown).toHaveValue('usa')


        //Select option using index (3) 
        //Value should be germany

        await countryDropdown.selectOption({ index: 3 })
        await expect(countryDropdown).toHaveValue('germany')

        //Select option using value + label (France) 
        // Value should be france
        await countryDropdown.selectOption({ label: 'France', value: 'france' });
        await expect(countryDropdown).toHaveValue('france');


        //Count total dropdown options 
        // Count should be 5
        const countDropdown = countryDropdown.locator('option');
        await expect(countDropdown).toHaveCount(5)

        //Get all option texts List should contain "Germany"
        const res = await countDropdown.allTextContents();
        expect(res).toContain('Germany')

        //Print dropdown options All options should be displayed in console
        for(const index of res){
            console.log(index)
        }

    })

  test('2. Test Cases – Multi Select Dropdown (Colors)', async ({ page }) => {

       //Locate Colors dropdown Dropdown should be visible
       const colorDropdown=page.locator('#colors');
       await expect(colorDropdown).toBeVisible()

       //Get default selected value Default should be blue
       await expect(colorDropdown).toHaveValue('blue');

       //Select multiple options using labels (Red, Green, Yellow) All should be selected
       await colorDropdown.selectOption([{label:'Red'},{label:'Green'},{label:'Yellow'}])

       //Select multiple options using values (red, green, yellow) All should be selected
       await colorDropdown.selectOption([{value:'red'},{value:'green'},{value:'yellow'}])

       //Select multiple options using index (0,2,3) Correct options should be selected
       await colorDropdown.selectOption([{index:0},{index:2},{index:3}])

       //Verify multiple selections Selected values should match input
        await colorDropdown.selectOption([{label:'Red'},{label:'Green'},{label:'Yellow'}])
        await expect(colorDropdown).toHaveValues(['red','green','yellow'])

    })

 test('3. Test Cases – Sorted Dropdown Validation', async ({ page }) => {

    //Locate sorted dropdown options Options should be visible
       const drop= await page.locator('#sorted option').allTextContents();
      // console.log(drop)
       const original=[...drop];
       //console.log('Original Array',original)
       const sorted=drop.sort();
       //console.log('or',original)
       //console.log('Sorted Array', sorted)

     expect(original).toEqual(sorted)

        await page.waitForTimeout(3000)

    })

})