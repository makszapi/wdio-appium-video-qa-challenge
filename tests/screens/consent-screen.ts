import BaseScreen from './base-screen.js';

class ConsentScreen extends BaseScreen {
  get viewConsentScreen() { return this.selector.byTestId('consent_screen'); }
  get buttonAccept() { return this.selector.byTestId('consent_accept_button'); }
  get buttonReject() { return this.selector.byTestId('consent_reject_button'); }
  get buttonManagePreferences() { return this.selector.byTestId('consent_manage_preferences_button'); }

  async acceptConsent() {
    await this.buttonAccept.click();
  }

  async rejectConsent() {
    await this.buttonReject.click();
  }

  async waitForConsentScreenToBeDisplayed() {
    await this.viewConsentScreen.waitForDisplayed({ timeout: 5000 });
  }

  async isConsentScreenDisplayed() {
    return await this.viewConsentScreen.isDisplayed();
  }

  async isAcceptButtonIsDisplayed() {
    await this.buttonAccept.waitForDisplayed({ timeout: 3000 });
    return await this.buttonAccept.isDisplayed();
  }

  async isRejectButtonIsDisplayed() {
    await this.buttonReject.waitForDisplayed({ timeout: 3000 });
    return await this.buttonReject.isDisplayed();
  }
}

export default new ConsentScreen();
