import { Page } from "./page"

export default class FormPage extends Page {
    constructor(page) {
        super(page)
    }
    get emailElement() {
        return this.page.locator('input[name="email"]')
    }

    get passwordElement() {
        return this.page.getByLabel('Password');
    }

    async fillForm(email, password) {
        await this.emailElement.fill(email)
        await this.passwordElement.fill(password)
    }
}