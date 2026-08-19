import { TIMEOUTS } from '../../config/constants.js';
import LocatorStrategy from '../utils/locator-strategy.js';

export default class BaseUiObject {
  protected locator: LocatorStrategy;

  constructor() {
    this.locator = new LocatorStrategy();
  }

  protected async setCheckableElementTo(element: ChainablePromiseElement, value: boolean) {
    if (await this.getCheckableElementState(element) === value) {
      return;
    }

    await element.click();

    await browser.waitUntil(
      async () => await this.getCheckableElementState(element) === value,
      {
        timeout: TIMEOUTS.elementVisible,
        timeoutMsg: `Element did not reach checked="${String(value)}" after being tapped`,
      },
    );
  }

  protected async getCheckableElementState(element: ChainablePromiseElement): Promise<boolean> {
    return await element.getAttribute('checked') === 'true';
  }
}
