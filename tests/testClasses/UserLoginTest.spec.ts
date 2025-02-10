import { test, expect } from '@playwright/test';
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { faker } from '@faker-js/faker'
import JsonReader from '../utilities/readers/JsonReader';
import { HeaderPage } from '../../pages/HeaderPage';
import * as allure from "allure-js-commons";

test.beforeEach('navigate to starting page', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnSignupLoginButton();
});

test('verify that user cant login using invalid credentials @smoke @regression', async ({ page }) => {
    await allure.displayName("Login with invalid credentials");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Login");
    await allure.story("As User, I want to login using valid credentials only");
    await allure.suite("Regression Test");

    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new SignupLoginPage(page).enterLoginData(randomEmail, JsonReader.getValueFromJsonFile('password', 'Credentials'));
    await new SignupLoginPage(page).clickOnLoginButton();
    await expect(await new SignupLoginPage(page).getInvalidLoginCredentialsMessage()).toEqual(JsonReader.getValueFromJsonFile('InvalidLoginCredentialsMessage', 'ValidationMessages'));
});