export default class LoginFormSection {
  constructor(page) {
    this.page = page;
  }

  // locators
  get usernameElement() {
    return this.page.locator("#user-name");
  }

  get passwordElement() {
    return this.page.locator("#password");
  }

  get loginButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  // actions
  async loginAccount(username, password) {
    await this.usernameElement.fill(username);
    await this.passwordElement.fill(password);
    await this.loginButton.click();
  }
}
