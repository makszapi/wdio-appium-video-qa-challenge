import BaseScreen from './base-screen.js';

class ConsentPreferencesScreen extends BaseScreen {
  get rootElement() { return this.locator.byTestId('preferences_screen'); }
  get buttonSavePreferences() { return this.locator.byTestId('preferences_save_button'); }
  get toggleAnalytics() { return this.locator.byTestId('analytics_toggle'); }
  get togglePersonalisedContent() { return this.locator.byTestId('personalisation_toggle'); }

  async setAnalyticsPreferenceTo(value: boolean) {
    await this.setCheckableElementTo(this.toggleAnalytics, value);
  }

  async setPersonalisedContentPreferenceTo(value: boolean) {
    await this.setCheckableElementTo(this.togglePersonalisedContent, value);
  }

  async getAnalyticsToggleState(): Promise<boolean> {
    return await this.getCheckableElementState(this.toggleAnalytics);
  }

  async getPersonalisedContentToggleState(): Promise<boolean> {
    return await this.getCheckableElementState(this.togglePersonalisedContent);
  }

  async tapSavePreferences() {
    await this.buttonSavePreferences.click();
  }
}

export default new ConsentPreferencesScreen();
