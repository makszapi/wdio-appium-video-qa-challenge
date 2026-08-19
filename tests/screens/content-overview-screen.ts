import BaseScreen from './base-screen.js';
import ContentItemComponent from './components/content-item-component.js';

class ContentOverviewScreen extends BaseScreen {
  get rootElement() { return this.locator.byTestId('content_overview_screen'); }
  get listContentItems() { return this.locator.byTestId('content_list'); }
  get loadingIndicator() { return this.locator.byTestId('content_loading_indicator'); }

  override async waitUntilDisplayed(): Promise<void> {
    await super.waitUntilDisplayed();
    await this.listContentItems.waitForDisplayed();
  }

  async getContentItems(): Promise<ContentItemComponent[]> {
    const elements = this.locator.allByTestIdPrefix(
      'content_item_',
      this.listContentItems,
    );

    return elements.map(
      element => new ContentItemComponent(element),
    );
  }

  async getContentItemAtWithTitle(title: string): Promise<ContentItemComponent> {
    const items = await this.getContentItems();

    for (const item of items) {
      if (await item.getTitleText() === title) {
        return item;
      }
    }

    throw new Error(
      `Content item with title "${title}" was not found`,
    );
  }
}

export default new ContentOverviewScreen();
