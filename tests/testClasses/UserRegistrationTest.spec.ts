import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage'
import { SignupLoginPage } from '../../pages/SignupLoginPage';
import { SignupPage } from '../../pages/SignupPage';
import { faker } from '@faker-js/faker'
import * as allure from "allure-js-commons";
import JsonReader from '../utilities/readers/JsonReader';
import { HeaderPage } from '../../pages/HeaderPage';
import { DatabaseQuires } from '../utilities/database/DataBaseQuires';
import { ValidationHelper } from '../utilities/testsHelper/ValidationHelper';
import { TestDataGenerator } from '../utilities/generators/TestDataGenerator';

test.beforeEach('navigate to starting page', async ({ page }) => {
    // this is to read te base URL from playwright.config file
    await page.goto('/');
    await new HeaderPage(page).clickOnSignupLoginButton();
});

test('verify that user can register using valid data @smoke @regression', async ({ page }) => {
    await allure.displayName("Register with valid data");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Registration");
    await allure.story("As User, I want to register using valid data");
    await allure.suite("Regression Test");

    const randomFullName = faker.person.fullName();
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await test.step('open sigun login page', async () => {
        await new HeaderPage(page).clickOnSignupLoginButton();
    });

    await test.step('enter signup data', async () => {
        await new SignupLoginPage(page).enterSignupData(randomFullName, randomEmail);
    });

    await test.step('fill registration data and confirm', async () => {
        await new SignupPage(page).fillRegistrationDataAndConfirm(JsonReader.getValueFromJsonFile("password", "Credentials"), faker.number.int({ max: 30 }).toString(), faker.number.int({ max: 12 }), faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.state()
            , faker.location.city(), faker.location.zipCode(), faker.phone.number());
            await new ValidationHelper(page).assertPageTitle(JsonReader.getValueFromJsonFile('AccountCreatedMessage', 'ValidationMessages'));            
    });
    

});

test('verify that user can Delete his account @smoke @regression', async ({ page }) => {
    await allure.displayName("Add Products To Cart");
    await allure.owner("Yahia Hisham");
    await allure.severity("critical");
    await allure.epic("Web");
    await allure.feature("Registration");
    await allure.story("As User, I want to delete my account after registration");
    await allure.suite("Smoke Test");

    const randomFullName = faker.person.fullName();
    const randomEmail = `${faker.person.firstName()}${faker.number.int(1000)}@test.com`;
    await new HeaderPage(page).clickOnSignupLoginButton();
    await new SignupLoginPage(page).enterSignupData(randomFullName, randomEmail);
    await new SignupPage(page).fillRegistrationDataAndConfirm(JsonReader.getValueFromJsonFile("password", "Credentials"), faker.number.int({ max: 30 }).toString(), faker.number.int({ max: 12 }), faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.state()
        , faker.location.city(), faker.location.zipCode(), faker.phone.number());
    await expect(page).toHaveTitle(JsonReader.getValueFromJsonFile('AccountCreatedMessage', 'ValidationMessages'));
    await new SignupPage(page).clickOnContinueButton();
    await new HomePage(page).clickOnDeleteAccountButton();
    expect(await new HomePage(page).getAccountDeletionMessage()).toEqual(JsonReader.getValueFromJsonFile('AccountDeletedMessage', 'ValidationMessages'));
});

test('example on DB connection', async () => {
    console.log("Start Of Test" )
    const { username, password } = test.info().project.use['loginCredentials'];
    // Start of Database Connection
    const dbQuires = new DatabaseQuires();
    const projectsdatabase = test.info().project.use['database'];
    console.log("project DB" ,projectsdatabase);
    console.log("User Name: " ,username);
    console.log("Password: " ,password);
    // End of Database Connection
});

test('generate test data', async () => {
    console.log("Full Name:", TestDataGenerator.getFullName());
    console.log("Email:", TestDataGenerator.getEmail());
    console.log("Phone:", TestDataGenerator.getPhoneNumber());
    console.log("Random Number (5 digits):", TestDataGenerator.getRandomNumber(5));
    console.log("Random Password (10 chars):", TestDataGenerator.getRandomPassword(10));
    console.log("Company Name:", TestDataGenerator.getCompanyName());
    console.log("City:", TestDataGenerator.getCity());
    console.log("UUID:", TestDataGenerator.getUUID());
    console.log("Random String (10 chars):", TestDataGenerator.getRandomChars(10));
});
