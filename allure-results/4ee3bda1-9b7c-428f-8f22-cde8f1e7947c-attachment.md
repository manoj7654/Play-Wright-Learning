# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Day26\POM_demo_test.spec.ts >> Demoblaze Test >> User can login, add a product to cart and verify it
- Location: tests\Day26\POM_demo_test.spec.ts:27:5

# Error details

```
Error: Product "Nexus 6" not found on the page
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - dialog [ref=e2]:
    - document [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - heading "Log in" [level=5] [ref=e6]
          - button "Close" [ref=e7] [cursor=pointer]: ×
        - generic [ref=e9]:
          - generic [ref=e10]:
            - generic [ref=e11]: "Username:"
            - textbox [ref=e12]: Manoj_1791786007230
          - generic [ref=e13]:
            - generic [ref=e14]: "Password:"
            - textbox [ref=e15]: Test@123
        - generic [ref=e17]:
          - button "Close" [ref=e18]
          - button "Log in" [active] [ref=e19]
  - text:             
  - navigation [ref=e20]:
    - link "PRODUCT STORE" [ref=e21] [cursor=pointer]:
      - /url: index.html
    - list [ref=e24]:
      - listitem [ref=e25]:
        - link "Home (current)" [ref=e26] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=e27]: (current)
      - listitem [ref=e28]:
        - link "Contact" [ref=e29] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e30]:
        - link "About us" [ref=e31] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e32]:
        - link "Cart" [ref=e33] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=e34]:
        - link "Log in" [ref=e35] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e36]:
        - link "Sign up" [ref=e37] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e39]:
      - list [ref=e40]:
        - listitem [ref=e41] [cursor=pointer]
        - listitem [ref=e42] [cursor=pointer]
        - listitem [ref=e43] [cursor=pointer]
      - img "First slide" [ref=e46]
      - button "Previous" [ref=e47] [cursor=pointer]
      - button "Next" [ref=e50] [cursor=pointer]
  - generic [ref=e54]:
    - generic [ref=e56]:
      - link "CATEGORIES" [ref=e57] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e58] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e59] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e60] [cursor=pointer]:
        - /url: "#"
    - list [ref=e63]:
      - listitem [ref=e64]:
        - button "Previous" [ref=e65]
      - listitem [ref=e66]:
        - button "Next" [ref=e67] [cursor=pointer]
  - generic [ref=e69]:
    - generic [ref=e72]:
      - heading "About Us" [level=4] [ref=e73]
      - paragraph [ref=e74]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e77]:
      - heading "Get in Touch" [level=4] [ref=e78]
      - paragraph [ref=e79]: "Address: 2390 El Camino Real"
      - paragraph [ref=e80]: "Phone: +440 123456"
      - paragraph [ref=e81]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e85]
  - contentinfo [ref=e87]:
    - paragraph [ref=e88]: Copyright © Product Store
```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export class HomePage {
  4  |   private readonly page: Page;
  5  |   private readonly productLinks: Locator;
  6  |   private readonly addToCartButton: Locator;
  7  |   private readonly cartLink: Locator;
  8  |   private readonly categoryLinks: Locator;
  9  | 
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |     this.productLinks = page.locator('.card-title a');
  13 |     this.addToCartButton = page.locator('a:has-text("Add to cart")');
  14 |     this.cartLink = page.locator('#cartur');
  15 |     this.categoryLinks = page.locator('.list-group a');
  16 |   }
  17 | 
  18 |   // Navigation methods
  19 |   async navigateToCart() {
  20 |     await this.cartLink.click();
  21 |   }
  22 | 
  23 |   // Product actions
  24 |   async addProductToCart(productName: string) {
  25 |     // Click on the product to view its details
  26 |     await this.selectProductByName(productName);
  27 |     
  28 |     // Handle the dialog that appears after adding to cart
  29 |     this.page.once('dialog', async dialog => {
  30 |       if (dialog.message().includes('added')) {
  31 |         await dialog.accept();
  32 |       }
  33 |     });
  34 | 
  35 |     // Click the "Add to cart" button
  36 |     await this.addToCartButton.click();
  37 |   }
  38 | 
  39 |   async selectProductByName(productName: string) {
  40 |     const productElements = await this.productLinks.all();
  41 |     
  42 |     for (const product of productElements) {
  43 |       const name = await product.textContent();
  44 |       if (name?.trim() === productName) {
  45 |         await product.click();
  46 |         return;
  47 |       }
  48 |     }
  49 |     
> 50 |     throw new Error(`Product "${productName}" not found on the page`);
     |           ^ Error: Product "Nexus 6" not found on the page
  51 |   }
  52 | 
  53 |   // Category filtering
  54 |   async selectCategory(categoryName: string) {
  55 |     const categories = await this.categoryLinks.all();
  56 |     
  57 |     for (const category of categories) {
  58 |       const name = await category.textContent();
  59 |       if (name?.trim().toLowerCase() === categoryName.toLowerCase()) {
  60 |         await category.click();
  61 |         await this.page.waitForLoadState('networkidle');
  62 |         return;
  63 |       }
  64 |     }
  65 |     
  66 |     throw new Error(`Category "${categoryName}" not found`);
  67 |   }
  68 | 
  69 |   // Verification methods
  70 |   async isProductVisible(productName: string) {
  71 |     const products = await this.productLinks.all();
  72 |     
  73 |     for (const product of products) {
  74 |       const name = await product.textContent();
  75 |       if (name?.trim() === productName) {
  76 |         return true;
  77 |       }
  78 |     }
  79 |     
  80 |     return false;
  81 |   }
  82 | 
  83 |   // Wait methods
  84 |   async waitForProductsToLoad() {
  85 |     await this.page.waitForSelector('div#tbodyid div.card', { state: 'visible' });
  86 |   }
  87 | }
```