import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import logger from '../utils/logger';

export class LoginPage extends BasePage {
  page: Page;
  signupLink: Locator;
  signupSuccessText: Locator;
  email: Locator;
  password: Locator;
  signIn: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.signupLink = page.locator('a.subLink[href="/signup"]');
    this.signupSuccessText = page.locator('//div[@class="Toastify__toast-body"]/div[text()="Signup successfully, Please login!"]');
    this.email = page.locator("#email1");
    this.password = page.locator("#password1");
    this.signIn = page.locator("//button[contains(text(),'Sign in')]");
  }


  async getPageTitle() {
    logger.info('Retrieving the page title');
    return await super.getTitle();
  }

  async clickSignupLink() {
    logger.info('Clicking on the "Sign Up" link');
    await this.clickOn(this.signupLink);
  }

  async enterEmail(email: string) {
    logger.info(`Entering email: ${email}`);
    await this.fill(this.email, email);
  }


  async enterPassword(password: string) {
    logger.info(`Entering password: ${password}`);
    await this.fill(this.password, password);
  }

  async clickSignIn() {
    logger.info('Clicking on the "Sign In" button');
    await this.clickOn(this.signIn);
  }

  async getSignupSuccessText() {
    logger.info('Waiting for the signup success message');
    await this.waitForElement(this.signupSuccessText);
    const text = await this.getText(this.signupSuccessText);
    logger.info(`Signup success message: ${text}`);
    return text || '';
  }
}