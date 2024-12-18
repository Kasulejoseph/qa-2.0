import { expect } from "@playwright/test";

export default class CheckoutSection {
  constructor(page) {
    this.page = page;
  }

  // locators
  get cancelButton() {
    return this.page.locator('//button[text()="Cancel"]');
  }

  get continueButton() {
    return this.page.locator("#continue");
  }

  get firstNameElement() {
    return this.page.locator("#first-name");
  }

  get lastNameElement() {
    return this.page.locator("#last-name");
  }

  get postCodeElement() {
    return this.page.locator("#postal-code");
  }

  get finishButton() {
    return this.page.locator('//button[text()="Finish"]');
  }

  get backHomeButton() {
    return this.page.locator('//button[text()="Back Home"]');
  }

  get completedOrderElement() {
    return this.page.locator('//h2[text()="Thank you for your order!"]');
  }

  // actions
  async assertCheckoutPage() {
    await expect(this.page).toHaveURL(/\.*\/checkout-step-one/);
    await expect(this.cancelButton).toBeVisible();
  }

  async checkoutForm(firstName, lastName, postCode) {    
    await this.firstNameElement.fill(firstName);
    await this.lastNameElement.fill(lastName);
    await this.postCodeElement.fill(postCode);
    await this.continueButton.click();
  }

  async confirmCheckout() {
    await expect(this.page).toHaveURL(/\.*\/checkout-step-two/);
    await this.finishButton.click();
    await expect(this.backHomeButton).toBeVisible();
    await expect(this.completedOrderElement).toBeVisible();
  }
}
