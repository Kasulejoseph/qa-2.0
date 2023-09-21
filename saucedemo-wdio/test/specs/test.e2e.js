import { browser } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import CartPage from "../pageobjects/cart.page.js";
import CheckoutPage from "../pageobjects/checkout.page.js";
import data from '../data/index.json' assert { type: 'json' };

describe("sauce labs", () => {
  it("should add an itemn to the cart and checkout", async () => {
    await LoginPage.open();

    await LoginPage.login(data.username,  data.password);
    await expect(browser).toHaveUrlContaining("inventory");
    await expect(InventoryPage.firstInventoryImage).toBeExisting();

    await InventoryPage.burgerMenuButton.click();
    await expect(InventoryPage.logoutElement).toBeExisting();
    await InventoryPage.burgerCloseButton.click();

    await InventoryPage.firstInventoryImage.click();
    await expect(InventoryPage.backToProduct).toHaveText("Back to products");
    await InventoryPage.addToCartButton.click();
    await expect(InventoryPage.addToCartButton).not.toBeDisplayed();

    await CartPage.shoppingCartButton.click();
    await expect(CartPage.continueShoppingButton).toHaveText(
      "Continue Shopping"
    );
    await expect(CartPage.removeItemFromCartButton).toBeDisplayed();
    await expect(CartPage.itemPriceElement).toBeDisplayed();
    await CartPage.checkoutButton.click();

    await expect(browser).toHaveUrlContaining(
      "checkout-step-one"
    );
    await expect(CheckoutPage.cancelButton).toBeDisplayed();
    await CheckoutPage.completeCheckout(data.firstName, data.lastName, data.postalCode);

    await expect(browser).toHaveUrlContaining(
      "checkout-step-two"
    );
    await expect(CheckoutPage.cancelButton).toBeDisplayed();
    await CheckoutPage.finishButton.click();

    await expect(CheckoutPage.completedOrderElement).toBeDisplayed();
    await expect(CheckoutPage.backHomeButton).toBeDisplayed();
  });
});
