import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import logger from '../utils/logger';

export class CoursesDashboardPage extends BasePage {
  page: Page;
  headerText: Locator;
  login: Locator;
  course: (courseName: string) => Locator;
  addToCart: (courseName: string) => Locator;
  cartButton: Locator;
  cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.headerText = page.locator("h1");
    this.course = (courseName: string) => this.page.locator(`.course-card:has(h2:has-text("${courseName}"))`);
    this.addToCart = (courseName: string) => this.course(courseName).locator('button:has-text("Add to Cart")').first();
    this.cartButton = page.locator('button.cartBtn');
    this.cartCount = page.locator('button.cartBtn .count');
  }

  async getHeaderText() {
    const text = await this.headerText.textContent();
    logger.info(`Header text: ${text}`);
    return text?.trim() || ''; // Trim and handle null case
  }

  async clickAddToCart(courseName: string) {
    logger.info(`Clicking "Add to Cart" for the first course: ${courseName}`);
    await this.clickOn(this.addToCart(courseName));
  }

  async clickCart() {
    logger.info('Clicking on the Cart button');
    await this.clickOn(this.cartButton);
  }

  async getCartCount() {
    const countText = await this.cartCount.textContent();
    const count = parseInt(countText?.trim() || '0', 10);
    logger.info(`Cart count: ${count}`);
    return count;
  }


}