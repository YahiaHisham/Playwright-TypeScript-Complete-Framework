import { Locator, Page } from '@playwright/test'
import { ElementActions } from './ElementActions';
import { ValidationHelper } from '../../tests/utilities/testsHelper/ValidationHelper';
export class PageBase {

  protected readonly page: Page;
  protected elementActions: ElementActions;
  protected validationHelper: ValidationHelper;

  constructor(page: Page) {
    this.page = page;
    this.elementActions = new ElementActions(page);
    this.validationHelper = new ValidationHelper(page);
  }  

}