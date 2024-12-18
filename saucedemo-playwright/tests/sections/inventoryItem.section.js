const { expect } = require('@playwright/test');

export default class InventoryItemSection {
  constructor(page) {
    this.page = page;
  }

  // locators
  get backToProduct() {
    return this.page.locator("#back-to-products");
  }

  get addToCartButton() {
    return this.page.locator('//button[text()="Add to cart"]');
  }

  // actions
  async assertInventoryItemPage() {
    await expect(this.page).toHaveURL(/\.*\/inventory-item/);
    await expect(this.backToProduct).toHaveText(/Back to products/);
  }

  async addInventoryItemToCart() {
    await this.addToCartButton.click();
    await expect(this.addToCartButton).not.toBeVisible();
  }
}
