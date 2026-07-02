const { test: base } = require('playwright-bdd'); // Import test as base
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');

// Now base (which is playwright-bdd's test) has the .extend() method
exports.test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});