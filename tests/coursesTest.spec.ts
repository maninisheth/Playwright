import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { CoursesDashboardPage } from '../pages/coursesDashboardPage';
import { CartPage } from '../pages/cartPage';
import { testData } from '../testdata/testData';


let homePage: HomePage;
let loginPage: LoginPage;
let coursesDashboard: CoursesDashboardPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    coursesDashboard = new CoursesDashboardPage(page);
    cartPage = new CartPage(page);

    await homePage.openApp();

});


test('Test 1:Verify three coureses should enrolled successfully', async ({ page }) => {

    await homePage.clickMenu();
    await homePage.clickLogin();
    await loginPage.enterEmail("testfn@gmail.com");
    await loginPage.enterPassword("test@123");
    await loginPage.clickSignIn();
    const headerText = await coursesDashboard.getHeaderText();
    expect(headerText).toBe('Learn Automation Courses');

    for (const course of testData.courses) {
        await coursesDashboard.clickAddToCart(course.courseName);
    }

    // Verify the cart count is 3
    const cartCount = await coursesDashboard.getCartCount();
    expect(cartCount).toBe(3);

    // Click on the Cart button to navigate to the cart page
    await coursesDashboard.clickCart();

    // Verify that the correct courses are in the cart
    for (const course of testData.courses) {
        const isCourseVisible = await cartPage.isCourseInCart(course.courseName);
        expect(isCourseVisible).toBe(true); // Assertion to check course visibility
    }

    await cartPage.clickEnrollNow();



    // Fill the modal form with Address and Phone Number
    await cartPage.fillModalForm(testData.address, testData.phoneNumber);

    // Submit the modal form
    await cartPage.submitModalForm();

    const orderMessage = await cartPage.getEnrollSuccessMessage();
    expect(orderMessage).toContain('Your order id is');
    expect(orderMessage).toMatch(/order-\w+/);
});
