/**
 * <h1>Element Actions</h1>
 * Helper class to handle element actions in Playwright, such as clicking, entering text, retrieving text, hovering, file uploads, and handling new tabs.
 * 
 * @version 1.2
 */

import { Locator, Page } from '@playwright/test';

export class ElementActions {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Click on an element.
     * @param {Locator} elementLocator - The locator of the element to click.
     */
    async clickOnElement(elementLocator: Locator) {
        await elementLocator.click();
    }

    /**
     * Uploads a file to an input field.
     * @param {Locator} fileInputLocator - The locator of the file input element.
     * @param {string} filePath - The absolute path of the file to upload.
     */
    async uploadFile(fileInputLocator: Locator, filePath: string) {
        await fileInputLocator.setInputFiles(filePath);
    }

    /**
     * Clicks on an element that opens a new tab and switches focus to the new tab.
     * @param {Locator} buttonLocator - The locator of the button that opens the new tab.
     * @returns {Promise<Page>} - The newly opened tab.
     */
    async clickAndSwitchToNewTab(buttonLocator: Locator): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Wait for new tab to open
            buttonLocator.click() // Click the button
        ]);
        await newPage.waitForLoadState(); // Ensure the new page is loaded
        return newPage; // Return the new tab so the user can interact with it
    }

    /**
     * Double-click on an element.
     * @param {Locator} elementLocator - The locator of the element to double-click.
     */
    async doubleClickOnElement(elementLocator: Locator) {
        await elementLocator.dblclick();
    }

    /**
     * Right-click on an element (context click).
     * @param {Locator} elementLocator - The locator of the element to right-click.
     */
    async rightClickOnElement(elementLocator: Locator) {
        await elementLocator.click({ button: 'right' });
    }

    /**
     * Sends text to an input field.
     * @param {Locator} elementLocator - The locator of the input field.
     * @param {string} text - The text to enter.
     */
    async setElementText(elementLocator: Locator, text: string) {
        await elementLocator.fill(text);
    }

    /**
     * Clears the text inside an input field.
     * @param {Locator} elementLocator - The locator of the input field.
     */
    async clearElementText(elementLocator: Locator) {
        await elementLocator.fill('');
    }

    /**
     * Retrieves the visible text of an element.
     * @param {Locator} elementLocator - The locator of the element.
     * @returns {Promise<string>} - The text content of the element.
     */
    async getText(elementLocator: Locator): Promise<string> {
        return await elementLocator.innerText();
    }

    /**
     * Moves the mouse over an element.
     * @param {Locator} elementLocator - The locator of the element to hover over.
     */
    async hoverOverElement(elementLocator: Locator) {
        await elementLocator.hover();
    }

    /**
     * Hovers over an element and then clicks it.
     * @param {Locator} elementLocator - The locator of the element.
     */
    async hoverAndClick(elementLocator: Locator) {
        await this.hoverOverElement(elementLocator);
        await elementLocator.click();
    }

    /**
     * Scrolls the page to make an element visible in the viewport.
     * @param {Locator} elementLocator - The locator of the element to scroll to.
     */
    async scrollToElement(elementLocator: Locator) {
        await elementLocator.scrollIntoViewIfNeeded();
    }

    /**
     * Selects an option from a dropdown by its value attribute.
     * @param {Locator} dropdownLocator - The locator of the dropdown.
     * @param {string} value - The value of the option to select.
     */
    async selectDropdownOptionByValue(dropdownLocator: Locator, value: string) {
        await dropdownLocator.selectOption({ value });
    }

    /**
     * Selects an option from a dropdown by its visible text.
     * @param {Locator} dropdownLocator - The locator of the dropdown.
     * @param {string} text - The visible text of the option to select.
     */
    async selectDropdownOptionByText(dropdownLocator: Locator, text: string) {
        await dropdownLocator.selectOption({ label: text });
    }

    /**
     * Selects an option from a dropdown by its index.
     *  * Selects an option by its index.
     * @param {Locator} dropdownLocator - The locator of the dropdown.
     * @param {number} index - The zero-based index of the option to select.
     */
    async selectDropdownOptionByIndex(dropDownLocator: Locator, index: number) {
        await dropDownLocator.selectOption({ index });
    }

    /**
     * Drags an element and drops it onto a target element.
     * @param {Locator} sourceElementLocator - The locator of the element to drag.
     * @param {Locator} targetElementLocator - The locator of the element to drop onto.
     */
    async dragAndDropElement(sourceElementLocator: Locator, targetElementLocator: Locator) {
        await sourceElementLocator.dragTo(targetElementLocator);
    }

    /**
     * Presses a keyboard key while focused on an element.
     * @param {Locator} elementLocator - The locator of the element.
     * @param {string} key - The key to press (e.g., "Enter", "Escape", "ArrowDown").
     */
    async pressKeyboardKey(elementLocator: Locator, key: string) {
        await elementLocator.press(key);
    }

    /**
     * Waits for an element to be visible on the page.
     * @param {Locator} elementLocator - The locator of the element.
     * @param {number} timeout - The timeout in milliseconds (default: 5000ms).
     */
    async waitForElementToBeVisible(elementLocator: Locator, timeout: number = 5000) {
        await elementLocator.waitFor({ state: 'visible', timeout });
    }

    /**
     * Waits for an element to be hidden or removed from the page.
     * @param {Locator} elementLocator - The locator of the element.
     * @param {number} timeout - The timeout in milliseconds (default: 5000ms).
     */
    async waitForElementToBeHidden(elementLocator: Locator, timeout: number = 5000) {
        await elementLocator.waitFor({ state: 'hidden', timeout });
    }
}
