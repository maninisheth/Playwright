import { Page } from '@playwright/test';

export class BasePage {
	page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async navigateTo(url: string) {
		await this.page.goto(url);
	}

	async getTitle() {
		return await this.page.title();
	}

	async clickOn(locator) {
		await locator.click();
	}

	async getText(locator) {
		return locator.textContent();
	}

	async isVisible(locator) {
		return await locator.isVisible();
	}

	async getUrl() {
		return await this.page.url();
	}

	async fill(locator, value) {
		await locator.fill(value);
	}

	async waitForPageLoad() {
		return await this.page.waitForLoadState('domcontentloaded');
	}

	async waitUntilTimeOut() {
		return await this.page.waitForTimeout(3000);
	}

	async waitForElement(locator) {
		return await locator.waitFor();
	}

	async selectValueFromDropdown(locator, text) {
		return await locator.selectOption({ value: text });
	}
}
