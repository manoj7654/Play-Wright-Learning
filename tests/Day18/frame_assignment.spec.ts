import { test, expect } from '@playwright/test';

test('Iframe lab assignment', async ({ page }) => {
    // Open the Frames demo application
    await page.goto("https://ui.vision/demo/webtest/frames/");

    //Verify Frame 1 input field
    //Open the Frames page, switch to Frame 1, enter "Welcome" in the textbox, verify the value
    //The textbox should contain "Welcome".

    const frame1 = page.frameLocator("frame[src='frame_1.html']").locator("input[name='mytext1']")
    await frame1.fill('Welcome')
    await expect(frame1).toHaveValue('Welcome')

    //Verify Frame 2 input field
    //Open the Frames page, switch to Frame 2, enter "Suneel", verify the value.
    //The textbox should display "Suneel".
    const frame2 = page.frameLocator("frame[src='frame_2.html']").locator("input[name='mytext2']")
    await frame2.fill('Suneel')
    await expect(frame2).toHaveValue('Suneel')

    //Verify Frame 3 parent frame textbox
    //Navigate to the page, switch to Frame 3, enter "You are in Frame 3 - Teal", verify the entered value.
    //Text should be entered successfully.
    const frame3 = page.frameLocator("frame[src='frame_3.html']");
    const text = frame3.locator('input[name="mytext3"]');
    await text.fill('You are in Frame 3 - Teal')
    await expect(text).toHaveValue('You are in Frame 3 - Teal')

    //Access nested iframe inside Frame 3
    //Switch to Frame 3, then switch to its child iframe (Google Form).
    //Nested iframe should be accessible.

    const childFrame = frame3.frameLocator('iframe');

    //Select radio button inside nested frame
    //Select the radio button "Hi, I am the UI.Vision IDE".
    //Radio button should be selected successfully.

    const radio = childFrame.getByRole('radio', { name: 'Hi, I am the UI.Vision IDE' })
    await expect(radio).toBeVisible();
    await radio.click();
    await expect(radio).toHaveAttribute('aria-checked', 'true');

    //Select checkbox inside nested frame
    //Select the checkbox "Form Autofilling".
    //Checkbox should be selected successfully.

    const checkbox = childFrame.getByRole('checkbox', { name: 'Form Autofilling' })
    await expect(checkbox).toBeVisible();
    await checkbox.click();
    await expect(checkbox).toHaveAttribute('aria-checked', 'true');

    //Navigate to next page of Google Form
    //Click the Next button.
    //User should navigate to the next section of the form.

    const nextButton = childFrame.getByRole('button', { name: 'Next' })
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    //Fill short answer textbox
    //Enter "We are here" in the short answer textbox and verify the value.
    //Entered value should match the expected text.

    const shortAnswer = childFrame.locator('input[type="text"]');
    await expect(shortAnswer).toBeVisible()
    await shortAnswer.fill('We are here')
    await expect(shortAnswer).toHaveValue('We are here')

    //Fill long answer textbox
    //Enter "We are able to access all element in child frame" in the long answer textbox and verify the value.
    //Text should be entered successfully.

    const longAnswer = childFrame.locator('textarea');
    await expect(longAnswer).toBeVisible()
    await longAnswer.fill('We are able to access all element in child frame')
    await expect(longAnswer).toHaveValue('We are able to access all element in child frame')

    //Submit Google Form
    //Click the Submit button. 
    //Form should be submitted successfully.

    const submit = childFrame.getByRole('button', { name: 'Submit' })
    await expect(submit).toBeVisible();
    await submit.click();

    //Verify submission confirmation
    //Read the confirmation message after submission.
    //Confirmation should contain "Thank you for testing the UI.Vision".

    const message = childFrame.getByText('Thank you for testing the UI.Vision')
    await expect(message).toBeVisible;
    await expect(message).toContainText('Thank you for testing the UI.Vision')

    //Verify Frame 4 textbox
    //Switch to Frame 4, enter "Frame 4 Text", verify the value.
    //Textbox should display "Frame 4 Text".

    const frame4 = page.frameLocator("frame[src='frame_4.html']").locator('input[name="mytext4"]')
    await frame4.fill('Frame 4 Text')
    await expect(frame4).toHaveValue('Frame 4 Text')

    ////Verify Frame 5 textbox
    //Switch to Frame 5, enter "playwright", verify the value.
    //Textbox should contain "playwright".

    const frame5 = page.frameLocator("frame[src='frame_5.html']").locator('input[name="mytext5"]')
    await frame5.fill('playwright')
    await expect(frame5).toHaveValue('playwright')

    //Verify logo inside Frame 5
    //Click the provided link inside Frame 5 and verify the displayed logo.
    //Logo should be visible.
    const frame6 = page.frameLocator("frame[src='frame_5.html']");
    const logo = frame6.locator("a")
    await expect(logo).toBeVisible();
    await logo.click()
    await expect(logo.getByAltText('Ui.Vision by a9t9 software - Image-Driven Automation')).toBeVisible()


    await page.waitForTimeout(5000)

})