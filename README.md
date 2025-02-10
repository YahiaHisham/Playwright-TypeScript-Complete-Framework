# Playwright Automation Exercise using TypeScript

## Project Description
In this project, I aimed to practice and perfect my skills in automated testing using Playwright with TypeScript. The primary goal was to create a robust and scalable test automation framework that could handle various testing scenarios efficiently. For reporting, I integrated both HTML and Allure reporting to provide comprehensive insights into the test execution results.

## Technologies Used
- **Playwright**: For browser automation and end-to-end testing.
- **TypeScript**: To leverage static typing and modern JavaScript features.
- **Allure Reporting**: For generating detailed and visually appealing test reports.
- **HTML**: For custom reporting and visualization.
- **Faker.js**: For generating random test data.
- **Json Files**: to store test data
- **Node.js**: As the runtime environment.

## Design Pattern
I implemented the **Page Object Model (POM)** design pattern to enhance the maintainability and readability of the test scripts. POM allows for the separation of test logic from the page-specific code, making the tests more modular and easier to manage.

## Table of Contents
- [System requirements](#system-requirements)
- [Installation and Running Tests](#installation-and-running-tests)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Author](#author)

## System requirements
- [Node.js 18+ - Click To Download](https://nodejs.org/en/download/package-manager/current)
- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
- macOS 13 Ventura, or later.
- Debian 12, Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture

## Installation and Running Tests
To install the necessary dependencies, run:
```sh
npm install
```

To run the tests, use:
```sh
npx playwright test
```
To run the tests and auto generate Allure report after execution use the following command:

```sh
npm run test
```

To run the tests with the UI, use:
```sh
npx playwright test --ui
```

To generate and open the Allure report, use:
```sh
npm run report
```

To run the tests for with specific tag:

```sh
npx playwright test --grep "@smoke"
```
### Generating Reports

To generate a report, use the following command:

```sh
npm run report
```
## Project Structure

```plaintext
project-root/
├── pages/                   # Contains all the pages with it's locators and actions
├── tests/                   # Test files
│   ├── data/                # All test data used in test cases
│   │   ├── images/          # Images used in testing data
│   │   ├── jsonFiles/       # Json files that contains test data
│   ├── testClasses/         # Test files that contains test cases
│   └── utilities/           # utilities classes that supports test cases execution
├── package.json             # Manages the project's metadata, dependencies, and scripts.
├── playwright.config        # Configuration for Playwright tests, including settings for browsers, test timeouts, retries, and reporting.
├── README.md                # Project documentation
└── .gitignore               # Git ignore rules
```

## Author
This project is maintained by:

**Yahia Hisham**  
*Senior Software Test Automation Engineer*  
Based in Cairo, Egypt  

Feel free to reach out for inquiries or contributions:  
- **Email**: [yahia.hisham65@gmail.com](mailto:yahia.hisham65@gmail.com)  
- **LinkedIn**: [Yahia Hisham](https://www.linkedin.com/in/yahia-hisham/)  
- **GitHub**: [Yahia Hisham](https://github.com/YahiaHisham)  

---