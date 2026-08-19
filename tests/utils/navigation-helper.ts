import ConsentScreen from '../screens/consent-screen.js';
import ContentOverviewScreen from '../screens/content-overview-screen.js';
import VideoDetailsScreen from '../screens/video-details-screen.js';

class NavigationHelper {
  async openContentOverview(): Promise<void> {
    await ConsentScreen.acceptConsentIfDisplayed();
    await ContentOverviewScreen.waitUntilDisplayed();
  }

  async openContentDetails(title: string): Promise<void> {
    await this.openContentOverview();

    const contentItem = await ContentOverviewScreen.getContentItemAtWithTitle(title);
    await contentItem.tapOnItem();

    await VideoDetailsScreen.waitUntilDisplayed();
  }
}

export default new NavigationHelper();
