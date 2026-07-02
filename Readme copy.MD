# 1. Create Folder Structure
mkdir -p features steps pages utils

# 2. Create Page Object (pages/login.page.js)
cat <<EOF > pages/login.page.js
const { expect } = require('@playwright/test');
const { loggerFactory } = require('../utils/logger.factory');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.log = loggerFactory('LoginPage');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto() {
    this.log.info('Navigating to login page');
    await this.page.goto('/');
  }

  async login(username, password) {
    this.log.info('Entering credentials');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
};
EOF

# 3. Create Logger (utils/logger.factory.js)
cat <<EOF > utils/logger.factory.js
exports.loggerFactory = (component) => ({
  info: (msg) => console.log(\`\x1b[32m[\${new Date().toISOString()}] [INFO] [\${component}]: \${msg}\x1b[0m\`),
  error: (msg) => console.error(\`\x1b[31m[\${new Date().toISOString()}] [ERROR] [\${component}]: \${msg}\x1b[0m\`)
});
EOF

# 4. Create Feature File (features/login.feature)
cat <<EOF > features/login.feature
Feature: User Login
  Scenario: Login with valid credentials
    Given I am on the login page
    When I login with "standard_user" and "secret_sauce"
    Then I should be redirected to the inventory page
EOF

# 5. Create Step Definitions (steps/login.steps.js)
cat <<EOF > steps/login.steps.js
const { createBdd } = require('playwright-bdd');
const { LoginPage } = require('../pages/login.page');
const { expect } = require('@playwright/test');

const { Given, When, Then } = createBdd();

Given('I am on the login page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('I login with {string} and {string}', async ({ page }, user, pass) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(user, pass);
});

Then('I should be redirected to the inventory page', async ({ page }) => {
  await expect(page).toHaveURL(/inventory.html/);
});
EOF

# 6. Create Gitignore
cat <<EOF > .gitignore
node_modules/
test-results/
playwright-report/
.features-gen/
.env
EOF

# 7. Create Playwright Config
cat <<EOF > playwright.config.js
const { defineConfig } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: 'steps/*.steps.js',
});

module.exports = defineConfig({
  testDir,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
  },
});
EOF