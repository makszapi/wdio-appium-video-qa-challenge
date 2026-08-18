export default class LocatorStrategy {
  private find(iOSSelector: string, androidSelector: string, parent?: WebdriverIO.Element) {
    if (browser.isAndroid) {
      return parent ? parent.$(androidSelector) : $(androidSelector);
    }

    if (browser.isIOS) {
      return parent ? parent.$(iOSSelector) : $(iOSSelector);
    };

    throw new Error(`Unsupported platform`);
  }

  private findAll(iOSSelector: string, androidSelector: string, parent?: WebdriverIO.Element) {
    if (browser.isAndroid) {
      return parent ? parent.$$(androidSelector) : $$(androidSelector);
    }

    if (browser.isIOS) {
      return parent ? parent.$$(iOSSelector) : $$(iOSSelector);
    };

    throw new Error(`Unsupported platform`);
  }

  byTestId(id: string, parent?: WebdriverIO.Element) {
    return this.find(`~${id}`, `android=new UiSelector().resourceId("${id}")`, parent);
  }
}
