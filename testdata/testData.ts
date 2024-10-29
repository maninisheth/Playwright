export const testData = {
  name: 'Test User',
  getEmail: () => `test${Date.now()}@example.com`,
  existingEmail: 'test123@mail.com',
  password: 'Password123',
  invalidPassword : 'abc12',
  interests: ['Selenium', 'Cypress', 'java'],
  state: 'Goa',
  genderOptions: ['Female'],
  hobbyOptions: ['Playing', 'Reading'],
  courses: [
    { courseName: 'Selenium' },
    { courseName: 'Playwright' },
    { courseName: 'RestAssured' }
  ],

  address: '123 Test Street',
  phoneNumber: '9876543210'

 
};