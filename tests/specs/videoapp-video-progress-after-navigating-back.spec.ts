import { TIMEOUTS } from '../../config/constants.js';
import { AMSTERDAM, VIDEO_STATE } from '../data/content.js';
import ContentOverviewScreen from '../screens/content-overview-screen.js';
import VideoDetailsScreen from '../screens/video-details-screen.js';
import NavigationHelper from '../utils/navigation-helper.js';

describe('Video app - video progress should persist after navigating back and opening the same video again', () => {
  beforeEach(async () => {
    await NavigationHelper.openContentDetails(AMSTERDAM.title);
  });

  afterEach(async () => {
    await browser.relaunchActiveApp();
  });

  it('should be able to resume the video from the same position after opening it again', async () => {
    const secondsToPlay = 3;
    const secondsToPlayAfterResume = 2;

    await VideoDetailsScreen.tapOnPlayVideoButton();
    await expect(VideoDetailsScreen.textVideoStateLabel)
      .toHaveText(VIDEO_STATE.playing, { wait: TIMEOUTS.playerStateChange });

    await VideoDetailsScreen.playForSecondsThenPause(secondsToPlay);
    await expect(VideoDetailsScreen.textVideoStateLabel)
      .toHaveText(VIDEO_STATE.paused, { wait: TIMEOUTS.playerStateChange });

    const pausedPosition = await VideoDetailsScreen.getVideoCurrentPositionInSeconds();
    expect(pausedPosition).toBeGreaterThanOrEqual(secondsToPlay);
    await VideoDetailsScreen.tapOnBackButton();
    await ContentOverviewScreen.waitUntilDisplayed();

    await NavigationHelper.openContentDetails(AMSTERDAM.title);
    await expect(VideoDetailsScreen.textVideoTitle).toHaveText(AMSTERDAM.title);

    await VideoDetailsScreen.tapOnPlayVideoButton();
    await expect(VideoDetailsScreen.textVideoStateLabel)
      .toHaveText(VIDEO_STATE.playing, { wait: TIMEOUTS.playerStateChange });

    expect(await VideoDetailsScreen.getVideoCurrentPositionInSeconds())
      .toBeGreaterThanOrEqual(pausedPosition);

    await VideoDetailsScreen.playForSecondsThenPause(secondsToPlayAfterResume);
    await expect(VideoDetailsScreen.textVideoStateLabel)
      .toHaveText(VIDEO_STATE.paused, { wait: TIMEOUTS.playerStateChange });

    expect(await VideoDetailsScreen.getVideoCurrentPositionInSeconds())
      .toBeGreaterThanOrEqual(secondsToPlay + secondsToPlayAfterResume);
  });
});
