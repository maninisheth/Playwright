import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';
import { testData } from '../testdata/testData';

let homePage: HomePage;
let loginPage: LoginPage;
let signupPage: SignupPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  signupPage = new SignupPage(page);
  await homePage.openApp();
 
});


test('Test 1:Verify user should sign up successfully with valid data', async ({ page }) => {
  await homePage.clickMenu();
  await homePage.clickLogin();
  await loginPage.clickSignupLink();

  await signupPage.enterName(testData.name);
  await signupPage.enterEmail(testData.getEmail());
  await signupPage.enterPassword(testData.password);

  await signupPage.checkMultipleInterestCheckboxes(testData.interests);
  await signupPage.selectGender();
  await signupPage.selectState(testData.state);
  await signupPage.selectHobbies(testData.hobbyOptions);
  await signupPage.clickSignUpButton();
  const actualText = await loginPage.getSignupSuccessText();
  expect(actualText).toBe('Signup successfully, Please login!');
});


test('Test 2:Verify user should get error message if user already regiestered', async ({ page }) => {
  await homePage.clickMenu();
  await homePage.clickLogin();
  await loginPage.clickSignupLink();
  
  await signupPage.enterName(testData.name);
  await signupPage.enterEmail(testData.existingEmail);
  await signupPage.enterPassword(testData.password);

  await signupPage.checkMultipleInterestCheckboxes(testData.interests);
  await signupPage.selectGender();
  await signupPage.selectState(testData.state);
  await signupPage.selectHobbies(testData.hobbyOptions);
  await signupPage.clickSignUpButton();
  const errorText = await signupPage.getErrorMessage();
  expect(errorText).toBe(' Email already registered!');
});

test('Test 3:Verify error message when Password length is less than minimum 6 characters', async ({ page }) => {
  await homePage.clickMenu();
  await homePage.clickLogin();
  await loginPage.clickSignupLink();
  
  await signupPage.enterName(testData.name);
  await signupPage.enterEmail(testData.existingEmail);
  await signupPage.enterPassword(testData.invalidPassword);

  await signupPage.checkMultipleInterestCheckboxes(testData.interests);
  await signupPage.selectGender();
  await signupPage.selectState(testData.state);
  await signupPage.selectHobbies(testData.hobbyOptions);
  await signupPage.clickSignUpButton();
  const errorText = await signupPage.getErrorMessage();
  expect(errorText).toBe(' Password must be of atleast 6 characters');
});