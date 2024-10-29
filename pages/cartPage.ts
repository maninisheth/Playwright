import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import logger from '../utils/logger';

export class CartPage extends BasePage {
    page: Page;
    course: (courseName: string) => Locator;
    enrollNow: Locator;
    addressInput: Locator;
    phoneNumberInput: Locator;
    modalEnrollNowButton: Locator;
    enrollSucessText: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.course = (courseName: string) => this.page.locator(`.course-card:has(h2:has-text("${courseName}"))`);
        this.enrollNow = this.page.locator("button:has-text('Enroll Now')");
        this.addressInput = page.locator('textarea#address'); 
        this.phoneNumberInput = page.locator('input#phone'); 
        this.modalEnrollNowButton = page.locator('.modal-footer button:has-text("Enroll Now")');
        this.enrollSucessText = page.locator('.modal-body h4.uniqueId');
    }

    async isCourseInCart(courseName: string): Promise<boolean> {
        const isVisible = await this.course(courseName).isVisible();
        logger.info(`Course "${courseName}" visibility in the cart: ${isVisible}`);
        return isVisible;
    }

    async clickEnrollNow() {
        logger.info('Clicking the "Enroll Now" button');
        await this.clickOn(this.enrollNow);
    }

    async fillModalForm(address: string, phoneNumber: string) {
        logger.info('Filling the enrollment modal form');
        await this.fill(this.addressInput, address);
        await this.fill(this.phoneNumberInput, phoneNumber);
    }

    
    async submitModalForm() {
        logger.info('Submitting the modal form by clicking the "Enroll Now" button in the modal');
        await this.clickOn(this.modalEnrollNowButton);
    }

    async getEnrollSuccessMessage(): Promise<string> {
        const messageText = await this.enrollSucessText.textContent();
        logger.info(`Order ID message: ${messageText}`);
        return messageText?.trim() || ''; 
    }
}