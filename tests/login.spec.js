const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { loggerFactory } = require('../utils/logger.factory');

test.describe('Login Functionality', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Assertion
    await expect(page).toHaveURL(/inventory.html/);
  });
});