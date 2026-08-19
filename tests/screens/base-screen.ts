import { TIMEOUTS } from '../../config/constants.js';
import BaseUiObject from './base-ui-object.js';

export default abstract class BaseScreen extends BaseUiObject {
  abstract get rootElement(): ChainablePromiseElement;

  async waitUntilDisplayed(timeout: number = TIMEOUTS.screenTransition): Promise<void> {
    await this.rootElement.waitForDisplayed({ timeout });
  }

  async waitUntilNotDisplayed(timeout: number = TIMEOUTS.screenTransition): Promise<void> {
    await this.rootElement.waitForDisplayed({ timeout, reverse: true });
  }
}
