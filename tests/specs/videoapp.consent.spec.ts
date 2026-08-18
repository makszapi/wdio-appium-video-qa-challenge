import AppHelper from '../utils/app-helper.js';
import ConsentScreen from '../screens/consent-screen.js';

describe('Video app - accept, reject, and manage consent preferences', () => {
  beforeEach(async () => {
    await ConsentScreen.waitForConsentScreenToBeDisplayed();
    expect(await ConsentScreen.isConsentScreenDisplayed()).toBeTruthy();
  });

  afterEach(async () => {
    await AppHelper.resetApp();
  });

  it('should be able to accept the consent', async () => {
    expect(await ConsentScreen.isAcceptButtonIsDisplayed()).toBeTruthy();
    await ConsentScreen.acceptConsent();
    expect(await ConsentScreen.isConsentScreenDisplayed()).toBeFalsy();
  });

  it('should be able to reject the consent', async () => {
    expect(await ConsentScreen.isRejectButtonIsDisplayed()).toBeTruthy();
    await ConsentScreen.rejectConsent();
    expect(await ConsentScreen.isConsentScreenDisplayed()).toBeFalsy();
  });
});
