import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import logger from '../utils/logger';

export class SignupPage extends BasePage {
    page: Page;
    signup: Locator;
    name: Locator;
    email: Locator;
    password: Locator;
    interestsCheckboxes: Locator;
    genderFemale: Locator;
    stateDropdown: Locator;
    hobbiesDropdown: Locator;
    signUpButton: Locator;
    errorMessage: Locator;
   

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.signup = page.locator('.header');
        this.name = page.locator('#name');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        //  this.interestsCheckboxes = page.locator("//div[@class='interests-div']//input");
        this.interestsCheckboxes = page.locator("//div[@class='interests-div']//input[@type='checkbox']");
        this.genderFemale = page.locator("input[type='radio'][value='Female']");
        this.stateDropdown = page.locator('#state');
        this.hobbiesDropdown = page.locator('#hobbies');
        this.signUpButton = page.locator('button.submit-btn');
        this.errorMessage = page.locator('h2.errorMessage');
    }


    async enterName(name: string) {
        logger.info(`Entering name: ${name}`);
        await this.fill(this.name, name);
    }

    async enterEmail(email: string) {
        logger.info(`Entering email: ${email}`);
        await this.fill(this.email, email);
    }

    async enterPassword(password: string) {
        logger.info(`Entering password.`);
        await this.fill(this.password, password);
    }


    async checkMultipleInterestCheckboxes(labels: string[]) {
        logger.info(`Selecting multiple interest checkboxes: ${labels.join(', ')}`);
        for (const label of labels) {
            await this.checkInterestCheckbox(label);
        }
    }

    async checkInterestCheckbox(labelText: string) {
        logger.info(`Selecting interest checkbox with label: ${labelText}`);
        const checkboxLocator = this.page.locator(`//label[text()='${labelText}']/preceding-sibling::div/input[@type='checkbox']`);
        await checkboxLocator.check();
    }

    async selectGender() {
        logger.info('Selecting gender: Female');
        await this.clickOn(this.genderFemale);
    }

    async selectState(state: string) {
        logger.info(`Selecting state: ${state}`);
        await this.selectValueFromDropdown(this.stateDropdown, state);
    }

    async selectHobbies(hobbies: string[]) {
        logger.info(`Selecting hobbies: ${hobbies.join(', ')}`);
        await this.hobbiesDropdown.selectOption(hobbies);
    }

    async clickSignUpButton() {
        logger.info('Waiting for Sign Up button to be enabled');
        await this.waitForElement(this.signUpButton);
        while (!(await this.signUpButton.isEnabled())) {
            logger.info('Sign Up button is not yet enabled, waiting...');
            await this.waitUntilTimeOut(); 
        }
        logger.info('Sign Up button is enabled. Clicking the button.');
        await this.clickOn(this.signUpButton);
    }

    async getErrorMessage() {
        logger.info('Retrieving error message text');
        return await this.errorMessage.textContent();
    }
   
}
