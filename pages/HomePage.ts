import { Locator, Page } from '@playwright/test'
import { PageBase } from './PagesHelper/PageBase';
export class HomePage extends PageBase {

	private readonly logoutButton: Locator;
	private readonly deleteAccountButton: Locator;
	private readonly accoutDeletedSuccessMessage: Locator;

	constructor(page: Page) {
		super(page);
		this.logoutButton = page.getByRole('link', { name: 'Logout' })
		this.deleteAccountButton = page.getByRole('link', { name: 'Delete Account' });
		this.accoutDeletedSuccessMessage = page.getByText('Account Deleted!');
	}

	async clickOnLogoutButton() {
		await this.elementActions.clickOnElement(this.logoutButton);
	}

	async clickOnDeleteAccountButton() {
		await this.elementActions.clickOnElement(this.deleteAccountButton);
	}

	async getAccountDeletionMessage() {
		return await this.elementActions.getText(this.accoutDeletedSuccessMessage);
	}
}