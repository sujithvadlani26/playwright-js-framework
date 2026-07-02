const { createBdd } = require('playwright-bdd');
const { test } = require('./fixtures');
const { expect } = require('@playwright/test');

const { Then, When } = createBdd(test);

Then('I should see the products page header {string}', async ({ inventoryPage }, title) => {
  await expect(inventoryPage.headerTitle).toHaveText(title);
});

When('I add the item {string} to the cart', async ({ inventoryPage }, itemName) => {
  await inventoryPage.addItemToCart(itemName);
});

Then('the cart badge should show {string}', async ({ inventoryPage }, count) => {
  await expect(inventoryPage.cartBadge).toHaveText(count);
});