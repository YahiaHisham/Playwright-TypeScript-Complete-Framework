import { Locator, Page } from "@playwright/test";
import { PageBase } from "./PagesHelper/PageBase";

export class SignupLoginPage extends PageBase {

    private readonly signupName: Locator;
    private readonly signupEmail: Locator;
    private readonly signupButton: Locator;
    private readonly loginEmailField: Locator;
    private readonly loginPasswordField: Locator;
    private readonly loginButton: Locator;
    private readonly invalidLoginCredentialsMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.signupName = page.getByPlaceholder('Name');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.loginEmailField = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.loginPasswordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidLoginCredentialsMessage = page.locator('form').filter({ hasText: 'Login' }).locator('p');
    }

    async enterSignupName(name: string) {
        await this.elementActions.setElementText(this.signupName, name);
        return this;
    }

    async enterSignupEmail(email: string) {
        await this.elementActions.setElementText(this.signupEmail, email);
        return this;
    }

    async enterLoginEmail(email: string) {
        await this.elementActions.setElementText(this.loginEmailField, email);
    }

    async enterLoginPassword(password: string) {
        await this.elementActions.setElementText(this.loginPasswordField, password);
    }

    async clickOnSignupButton() {
        await this.elementActions.clickOnElement(this.signupButton);
    }

    async clickOnLoginButton() {
        await this.elementActions.clickOnElement(this.loginButton);
    }

    async enterSignupData(name: string, email: string) {
        await this.enterSignupName(name);
        await this.enterSignupEmail(email);
        await this.clickOnSignupButton();
    }

    async enterLoginData(email: string, password: string) {
        await this.enterLoginEmail(email);
        await this.enterLoginPassword(password);
    }

    async getInvalidLoginCredentialsMessage() {
        return await this.elementActions.getText(this.invalidLoginCredentialsMessage);
    }
}