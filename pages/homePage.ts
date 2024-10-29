import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import logger from '../utils/logger';

export class HomePage extends BasePage {
  page: Page;
  navBarMenu: Locator;
  login: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.navBarMenu = page.locator("//img[@alt='menu']");
    this.login = page.locator("//button[normalize-space()='Log in']");
  }

  async openApp() {
    logger.info('Opening the application URL: https://freelance-learn-automation.vercel.app');
    await this.page.goto('https://freelance-learn-automation.vercel.app');
  }

  async clickMenu() {
    logger.info('Clicking on the navigation menu button');
    await this.clickOn(this.navBarMenu);
  }

  async clickLogin() {
    logger.info('Clicking on the "Log in" button');
    await this.clickOn(this.login);
  }

}