const { expect } = require("@playwright/test");
import { Page } from "./page";

export default class InventoryPage extends Page {
  constructor(page) {
    super(page);
  }

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

  get backToProduct() {
    return this.page.locator("#back-to-products");
  }

  get addToCartButton() {
    return this.page.locator('//button[text()="Add to cart"]');
  }

  async navigateBurgerMenu() {
    await this.burgerMenuButton.click();
    await expect(this.logoutElement).toBeVisible();
    await this.burgerCloseButton.click();
  }

  async addInventoryItemToCart() {
    await this.firstInventoryImage.nth(1).click();
    await expect(this.page).toHaveURL(/\.*\/inventory-item/);
    await expect(this.backToProduct).toHaveText(/Back to products/);
    await this.addToCartButton.click();
    await expect(this.addToCartButton).not.toBeVisible();
  }
}
