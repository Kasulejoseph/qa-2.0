const { expect } = require('@playwright/test');

export default class InventoryListSection {
  constructor(page) {
    this.page = page;
  }

  // locators
  get burgerMenuButton() {
    return this.page.locator("#react-burger-menu-btn");
  }

  get burgerCloseButton() {
    return this.page.locator("#react-burger-cross-btn");
  }

  get firstInventoryImage() {
    return this.page.locator(".inventory_item_img");
  }

  get logoutElement() {
    return this.page.locator("#logout_sidebar_link");
  }

  get aboutElement() {
    return this.page.locator("#about_sidebar_link");
  }

  get addToCartButton() {
    return this.page.locator('//button[text()="Add to cart"]')
  }

  // actions
  async navigateBurgerMenu() {
    await this.burgerMenuButton.click();
    await expect(this.logoutElement).toBeVisible();
    await expect(this.aboutElement).toBeVisible();
    await this.burgerCloseButton.click();
  }

  async addInventoryItemToCart() {
    await this.addToCartButton.nth(2).click();
  }

  async selectInventoryItem() {
    await this.firstInventoryImage.nth(1).click();
  }
}
