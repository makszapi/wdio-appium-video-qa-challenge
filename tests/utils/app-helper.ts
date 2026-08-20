import { ANDROID_APP_ID, IOS_APP_ID } from '../../config/constants.js';

class AppHelper {
  getAppId(): string {
    const appId = browser.isAndroid ? ANDROID_APP_ID : IOS_APP_ID;
    return appId;
  }

  async resetApp(): Promise<void> {
    const appId = this.getAppId();

    await browser.terminateApp(appId);

    if (browser.isAndroid) {
      await browser.execute('mobile: clearApp', {
        appId,
      });
    }
    else {
      // TODO: Implement the resetApp method for iOS apps if needed. The current implementation only supports Android apps.
      throw new Error('Resetting the app is not implemented for iOS apps yet. Please implement it if needed.');
    }
  }
}

export default new AppHelper();
