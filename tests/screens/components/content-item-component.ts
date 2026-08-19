import BaseUiObject from '../base-ui-object.js';

export default class ContentItemComponent extends BaseUiObject {
  readonly rootContentItem: WebdriverIO.Element;

  constructor(rootContentItem: WebdriverIO.Element) {
    super();
    this.rootContentItem = rootContentItem;
  }

  get textTitle() { return this.locator.byTestIdPrefix('content_title_', this.rootContentItem); }

  async getTitleText(): Promise<string> {
    return this.textTitle.getText();
  }

  async tapOnItem(): Promise<void> {
    await this.rootContentItem.click();
  }
}
