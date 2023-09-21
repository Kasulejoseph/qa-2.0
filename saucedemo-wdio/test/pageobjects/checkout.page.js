import { $ } from "@wdio/globals";
import Page from "./page.js";

class CheckoutPage extends Page {
  get cancelButton() {
    return $("button=Cancel");
  }

  get continueButton() {
    return $("#continue");
  }

  get firstNameElement() {
    return $("#first-name");
  }

  get lastNameElement() {
    return $("#last-name");
  }

  get postCodeElement() {
    return $("#postal-code");
  }

  get finishButton() {
    return $("button=Finish");
  }

  get backHomeButton() {
    return $("button=Back Home");
  }

  get completedOrderElement() {
    return $("h2=Thank you for your order!");
  }

  async completeCheckout(firstName, lastName, postCode) {
    await this.firstNameElement.setValue(firstName);
    await this.lastNameElement.setValue(lastName);
    await this.postCodeElement.setValue(postCode);
    await this.continueButton.click();
  }
}

export default new CheckoutPage();
