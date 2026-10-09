# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Day25\reporting.spec.ts >> demowebshop User Login Tests >> @P1 @Sanity demoblaze Login test
- Location: tests\Day25\reporting.spec.ts:74:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Log out' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Log out' })

```

```yaml
- dialog "Log in":
  - document:
    - heading "Log in" [level=5]
    - button "Close"
    - text: "Username:"
    - textbox: pavanol
    - text: "Password:"
    - textbox: test@123X
    - button "Close"
    - button "Log in"
- navigation:
  - link "PRODUCT STORE":
    - /url: index.html
    - img
    - text: PRODUCT STORE
  - list:
    - listitem:
      - link "Home (current)":
        - /url: index.html
    - listitem:
      - link "Contact":
        - /url: "#"
    - listitem:
      - link "About us":
        - /url: "#"
    - listitem:
      - link "Cart":
        - /url: cart.html
    - listitem:
      - link "Log in":
        - /url: "#"
    - listitem
    - listitem
    - listitem:
      - link "Sign up":
        - /url: "#"
  - list:
    - listitem
    - listitem
    - listitem
  - img "First slide"
  - img "Second slide"
  - button "Previous"
  - button "Next"
- link "CATEGORIES":
  - /url: ""
- link "Phones":
  - /url: "#"
- link "Laptops":
  - /url: "#"
- link "Monitors":
  - /url: "#"
- link:
  - /url: prod.html?idp_=1
- heading "Samsung galaxy s6" [level=4]:
  - link "Samsung galaxy s6":
    - /url: prod.html?idp_=1
- heading "$360" [level=5]
- paragraph: The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded.
- link:
  - /url: prod.html?idp_=2
- heading "Nokia lumia 1520" [level=4]:
  - link "Nokia lumia 1520":
    - /url: prod.html?idp_=2
- heading "$820" [level=5]
- paragraph: The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM.
- link:
  - /url: prod.html?idp_=3
- heading "Nexus 6" [level=4]:
  - link "Nexus 6":
    - /url: prod.html?idp_=3
- heading "$650" [level=5]
- paragraph: The Motorola Google Nexus 6 is powered by 2.7GHz quad-core Qualcomm Snapdragon 805 processor and it comes with 3GB of RAM.
- link:
  - /url: prod.html?idp_=4
- heading "Samsung galaxy s7" [level=4]:
  - link "Samsung galaxy s7":
    - /url: prod.html?idp_=4
- heading "$800" [level=5]
- paragraph: The Samsung Galaxy S7 is powered by 1.6GHz octa-core it comes with 4GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 200GB via a microSD card.
- link:
  - /url: prod.html?idp_=5
- heading "Iphone 6 32gb" [level=4]:
  - link "Iphone 6 32gb":
    - /url: prod.html?idp_=5
- heading "$790" [level=5]
- paragraph: It comes with 1GB of RAM. The phone packs 16GB of internal storage cannot be expanded. As far as the cameras are concerned, the Apple iPhone 6 packs a 8-megapixel primary camera on the rear and a 1.2-megapixel front shooter for selfies.
- link:
  - /url: prod.html?idp_=6
- heading "Sony xperia z5" [level=4]:
  - link "Sony xperia z5":
    - /url: prod.html?idp_=6
- heading "$320" [level=5]
- paragraph: Sony Xperia Z5 Dual smartphone was launched in September 2015. The phone comes with a 5.20-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 424 pixels per inch.
- link:
  - /url: prod.html?idp_=7
- heading "HTC One M9" [level=4]:
  - link "HTC One M9":
    - /url: prod.html?idp_=7
- heading "$700" [level=5]
- paragraph: The HTC One M9 is powered by 1.5GHz octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 128GB via a microSD card.
- link:
  - /url: prod.html?idp_=8
- heading "Sony vaio i5" [level=4]:
  - link "Sony vaio i5":
    - /url: prod.html?idp_=8
- heading "$790" [level=5]
- paragraph: Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight.
- link:
  - /url: prod.html?idp_=9
- heading "Sony vaio i7" [level=4]:
  - link "Sony vaio i7":
    - /url: prod.html?idp_=9
- heading "$790" [level=5]
- paragraph: REVIEW Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight, higher-resolution display, more storage space, and a Blu-ray drive.
- list:
  - listitem:
    - button "Previous"
  - listitem:
    - button "Next"
- heading "About Us" [level=4]
- paragraph: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
- heading "Get in Touch" [level=4]
- paragraph: "Address: 2390 El Camino Real"
- paragraph: "Phone: +440 123456"
- paragraph: "Email: demo@blazemeter.com"
- heading "PRODUCT STORE" [level=4]:
  - img
  - text: PRODUCT STORE
- contentinfo:
  - paragraph: Copyright © Product Store
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | 
  4  | test.describe('demowebshop Home Page Tests', () => {
  5  | 
  6  |     test('@P2 @Regression logotest', async ({ page }) => {
  7  |         await page.goto('https://demowebshop.tricentis.com/');
  8  |         await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
  9  |     });
  10 | 
  11 |     test('@P2 @Regression title test', async ({ page }) => {
  12 |         await page.goto('https://demowebshop.tricentis.com/login');
  13 |         expect(await page.title()).toContain("Demo Web Shop");
  14 |     });
  15 | 
  16 | });
  17 | 
  18 | 
  19 | test.describe('demowebshop User Login Tests', () => {
  20 | 
  21 |     test('@P1 @Sanity Login test with in-valid credentials', async ({ page }) => {
  22 | 
  23 |         await test.step('Open Login Page', async () => {
  24 |             await page.goto('https://demowebshop.tricentis.com/login');
  25 |         });
  26 | 
  27 |         await test.step('Enter Login Credentials', async () => {
  28 |             await page.fill('#Email', 'invalid@example.com');
  29 |             await page.fill('#Password', 'invalidpassword');
  30 |         });
  31 | 
  32 |         await test.step('Click Login Button', async () => {
  33 |             await page.locator('input[value="Log in"]').click();
  34 |         });
  35 | 
  36 |         await test.step('Verify UnSuccessful Login', async () => {
  37 |             // Assert user is still on the login page
  38 |             await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
  39 |         });
  40 | 
  41 |     });
  42 | 
  43 | 
  44 |     test('@P1 @Sanity Login test with valid credentials', async ({ page }) => {
  45 | 
  46 |         await test.step('Open Login Page', async () => {
  47 |             await page.goto('https://demowebshop.tricentis.com/login');
  48 |         });
  49 | 
  50 |         await test.step('Enter Login Credentials', async () => {
  51 |             await page.fill('#Email', 'laura.taylor1234@example.com');
  52 |             await page.fill('#Password', 'test123');
  53 |         });
  54 | 
  55 |         await test.step('Click Login Button', async () => {
  56 |             await page.locator('input[value="Log in"]').click();
  57 |         });
  58 | 
  59 |         await test.step('Verify Successful Login', async () => {
  60 |             const logoutLink = page.locator('a[href="/logout"]');
  61 |             await expect(logoutLink).toBeVisible({ timeout: 5000 });
  62 | 
  63 |         });
  64 |     })
  65 | 
  66 |     test.skip('@P2 @Regression demowebshop search test', async ({ page }) => {
  67 |         await page.goto('https://demowebshop.tricentis.com/login');
  68 |         await page.locator('#small-searchterms').fill("laptop");  // fill the text in search box
  69 |         await page.locator("input[value='Search']").click();      // click on the button
  70 |         await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop", { ignoreCase: true });
  71 |     });
  72 | 
  73 |     //Failing test
  74 |     test('@P1 @Sanity demoblaze Login test', async ({ page }) => {
  75 |         await page.goto('https://www.demoblaze.com/index.html');
  76 |         await page.getByRole('link', { name: 'Log in' }).click();
  77 |         await page.locator('#loginusername').fill('pavanol');
  78 |         await page.locator('#loginpassword').fill('test@123X');
  79 |         await page.getByRole('button', { name: 'Log in' }).click();
> 80 |         await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
     |                                                                   ^ Error: expect(locator).toBeVisible() failed
  81 |         await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
  82 | 
  83 |     });
  84 | 
  85 | 
  86 | })
```