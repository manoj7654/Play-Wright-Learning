import { test, expect } from '@playwright/test';
import { SingUpPage } from './pages/SingUp';
import { LoginPage } from './pages/Login';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';

test.describe.configure({ mode: 'serial' });

test.describe('Demoblaze Test', () => {
    const BaseURL = 'https://www.demoblaze.com/index.html';
    const userPassword = 'Test@123';
    let SignedUpUser: { username: string; password: string; } | undefined;
    const testProduct = 'Nexus 6';

    test.beforeEach(async ({ page }) => {
        await page.goto(BaseURL);
    });

    test('User can sign up with a new account', async ({ page }) => {
        const signUpPage = new SingUpPage(page);
        SignedUpUser = { username: `Manoj_${Date.now()}`, password: userPassword };
        const alerMessage = await signUpPage.signUp(SignedUpUser.username, SignedUpUser.password);
        expect(alerMessage).toContain('Sign up successful');
    })

    test('User can login, add a product to cart and verify it', async ({ page }) => {
        expect(SignedUpUser).toBeDefined();
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        await loginPage.navigateToLogin();

        await loginPage.login(SignedUpUser!.username, SignedUpUser!.password);
        await page.waitForTimeout(2000);
        await homePage.addProductToCart(testProduct);
        await page.waitForTimeout(1000);

        await homePage.navigateToCart();
        await page.waitForTimeout(1000);

        await cartPage.waitForCartToLoad();
        const isProductInCart = await cartPage.isProductInCart(testProduct);
        expect(isProductInCart).toBe(true);
    })

    
    //Assignment: Add a test case to remove a product from the cart and verify that it has been removed successfully.
      test('User can remove product from cart', async ({ page }) => {
        expect(SignedUpUser).toBeDefined();
    
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
    
        await loginPage.navigateToLogin();
        await loginPage.login(SignedUpUser!.username, SignedUpUser!.password);
        await page.waitForTimeout(2000);
    
        await homePage.addProductToCart(testProduct);
        await page.waitForTimeout(1000);
    
        await homePage.navigateToCart();
        await cartPage.waitForCartToLoad();
    
        let isProductInCart = await cartPage.isProductInCart(testProduct);
        if(isProductInCart){
          await cartPage.removeProductFromCart(testProduct);
         await page.waitForTimeout(1000);
        }
        
        //verify that the product has been removed from the cart
        isProductInCart = await cartPage.isProductInCart(testProduct);
         expect(isProductInCart).not.toBe(true);
    
        await page.close()
    
      });
      
});
