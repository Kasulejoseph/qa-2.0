// @ts-check
const { test, expect } = require("@playwright/test");
const { default: LoginPage } = require("./pageobjects/login.page");
const { default: InventoryPage } = require("./pageobjects/inventory.page");
const { default: CartPage } = require("./pageobjects/cart.page");
const { default: Checkout } = require("./pageobjects/checkout.page");
import { faker } from "@faker-js/faker";

test("add item to the cart and checkout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new Checkout(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = faker.location.zipCode();

  await loginPage.goto("https://www.saucedemo.com/");
  await loginPage.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/\.*\/inventory/);

  await inventoryPage.inventoryList();
  await inventoryPage.inventoryItem();
  await cartPage.viewItemAndCheckout();

  await checkoutPage.completeCheckout(firstName, lastName, postalCode);
});
