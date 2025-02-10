import { Locator, Page } from "@playwright/test";
import { PageBase } from "./PagesHelper/PageBase";

export class SignupPage extends PageBase {

    private readonly mrRadioButton: Locator;
    private readonly passwordField: Locator;
    private readonly dayOfBirthDropdown: Locator;
    private readonly monthOfBirthDropdown: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly addressField: Locator;
    private readonly stateField: Locator;
    private readonly cityField: Locator;
    private readonly zipCodeField: Locator;
    private readonly mobileNumberField: Locator;
    private readonly createAccountButton: Locator;
    private readonly continueButton: Locator;
    
    constructor(page: Page) {
        super(page);
        this.mrRadioButton = page.getByLabel('Mr.');
        this.passwordField = page.getByLabel('Password');
        this.dayOfBirthDropdown = page.locator('#days');
        this.monthOfBirthDropdown = page.locator('#months');
        this.firstNameField = page.getByLabel('First name');
        this.lastNameField = page.getByLabel('Last name');
        this.addressField = page.locator('#address1');
        this.stateField = page.getByLabel('State');
        this.cityField = page.getByLabel('City');
        this.zipCodeField = page.locator('[data-qa="zipcode"]');
        this.mobileNumberField = page.getByLabel('Mobile Number');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async clickOnMrButton() {
        await this.elementActions.clickOnElement(this.mrRadioButton);
        return this;
    }

    async enterPassword(password: string) {
        await this.elementActions.setElementText(this.passwordField, password);
        return this;
    }

    async selectDayOfBirth(day: string) {
        await this.elementActions.selectDropdownOptionByText(this.dayOfBirthDropdown, day);
        return this;
    }

    async selectMonthOfBirth(index: number) {
        await this.elementActions.selectDropdownOptionByIndex(this.monthOfBirthDropdown, index);
        // await this.monthOfBirthDropdown.selectOption({ index: index });
    }

    async enterFirstName(firstName: string) {
        await this.elementActions.setElementText(this.firstNameField, firstName);
    }

    async enterLastName(lastName: string) {
        await this.elementActions.setElementText(this.lastNameField, lastName);
    }

    async enterAddress(address: string) {
        await this.elementActions.setElementText(this.addressField, address);
    }

    async enterState(state: string) {
        await this.elementActions.setElementText(this.stateField, state);
    }

    async enterCity(city: string) {
        await this.elementActions.setElementText(this.cityField, city);
    }

    async enterZipCode(zipcode: string) {
        await this.elementActions.setElementText(this.zipCodeField, zipcode);
    }

    async enterMobileNumber(mobileNumber: string) {
        await this.elementActions.setElementText(this.mobileNumberField, mobileNumber);
    }

    async clickOnCreateAccountButton() {
        await this.elementActions.clickOnElement(this.createAccountButton);
    }

    async clickOnContinueButton() {
        await this.elementActions.clickOnElement(this.continueButton);
    }

    async fillRegistrationDataAndConfirm(password: string, dayOfBirth: string, monthOfBirth: number, firstName: string, lastName: string, address: string, state: string, city: string, zipcode: string, mobileNumber: string) {
        await this.clickOnMrButton();
        await this.enterPassword(password);
        await this.selectDayOfBirth(dayOfBirth);
        await this.selectMonthOfBirth(monthOfBirth);
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterAddress(address);
        await this.enterState(state);
        await this.enterCity(city);
        await this.enterZipCode(zipcode);
        await this.enterMobileNumber(mobileNumber);
        await this.clickOnCreateAccountButton();
    }
}