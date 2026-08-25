import { test, expect } from '@playwright/test';

test("title is correct", async({page})=>{
    await page.goto("https://students.masaischool.com/");
    let title=await page.title();
    console.log(title);
    expect(title).toBe("Masai Experience");
})

test("Verify URL", async({page})=>{
    await page.goto("https://students.masaischool.com/");
    let url=await page.url();
    await expect(page).toHaveURL("https://students.masaischool.com/signin")

    //getByAltText
  await page.goto("file:///C:/Users/ManojKumar1/Downloads/app.html");
  await expect(page.getByAltText("logo image")).toBeVisible();

//getByText
 await page.goto("file:///C:/Users/ManojKumar1/Downloads/app.html");
 await expect(page.getByText("Locate elements by their text content.")).toBeVisible();

 //getByRole
 await page.goto("file:///C:/Users/ManojKumar1/Downloads/app.html");
 await page.getByRole("button", {name:"Primary Action"}).click();

 //getByLabel
await page.goto("file:///C:/Users/ManojKumar1/Downloads/app.html");
await page.getByLabel("Email Address:").fill("manojsfstm5@gmail.com");
await page.getByLabel("Password:").fill("Manoj7654");
await page.getByLabel("Your Age:").fill("27");

// getByPlaceholder
await page.goto("file:///C:/Users/ManojKumar1/Downloads/app.html");
await page.getByPlaceholder("Enter your full name").fill("Manoj Kumar");
await page.getByPlaceholder("Phone number (xxx-xxx-xxxx)").fill("7654504943");
await page.getByPlaceholder("Search products...").fill("Mobile");

// getByTitle
await page.goto("file:///C:/Users/ManojKumar1/Downloads/app.html");
await page.getByTitle("Home page link").click();

// getByTestId
await page.goto("file:///C:/Users/ManojKumar1/Downloads/app.html");
await page.getByTestId("nav-products").click();
})

