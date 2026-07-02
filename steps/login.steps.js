const { createBdd } = require('playwright-bdd');
const { test } = require('./fixtures'); // Import your custom test fixture
const { expect } = require('@playwright/test');
const { loggerFactory } = require('../utils/logger.factory');

// Use the custom fixture to create Gherkin functions
const { Given, When, Then } = createBdd(test);
const log = loggerFactory('LoginSteps');

// Note how 'loginPage' is now available in the destructuring bracket {}
Given('I am on the login page', async ({ loginPage }) => {
  log.info('Opening login page');
  await loginPage.goto();
});

When('I login with {string} and {string}', async ({ loginPage }, username, password) => {
  log.info(`Logging in as ${username}`);
  await loginPage.login(username, password);
});

Then('I should be redirected to the inventory page', async ({ page }) => {
  log.info('Verifying URL redirection');
  await expect(page).toHaveURL(/inventory.html/);
});

Then('I should see an error message', async ({ loginPage }) => {
  log.info('Verifying error message visibility');
  await expect(loginPage.errorMessage).toBeVisible();
  
  const message = await loginPage.getErrorMessageText();
  await expect(message).toContain('Epic sadface'); 
});