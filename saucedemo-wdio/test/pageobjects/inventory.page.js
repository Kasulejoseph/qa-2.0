import { $ } from "@wdio/globals";
import Page from "./page.js";

class InventoryPage extends Page {
  get burgerMenuButton() {
    return $("#react-burger-menu-btn");
  }

  get burgerCloseButton() {
    return $("#react-burger-cross-btn");
  }

  get firstInventoryImage() {
    return $(".inventory_item_img");
  }

  get logoutElement() {
    return $("#logout_sidebar_link");
  }

  get aboutElement() {
    return $("#about_sidebar_link");
  }

  get backToProduct() {
    return $("#back-to-products");
  }

  get addToCartButton() {
    return $("button=Add to cart");
  }
}

export default new InventoryPage();
