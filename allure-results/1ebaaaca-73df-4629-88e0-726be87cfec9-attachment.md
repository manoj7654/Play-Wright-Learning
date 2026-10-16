# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Day26\POM_demo_test.spec.ts >> Demoblaze Test >> User can remove product from cart
- Location: tests\Day26\POM_demo_test.spec.ts:48:11

# Error details

```
ReferenceError: signedUpUser is not defined
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - text:             
  - navigation [ref=e2]:
    - link "PRODUCT STORE" [ref=e3] [cursor=pointer]:
      - /url: index.html
    - list [ref=e6]:
      - listitem [ref=e7]:
        - link "Home (current)" [ref=e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=e9]: (current)
      - listitem [ref=e10]:
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e12]:
        - link "About us" [ref=e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e14]:
        - link "Cart" [ref=e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=e16]:
        - link "Log in" [active] [ref=e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e18]:
        - link "Sign up" [ref=e19] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e21]:
      - list [ref=e22]:
        - listitem [ref=e23] [cursor=pointer]
        - listitem [ref=e24] [cursor=pointer]
        - listitem [ref=e25] [cursor=pointer]
      - img "First slide" [ref=e28]
      - button "Previous" [ref=e29] [cursor=pointer]
      - button "Next" [ref=e32] [cursor=pointer]
  - generic [ref=e36]:
    - generic [ref=e38]:
      - link "CATEGORIES" [ref=e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e42] [cursor=pointer]:
        - /url: "#"
    - list [ref=e45]:
      - listitem [ref=e46]:
        - button "Previous" [ref=e47]
      - listitem [ref=e48]:
        - button "Next" [ref=e49] [cursor=pointer]
  - generic [ref=e51]:
    - generic [ref=e54]:
      - heading "About Us" [level=4] [ref=e55]
      - paragraph [ref=e56]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e59]:
      - heading "Get in Touch" [level=4] [ref=e60]
      - paragraph [ref=e61]: "Address: 2390 El Camino Real"
      - paragraph [ref=e62]: "Phone: +440 123456"
      - paragraph [ref=e63]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e67]
  - contentinfo [ref=e69]:
    - paragraph [ref=e70]: Copyright © Product Store
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { SingUpPage } from './pages/SingUp';
  3  | import { LoginPage } from './pages/Login';
  4  | import { HomePage } from './pages/HomePage';
  5  | import { CartPage } from './pages/CartPage';
  6  | 
  7  | test.describe.configure({ mode: 'serial' });
  8  | 
  9  | test.describe('Demoblaze Test', () => {
  10 |     const BaseURL = 'https://www.demoblaze.com/index.html';
  11 |     const userPassword = 'Test@123';
  12 |     let SignedUpUser: { username: string; password: string; } | undefined;
  13 |     const testProduct = 'Nexus 6';
  14 | 
  15 |     test.beforeEach(async ({ page }) => {
  16 |         await page.goto(BaseURL);
  17 |     });
  18 | 
  19 |     test('User can sign up with a new account', async ({ page }) => {
  20 |         const signUpPage = new SingUpPage(page);
  21 |         SignedUpUser = { username: `Manoj_${Date.now()}`, password: userPassword };
  22 |         const alerMessage = await signUpPage.signUp(SignedUpUser.username, SignedUpUser.password);
  23 |         expect(alerMessage).toContain('Sign up successful');
  24 |     })
  25 | 
  26 |     test('User can login, add a product to cart and verify it', async ({ page }) => {
  27 |         expect(SignedUpUser).toBeDefined();
  28 |         const loginPage = new LoginPage(page);
  29 |         const homePage = new HomePage(page);
  30 |         const cartPage = new CartPage(page);
  31 |         await loginPage.navigateToLogin();
  32 | 
  33 |         await loginPage.login(SignedUpUser!.username, SignedUpUser!.password);
  34 |         await page.waitForTimeout(2000);
  35 |         await homePage.addProductToCart(testProduct);
  36 |         await page.waitForTimeout(1000);
  37 | 
  38 |         await homePage.navigateToCart();
  39 |         await page.waitForTimeout(1000);
  40 | 
  41 |         await cartPage.waitForCartToLoad();
  42 |         const isProductInCart = await cartPage.isProductInCart(testProduct);
  43 |         expect(isProductInCart).toBe(true);
  44 |     })
  45 | 
  46 |     
  47 |     //Assignment: Add a test case to remove a product from the cart and verify that it has been removed successfully.
  48 |       test('User can remove product from cart', async ({ page }) => {
  49 |         expect(SignedUpUser).toBeDefined();
  50 |     
  51 |         const loginPage = new LoginPage(page);
  52 |         const homePage = new HomePage(page);
  53 |         const cartPage = new CartPage(page);
  54 |     
  55 |         await loginPage.navigateToLogin();
> 56 |         await loginPage.login(SignedUpUser!.username, SignedUpUser!.password);
     |                               ^ ReferenceError: signedUpUser is not defined
  57 |         await page.waitForTimeout(2000);
  58 |     
  59 |         await homePage.addProductToCart(testProduct);
  60 |         await page.waitForTimeout(1000);
  61 |     
  62 |         await homePage.navigateToCart();
  63 |         await cartPage.waitForCartToLoad();
  64 |     
  65 |         let isProductInCart = await cartPage.isProductInCart(testProduct);
  66 |         if(isProductInCart){
  67 |           await cartPage.removeProductFromCart(testProduct);
  68 |          await page.waitForTimeout(1000);
  69 |         }
  70 |         
  71 |         //verify that the product has been removed from the cart
  72 |         isProductInCart = await cartPage.isProductInCart(testProduct);
  73 |          expect(isProductInCart).not.toBe(true);
  74 |     
  75 |         await page.close()
  76 |     
  77 |       });
  78 |       
  79 | });
  80 | 
```