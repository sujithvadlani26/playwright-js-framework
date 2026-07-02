const { expect } = require('@playwright/test');
const { loggerFactory } = require('../utils/logger.factory');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    // Create a logger specific to this page
    this.log = loggerFactory('LoginPage');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    this.log.info('Navigating to the Login page...');
    await this.page.goto('/');
  }

  async login(username, password) {
    this.log.info(`Attempting login for user: ${username}`);
    try {
      await this.page.locator('#user-name').fill(username);
      await this.passwordInput.fill(password)
      await this.page.locator('#login-button').click();
      this.log.info('Login button clicked successfully.');
    } catch (error) {
      this.log.error(`Login failed: ${error.message}`);
      throw error;
    }
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }
};