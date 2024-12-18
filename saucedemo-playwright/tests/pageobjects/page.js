export class Page {
  constructor(page) {
    this.page = page;
  }

   goto = async(url) => await this.page.goto(url);
}
