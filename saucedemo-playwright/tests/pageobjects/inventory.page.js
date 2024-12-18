import { InventoryItemSection, InventoryListSection } from "../sections";
import { Page } from "./page";

export default class InventoryPage extends Page {
  constructor(page) {
    super(page);
    this.inventoryListSection = new InventoryListSection(page);
    this.inventoryItemSection = new InventoryItemSection(page);
  }

  async inventoryList() {
    await this.inventoryListSection.navigateBurgerMenu();
    await this.inventoryListSection.addInventoryItemToCart();
    await this.inventoryListSection.selectInventoryItem();
  }

  async inventoryItem() {
    await this.inventoryItemSection.assertInventoryItemPage();
    await this.inventoryItemSection.addInventoryItemToCart();
  }
}
