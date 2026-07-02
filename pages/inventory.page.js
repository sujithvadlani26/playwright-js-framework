const { loggerFactory } = require('../utils/logger.factory');

exports.InventoryPage = class InventoryPage {
  constructor(page) {
    this.page = page;
    this.log = loggerFactory('InventoryPage');
    this.headerTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addItemToCart(itemName) {
    this.log.info(`Adding ${itemName} to cart`);
    const item = this.page.locator('.inventory_item', { hasText: itemName });
    await item.locator('button').click();
  }
};