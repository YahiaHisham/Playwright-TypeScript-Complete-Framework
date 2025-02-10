/**
 * <h1>Validation Helper</h1>
 * A helper class to handle Playwright assertions for UI validation.
 * This class provides a set of reusable assertion methods to improve test maintainability.
 * 
 * @version 1.1
 */

import fs from 'fs';
import { Locator, Page } from "playwright";
import { expect } from '@playwright/test';
import path from "path";

export class ValidationHelper {

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Assert that two text values are equal.
   * @param {string} actualValue - The actual text value.
   * @param {string} expectedValue - The expected text value.
   */
  async assertTextEquals(actualValue: string, expectedValue: string) {
    expect(actualValue).toBe(expectedValue);
  }

  /**
   * Asserts that an element contains the expected text.
   * @param {Locator} elementLocator - The locator of the element.
   * @param {string} expectedText - The expected text of the element.
   */
  async assertElementText(elementLocator: Locator, expectedText: string) {
    await expect(elementLocator).toHaveText(expectedText);
  }

  /**
   * Asserts that an element contains the expected partial text.
   * @param {Locator} elementLocator - The locator of the element.
   * @param {string} expectedText - The partial text expected in the element.
   */
  async assertElementContainsText(elementLocator: Locator, expectedText: string) {
    await expect(elementLocator).toContainText(expectedText);
  }

  /**
   * Assert that a condition is true.
   * @param {boolean} actualValue - The boolean value to assert.
   */
  async assertTrue(actualValue: boolean) {
    expect(actualValue).toBeTruthy();
  }

  /**
   * Assert that a condition is false.
   * @param {boolean} actualValue - The boolean value to assert.
   */
  async assertFalse(actualValue: boolean) {
    expect(actualValue).toBeFalsy();
  }

  /**
   * Assert that a string contains a substring.
   * @param {string} fullText - The full text value.
   * @param {string} substring - The substring that should be present.
   */
  async assertTextContains(fullText: string, substring: string) {
    expect(fullText).toContain(substring);
  }

  /**
   * Assert that an element is visible on the page.
   * @param {Locator} elementLocator - The locator of the element.
   */
  async assertObjectVisible(elementLocator: Locator) {
    await expect(elementLocator).toBeVisible();
  }

  /**
   * Assert that an element is hidden on the page.
   * @param {Locator} elementLocator - The locator of the element.
   */
  async assertObjectHidden(elementLocator: Locator) {
    await expect(elementLocator).toBeHidden();
  }

  /**
   * Assert that an element is disabled.
   * @param {Locator} elementLocator - The locator of the element.
   */
  async assertObjectDisabled(elementLocator: Locator) {
    await expect(elementLocator).toBeDisabled();
  }

  /**
   * Assert that an element is enabled.
   * @param {Locator} elementLocator - The locator of the element.
   */
  async assertObjectEnabled(elementLocator: Locator) {
    await expect(elementLocator).toBeEnabled();
  }

  /**
   * Assert that an element is checked (e.g., checkbox or radio button).
   * @param {Locator} elementLocator - The locator of the element.
   */
  async assertObjectChecked(elementLocator: Locator) {
    await expect(elementLocator).toBeChecked();
  }

  /**
   * Assert that an element is NOT checked.
   * @param {Locator} elementLocator - The locator of the element.
   */
  async assertObjectNotChecked(elementLocator: Locator) {
    await expect(elementLocator).not.toBeChecked();
  }

  /**
   * Assert that an element is editable.
   * @param {Locator} elementLocator - The locator of the element.
   */
  async assertObjectEditable(elementLocator: Locator) {
    await expect(elementLocator).toBeEditable();
  }

  /**
   * Assert that an element has a specific attribute value.
   * @param {Locator} elementLocator - The locator of the element.
   * @param {string} attributeName - The name of the attribute.
   * @param {string} expectedValue - The expected attribute value.
   */
  async assertObjectAttributeValue(elementLocator: Locator, attributeName: string, expectedValue: string) {
    await expect(elementLocator).toHaveAttribute(attributeName, expectedValue);
  }

  /**
   * Assert that an element's text is NOT null.
   * @param {string} elementText - The text of the element.
   */
  async assertElementTextNotNull(elementText: string) {
    expect(elementText).not.toBeNull();
  }

  /**
   * Assert that an element's text is NOT empty.
   * @param {string} elementText - The text of the element.
   */
  async assertElementTextNotEmpty(elementText: string) {
    expect(elementText).not.toBe('');
  }

  /**
   * Assert that the page title matches the expected title.
   * @param {string} expectedTitle - The expected title.
   */
  async assertPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Assert that the current page URL matches the expected URL.
   * @param {string} expectedURL - The expected page URL.
   */
  async assertPageURL(expectedURL: string) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  /**
   * Assert that a list of words exists in the provided element locator.
   * @param {Locator} cardsLocator - The locator of elements that contain text.
   * @param {string[]} wordsArray - The array of words to check.
   * @returns {Promise<boolean>} - True if all words exist, false otherwise.
   */
  async assertTextExistsInCards(cardsLocator: Locator, wordsArray: string[]): Promise<boolean> {
    await this.page.waitForLoadState('domcontentloaded');
    const cardCount = await cardsLocator.count();

    for (const word of wordsArray) {
      let wordFound = false;
      for (let i = 0; i < cardCount; i++) {
        const cardText = await cardsLocator.nth(i).textContent();
        if (cardText && cardText.includes(word)) {
          wordFound = true;
          break;
        }
      }
      if (!wordFound) {
        return false;
      }
    }
    return true;
  }

  /**
   * Assert that text does not exist in an element.
   * @param {Locator} elementLocator - The locator of the element.
   * @param {string} text - The text that should NOT be present.
   */
  async assertTextDoesNotExist(elementLocator: Locator, text: string) {
    await expect(elementLocator).not.toContainText(text);
  }

  /**
   * Assert that an element has a specific CSS class.
   * @param {Locator} elementLocator - The locator of the element.
   * @param {string} expectedClass - The expected class name.
   */
  async assertElementHasClass(elementLocator: Locator, expectedClass: string) {
    await expect(elementLocator).toHaveClass(expectedClass);
  }

  /**
   * Assert the count of elements matching a specific locator.
   * @param {Locator} elementLocator - The locator of the elements.
   * @param {number} expectedCount - The expected number of elements.
   */
  async assertObjectCount(elementLocator: Locator, expectedCount: number) {
    await expect(elementLocator).toHaveCount(expectedCount);
  }

  /**
   * Checks if an element is displayed on the page.
   * @param {Locator} elementLocator - The locator of the element.
   * @returns {Promise<boolean>} - True if the element is visible, false otherwise.
   */
  async isElementDisplayed(elementLocator: Locator) {
    return await elementLocator.isVisible();
  }

  /**
   * this method takes the locator of download button in its parameter and then its downloads the file and saves it and then deletes it after successfully asserting its downloaded
   * @param {*} downloadButtonLocator the locator of the download button
   */
  async downloadFileAndAssertItExists(downloadButtonLocator) {
    // Wait for the download to start
    const downloadPromise = this.page.waitForEvent('download');
    await downloadButtonLocator.click(); // Replace with your download button locator
    const download = await downloadPromise;

    // Suggested filename from the download
    const fileName = await download.suggestedFilename();

    // Set the download path
    const downloadPath = path.resolve('./downloads', fileName);
    await download.saveAs(downloadPath);

    // Assert the file exists
    const fileExists = fs.existsSync(downloadPath);
    if (!fileExists) {
      throw new Error(`File not found: ${downloadPath}`);
    }

    console.log(`File downloaded successfully: ${downloadPath}`);

    // deletes the downloaded file after asserting it exists
    if (fileExists) {
      fs.unlinkSync(downloadPath);
    }
  }
  
}
