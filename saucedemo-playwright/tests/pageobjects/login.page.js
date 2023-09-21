import { Page } from "./page";
class LoginPage extends Page {
  constructor(page) {
    super(page);
    // this.usernameElement = page.locator("#user-name")
    // this.passwordElement = page.locator("#password")
  }

  get usernameElement() {
    return this.page.locator("#user-name");
  }

  get passwordElement() {
    return this.page.locator("#password");
  }

  get loginButton() {
    return this.page.locator('[data-test="login-button"]');
  }

  async login(username, password) {
    await this.usernameElement.fill(username);
    await this.passwordElement.fill(password);
    await this.loginButton.click();
  }

  async goto(url) {
    return super.goto(url);
  }
}

export default LoginPage;
