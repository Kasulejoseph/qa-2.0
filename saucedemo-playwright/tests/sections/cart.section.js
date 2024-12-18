import { expect } from "@playwright/test";

export default class CartSection {
  constructor(page) {
    this.page = page;
  }

  // locators
  get shoppingCartButton() {
    return this.page.locator("#shopping_cart_container");
  }

  get continueShoppingButton() {
    return this.page.locator("#continue-shopping");
  }

  get itemPriceElement() {
    return this.page.locator(".inventory_item_price");
  }

  get removeItemFromCartButton() {
    return this.page.locator('//button[text()="Remove"]');
  }

  get checkoutButton() {
    return this.page.locator('//button[text()="Checkout"]');
  }

  // actions
  async shoppingCartActionButton() {
    await this.shoppingCartButton.click();
  }

  async assertCartPage() {
    await expect(this.page).toHaveURL(/\.*\/cart/);
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.removeItemFromCartButton.nth(0)).toBeVisible();
    await expect(this.itemPriceElement.nth(0)).toBeVisible();
  }

  async checkoutActionButton() {
    await this.checkoutButton.click();
  }
}
