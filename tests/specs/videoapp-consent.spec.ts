import ConsentPreferencesScreen from '../screens/consent-preferences-screen.js';
import ConsentScreen from '../screens/consent-screen.js';
import ContentOverviewScreen from '../screens/content-overview-screen.js';
import AppHelper from '../utils/app-helper.js';

describe('Video app - accept, reject, and manage consent preferences', () => {
  beforeEach(async () => {
    await ConsentScreen.waitUntilDisplayed();
  });

  afterEach(async () => {
    await AppHelper.resetApp();
  });

  it('should be able to accept the consent', async () => {
    await expect(ConsentScreen.buttonAccept).toBeDisplayed();
    await ConsentScreen.acceptConsent();

    await expect(ConsentScreen.rootElement).not.toBeDisplayed();
    await expect(ContentOverviewScreen.rootElement).toBeDisplayed();
    await expect(ContentOverviewScreen.listContentItems).toBeDisplayed();
  });

  it('should be able to reject the consent', async () => {
    await expect(ConsentScreen.buttonReject).toBeDisplayed();
    await ConsentScreen.rejectConsent();

    await expect(ConsentScreen.rootElement).not.toBeDisplayed();
    await expect(ContentOverviewScreen.rootElement).toBeDisplayed();
    await expect(ContentOverviewScreen.listContentItems).toBeDisplayed();
  });

  it('should be able to change the consent preferences', async () => {
    await expect(ConsentScreen.buttonManagePreferences).toBeDisplayed();
    await ConsentScreen.tapOnManagePreferences();
    await expect(ConsentPreferencesScreen.rootElement).toBeDisplayed();

    await ConsentPreferencesScreen.setAnalyticsPreferenceTo(true);
    expect(await ConsentPreferencesScreen.getAnalyticsToggleState()).toBe(true);

    await ConsentPreferencesScreen.setAnalyticsPreferenceTo(false);
    expect(await ConsentPreferencesScreen.getAnalyticsToggleState()).toBe(false);

    await ConsentPreferencesScreen.setPersonalisedContentPreferenceTo(true);
    expect(await ConsentPreferencesScreen.getPersonalisedContentToggleState()).toBe(true);

    await ConsentPreferencesScreen.tapSavePreferences();

    await expect(ConsentScreen.rootElement).not.toBeDisplayed();
    await expect(ContentOverviewScreen.rootElement).toBeDisplayed();
  });

  it('should not show the consent screen on the second app launch', async () => {
    await expect(ConsentScreen.buttonAccept).toBeDisplayed();
    await ConsentScreen.acceptConsent();
    await expect(ContentOverviewScreen.rootElement).toBeDisplayed();

    await browser.relaunchActiveApp();

    await expect(ConsentScreen.rootElement).not.toBeDisplayed();
    await expect(ContentOverviewScreen.rootElement).toBeDisplayed();
  });
});
