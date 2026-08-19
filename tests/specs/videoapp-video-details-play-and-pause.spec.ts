import { TIMEOUTS } from '../../config/constants.js';
import { AMSTERDAM, VIDEO_STATE } from '../data/content.js';
import VideoDetailsScreen from '../screens/video-details-screen.js';
import ContentOverviewScreen from '../screens/content-overview-screen.js';
import NavigationHelper from '../utils/navigation-helper.js';

describe('Video app - open the video details screen, play and pause the video', () => {
  beforeEach(async () => {
    await NavigationHelper.openContentDetails(AMSTERDAM.title);
  });

  afterEach(async () => {
    await browser.relaunchActiveApp();
  });

  it('should be able to navigate to the video details screen', async () => {
    await expect(VideoDetailsScreen.textVideoTitle).toHaveText(AMSTERDAM.title);
    await expect(VideoDetailsScreen.textVideoCategory).toHaveText(AMSTERDAM.category);
    await expect(VideoDetailsScreen.textVideoDescription).toHaveText(AMSTERDAM.description);
  });

  it('should be able to navigate back to the content overview screen', async () => {
    await VideoDetailsScreen.tapOnBackButton();

    await expect(ContentOverviewScreen.rootElement).toBeDisplayed();
    await expect(ContentOverviewScreen.listContentItems).toBeDisplayed();
  });

  it('should be able to play and pause the video', async () => {
    const secondsToPlay = 3;

    await VideoDetailsScreen.tapOnPlayVideoButton();
    await expect(VideoDetailsScreen.textVideoStateLabel)
      .toHaveText(VIDEO_STATE.buffering, { wait: TIMEOUTS.playerStateChange });
    await expect(VideoDetailsScreen.textVideoStateLabel)
      .toHaveText(VIDEO_STATE.playing, { wait: TIMEOUTS.playerStateChange });

    await VideoDetailsScreen.playForSecondsThenPause(secondsToPlay);

    await expect(VideoDetailsScreen.textVideoStateLabel)
      .toHaveText(VIDEO_STATE.paused, { wait: TIMEOUTS.playerStateChange });
    expect(await VideoDetailsScreen.getVideoCurrentPositionInSeconds())
      .toBeGreaterThanOrEqual(secondsToPlay);
  });
});
