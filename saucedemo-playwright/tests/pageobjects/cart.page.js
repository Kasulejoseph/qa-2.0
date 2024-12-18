import { Page } from "./page";
import { CartSection } from "../sections";

export default class CartPage extends Page {
  constructor(page) {
    super(page);
    this.cartSection = new CartSection(page);
  }

  async viewItemAndCheckout() {
    await this.cartSection.shoppingCartActionButton();
    await this.cartSection.assertCartPage();
    await this.cartSection.checkoutActionButton();
  }
}
