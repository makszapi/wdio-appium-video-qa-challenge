import LocatorStrategy from '../utils/locator-strategy.js';

export default class BaseUiObject {
  protected selector: LocatorStrategy;

  constructor() {
    this.selector = new LocatorStrategy();
  }
}
