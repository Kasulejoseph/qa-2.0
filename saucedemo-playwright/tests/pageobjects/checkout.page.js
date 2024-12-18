import { CheckoutSection } from "../sections";
import { Page } from "./page";

export default class Checkout extends Page {
  constructor(page) {
    super(page);
    this.checkoutSection = new CheckoutSection(page);
  }

  async completeCheckout(firstName, lastName, postCode) {
    await this.checkoutSection.assertCheckoutPage();
    await this.checkoutSection.checkoutForm(firstName, lastName, postCode);
    await this.checkoutSection.confirmCheckout();
  }
}
