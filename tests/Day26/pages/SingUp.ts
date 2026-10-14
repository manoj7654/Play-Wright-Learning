import { Page, Locator } from '@playwright/test';

// Define the properties
export class SingUpPage {
    private readonly page: Page;
    private readonly signUpLink: Locator;
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signUpButton: Locator;


    // Initialize page context and elements
    constructor(page: Page) {
        this.page = page;
        this.signUpLink = this.page.locator('#signin2');
        this.userNameInput = this.page.locator('#sign-username');
        this.passwordInput = this.page.locator('#sign-password');
        this.signUpButton = this.page.locator('div.modal-footer button:has-text("Sign up")');
    }

    // Create reusable user actions
    async navigateToSignUp() {
        await this.signUpLink.click();
    }

    async fillUsername(username: string) {
        await this.userNameInput.clear()
        await this.userNameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async signUp(username: string, password: string): Promise<string> {
        await this.navigateToSignUp();
        await this.fillUsername(username);
        await this.fillPassword(password);

        const diaglogPromise = this.page.waitForEvent('dialog');
        await this.clickSignUpButton();

        const dialog = await diaglogPromise;
        const message = dialog.message();
        await dialog.accept();

        return message;

    }
}