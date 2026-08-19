export default class LocatorStrategy {
  private find(iOSSelector: string, androidSelector: string, parent?: WebdriverIO.Element | ChainablePromiseElement) {
    if (browser.isAndroid) {
      return parent ? parent.$(androidSelector) : $(androidSelector);
    }
    if (browser.isIOS) {
      return parent ? parent.$(iOSSelector) : $(iOSSelector);
    };

    throw new Error(`Unsupported platform`);
  }

  private findAll(iOSSelector: string, androidSelector: string, parent?: WebdriverIO.Element | ChainablePromiseElement) {
    if (browser.isAndroid) {
      return parent ? parent.$$(androidSelector) : $$(androidSelector);
    }
    if (browser.isIOS) {
      return parent ? parent.$$(iOSSelector) : $$(iOSSelector);
    };

    throw new Error(`Unsupported platform`);
  }

  byTestId(id: string, parent?: WebdriverIO.Element | ChainablePromiseElement) {
    return this.find(`~${id}`, `android=new UiSelector().resourceId("${id}")`, parent);
  }

  byTestIdPrefix(prefix: string, parent?: WebdriverIO.Element | ChainablePromiseElement) {
    return this.find(
      `-ios predicate string:name BEGINSWITH '${prefix}'`,
      `android=new UiSelector().resourceIdMatches("^${prefix}.*")`,
      parent,
    );
  }

  allByTestIdPrefix(prefix: string, parent?: WebdriverIO.Element | ChainablePromiseElement) {
    return this.findAll(
      `-ios predicate string:name BEGINSWITH '${prefix}'`,
      `android=new UiSelector().resourceIdMatches("^${prefix}.*")`,
      parent,
    );
  }
}
