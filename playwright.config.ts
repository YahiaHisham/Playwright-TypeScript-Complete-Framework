// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000, 
  expect: {
    timeout: 60000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'allure-playwright',
  // reporter: 'html',
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html'],
    ['monocart-reporter', {  
      name: "Testing Report",
       outputFile: './monocart-report/index.html'
    }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
    headless: true,
    trace: 'on-first-retry', // Record video for each test, but remove all videos from successful test runs
    screenshot:'on',
    video:'on',
    timeout: 60000,
    launchOptions:{
    slowMo:200
        }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Proj1Staging',
      use: { ...devices['Desktop Chrome'],
        baseURL: "https://automationexercise.com",
        loginCredentials:{
          username: "admin",
          password: "admin123"
        },
        database:{
          user:"user",
           password:"password",
           server:"1.1.1.1", // Use the IP address directly
           database:"dataBaseName",
           port:1111,
           options: {
             encrypt: false, // Use this if you're on Windows Azure
             cryptoCredentialsDetails: {
                 minVersion: 'example', // Adjust according to your SQL Server configuration
                 maxVersion: 'example', // Adjust according to your SQL Server configuration
                 trustServerCertificate: true, // Accept self-signed certificate
               },
            },
         
           },
       },
    },

    {
      name: 'Proj1QC',
      use: { ...devices['Desktop Chrome'],
        baseURL: "https://automationexercise.com",
        loginCredentials:{
          username: "adminadmin",
          password: "admin123admin"
        },
        database:{
          user:"user",
           password:"password",
           server:"1.1.1.1", // Use the IP address directly
           database:"dataBaseName",
           port:2222,
           options: {
             encrypt: false, // Use this if you're on Windows Azure
             cryptoCredentialsDetails: {
                 minVersion: 'example', // Adjust according to your SQL Server configuration
                 maxVersion: 'example', // Adjust according to your SQL Server configuration
                 trustServerCertificate: true, // Accept self-signed certificate
               },
            },
           },
       },
    },

    {
      name: 'Proj1Production',
      use: { ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

