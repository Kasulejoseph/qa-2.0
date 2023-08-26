// @ts-check
const { test, expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await expect(this.page).toHaveTitle(/Home Page/);
    await this.page.getByRole("link", { name: "Sign In" }).click();
    await expect(this.page).toHaveURL(
      /\.*\/customer\/account\/login\/referer\/.*$/
    );
  }

  async login(username, password) {
    await this.page.getByLabel("Email").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign In" }).click();
    await expect(this.page).toHaveURL(/\.*/, { timeout: 80000 });
  }
}

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async getProductList() {
    const productCount = await this.page.locator(".product-item").count();
    const productList = [];

    for (let i = 0; i < productCount; i++) {
      const style = await this.page
        .locator(".product-item-link")
        .nth(i)
        .innerText();
      const price = await this.page.locator(".price").nth(i).innerText();

      productList.push({
        style,
        price,
      });
    }

    return productList;
  }

  async sortProductListByPrice(productList) {
    return productList.sort(
      (a, b) =>
        parseFloat(a.price.replace("$", "")) -
        parseFloat(b.price.replace("$", ""))
    );
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
  }

  async filterShoppingOptions() {
    await this.page.locator('//*[@id="ui-id-4"]').click();
    await this.page.getByRole("link", { name: "Tops" }).click();
    await this.page.getByRole("link", { name: /Tees \(\d+ item \)/ }).click();
    await expect(this.page).toHaveURL(/\.*\/women\/tops-women.html\?\S+=\d+$/);

    await this.page.getByText("Size").click();
    await this.page
      .locator('//*[@id="narrow-by-list"]/div[2]/div[2]/div/div/a[4]/div')
      .click();
    await this.page
      .getByRole("link", { name: /\$20.00 \- \$29.99 \(\d+ item \)/ })
      .click();

    await this.page
      .locator(".swatch-option-link-layered > div[option-label='White']")
      .click();
    await this.page.locator(".product-item-info").nth(0).click();
    expect(this.page).toHaveURL(/\.*\S+\.html$/);

    await this.page
      .locator(".swatch-attribute-options > div[option-label='White']")
      .click();
    await this.page
      .locator('.swatch-attribute-options > div[aria-label="L"]')
      .click();
  }

  async addToCartAndVerifyTotalCost(quantity) {
    const tshirtPrice = await this.page
      .locator(".product-info-main .price-wrapper  > .price")
      .innerText();
    const sumOfPriceAndQuantity =
      parseInt(quantity) * parseFloat(tshirtPrice.replace("$", ""));
    await this.page.locator("#qty").fill(quantity);
    await this.page.locator("#product-addtocart-button").click();
    await this.page.locator(".showcart").click();

    const totalCostElement = await this.page
      .locator(".amount > .price-wrapper > .price")
      .innerHTML();
    const totalCost = await totalCostElement.replace("$", "");
    await this.page.locator(".showcart").click();
    expect(parseFloat(totalCost)).toEqual(sumOfPriceAndQuantity);
    return { totalCost, sumOfPriceAndQuantity };
  }

  async navigateToCheckoutAndVerifyAddress(totalCost) {
    await this.page.locator("#top-cart-btn-checkout").click();
    expect(this.page).toHaveURL(/\.*\/checkout/);

    const shippingAddress = await this.page.locator(".shipping-address-item");

    const shippingFee = await this.page
      .locator(".col-price > .price")
      .innerText();
    const shippingFeeFormated = parseFloat(shippingFee.replace("$", ""));
    const shippingAndTotalCost = shippingFeeFormated + totalCost;

    // assert shipping fee and address
    expect(shippingAddress).toBeVisible({ timeout: 20000 });
    expect(shippingFeeFormated).toBeGreaterThan(0);
    return { shippingAndTotalCost, shippingFeeFormated };
  }

  async placeOrder(sumOfPriceAndQuantity, shippingCostFloatValue) {
    await this.page.getByRole("button", { name: "Next" }).click();

    await this.page.locator(".items-in-cart").click();
    await this.page.getByText("View Details").click();

    await this.page.getByRole("button", { name: "Place Order" }).click();
    // expect(this.page).toHaveURL(/\.*\/checkout+/);
    const orderTotal = sumOfPriceAndQuantity + shippingCostFloatValue;
    return orderTotal;
  }
}

test("add item to the cart", async ({ page }) => {
  test.slow();
  await page.goto("https://magento.softwaretestingboard.com/");

  const username = "techsystems@safeboda.com";
  const password = "Safeboda123$";
  const quantity = "3";
  const productSize = "L";

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login(username, password);

  const productList = await homePage.getProductList();
  const sortedProductList = await homePage.sortProductListByPrice(productList);

  await cartPage.filterShoppingOptions();
  const { totalCost, sumOfPriceAndQuantity } =
    await cartPage.addToCartAndVerifyTotalCost(quantity);
  const { shippingAndTotalCost, shippingFeeFormated } =
    await cartPage.navigateToCheckoutAndVerifyAddress(totalCost);
  await cartPage.placeOrder(sumOfPriceAndQuantity, shippingFeeFormated);

  console.log("Quantity: ", quantity);
  console.log("Product Size: ", productSize);
  console.log("Subtotal Order ($): ", totalCost);
  console.log("Shipping Fee ($): ", shippingFeeFormated);
  console.log("Total Fee: ", shippingAndTotalCost);
  console.log("Product List: ", sortedProductList);
  console.log("Total Order Fee: ", totalCost);
});
