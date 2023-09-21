import { $ } from "@wdio/globals";
import Page from "./page.js";

class CartPage extends Page {
  get shoppingCartButton() {
    return $("#shopping_cart_container");
  }

  get continueShoppingButton() {
    return $("#continue-shopping");
  }

  get itemPriceElement() {
    return $(".inventory_item_price");
  }

  get removeItemFromCartButton() {
    return $("button=Remove");
  }

  get checkoutButton() {
    return $("button=Checkout");
  }
}

export default new CartPage();
