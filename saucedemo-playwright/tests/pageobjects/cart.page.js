import { expect } from "@playwright/test";
import { Page } from "./page";

export default class CartPage extends Page {
  constructor(page) {
    super(page);
  }

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

  async viewItemAndCheckout() {
    await this.shoppingCartButton.click();
    await expect(this.page).toHaveURL(/\.*\/cart/);
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.removeItemFromCartButton).toBeVisible();
    await expect(this.itemPriceElement).toBeVisible();
    await this.checkoutButton.click();
  }
}
