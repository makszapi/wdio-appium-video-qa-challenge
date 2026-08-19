import BaseScreen from './base-screen.js';

class ConsentScreen extends BaseScreen {
  get rootElement() { return this.locator.byTestId('consent_screen'); }
  get buttonAccept() { return this.locator.byTestId('consent_accept_button'); }
  get buttonReject() { return this.locator.byTestId('consent_reject_button'); }
  get buttonManagePreferences() { return this.locator.byTestId('consent_manage_preferences_button'); }

  async acceptConsent() {
    await this.buttonAccept.click();
  }

  async rejectConsent() {
    await this.buttonReject.click();
  }

  async tapOnManagePreferences() {
    await this.buttonManagePreferences.click();
  }

  async acceptConsentIfDisplayed() {
    if (await this.rootElement.isDisplayed()) {
      await this.acceptConsent();
    }
  }
}

export default new ConsentScreen();
