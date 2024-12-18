import { LoginFormSection } from "../sections";
import { Page } from "./page";
class LoginPage extends Page {
  constructor(page) {
    super(page);
    this.loginFormSection = new LoginFormSection(page);
  }

  async goto(url) {
    return super.goto(url);
  }

  async login(username, password) {
    this.loginFormSection.loginAccount(username, password);
  }
}

export default LoginPage;
