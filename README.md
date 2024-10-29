### Web automation tech test using Playwright | Typescript | Page Object Model
This project is created as a technical test assignment for SearchLight Cyber.

#### Web App Under Test
- URL: https://freelance-learn-automation.vercel.app

#### Specifications
- OS : windows11
- IDE : Visual Studio Code
- Programming language : Typescript
- Framework : Playwright (^1.44.1)
- Node : v18.17.1
- npm : 10.7.0
 
### Installation

To run this project, user will need to install 
- dependencies   
- devDependencies 

- Clone (OR) Download this repo as zip folder on to your local machine

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

Make sure to install below dependencies in order to run the tests on your local:

Install Node Package Manager:
```bash
npm install
```

Install Playwright:
```bash
npm install playwright
npm install @playwright/test (In case if not already included)
```

### Test Framework overview

```
PLAYWRIGHT
├── allure-report
├── allure-results
├── logs
├── node_modules
├── pages
│   ├── basePage.ts
│   ├── cartPage.ts
│   ├── coursesDashboardPage.ts
│   ├── homePage.ts
│   ├── loginPage.ts
│   ├── signupPage.ts
├── playwright-report
├── test-results
├── testdata
│   └── testData.ts
├── tests
│   ├── coursesTest.spec.ts
│   ├── signupTest.spec.ts
├── utils
│   └── logger.ts
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md

```
#### This test framework uses Page Object Model.

- Page classes are under ../pages/pageName.js
Page classes contain web page elements and all interactions with the elements.

- Test classes are under ../tests/testName.spec.ts

- Utils contain LoggerFile

- playwright.config.js has configuration for test environment, reporters, browsers


### Commands to Run application

1.Run all test on a specific browser
```
npx playwright test  --headed --project=chromium

``` 
### Commands to Run allure - report 

1. npm run allure:clean
2. npm run allure:open
3. npm run allure:generate


#### Playwright Test Report 

Playwright-html report will be auto-generated and auto-opened after each test run.

#### Additional Resources

https://playwright.dev/docs/intro#installing-playwright

## Test Scenarios Structure

## 1. Sign Up Page test suite

Scenarios that is covered:
- Test 1: Verify user should sign up successfully with valid data
- Test 2: Verify user should get error message if user already regiestered
- Test 3:Verify error message when Password length is less than minimum 6 characters

## 2. Course test enrollement  

Scenarios that is tested:
- Test 1: Verify three coureses should enrolled successfully
