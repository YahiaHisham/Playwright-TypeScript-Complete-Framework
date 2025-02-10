import { Locator, Page } from '@playwright/test'
import { PageBase } from './PagesHelper/PageBase';
export class HeaderPage extends PageBase {

    private readonly signupLoginButton: Locator;
    private readonly logoutButton: Locator;
    private readonly contactUsButton: Locator;
    private readonly productsButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupLoginButton = page.locator('.fa-lock');
        this.logoutButton = page.getByRole('link', { name: 'Logout' })
        this.contactUsButton = page.getByRole('link', { name: 'Contact us' });
        this.productsButton = page.getByRole('link', { name: 'Products' });
    }
    async clickOnSignupLoginButton() {
        await this.elementActions.clickOnElement(this.signupLoginButton);
	}

	async clickOnLogoutButton() {
        await this.elementActions.clickOnElement(this.logoutButton);
	}

	async clickOnContactUsButton() {
        await this.elementActions.clickOnElement(this.contactUsButton);
	}

    async clickOnProductsButton() { 
        await this.elementActions.clickOnElement(this.productsButton);
    }

}