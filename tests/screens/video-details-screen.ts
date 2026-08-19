import { TIMEOUTS } from '../../config/constants.js';
import BaseScreen from './base-screen.js';

class VideoDetailsScreen extends BaseScreen {
  get rootElement() { return this.locator.byTestId('content_detail_screen'); }
  get buttonBack() { return this.locator.byTestId('detail_back_button'); }
  get textVideoTitle() { return this.locator.byTestId('detail_title'); }
  get textVideoCategory() { return this.locator.byTestId('detail_category'); }
  get textVideoDescription() { return this.locator.byTestId('detail_description'); }
  get textVideoStateLabel() { return this.locator.byTestId('video_state_label'); }
  get viewVideoPlayer() { return this.locator.byTestId('video_player'); }
  get buttonPlayVideo() { return this.locator.byTestId('video_play_button'); }
  get buttonPauseVideo() { return this.locator.byTestId('video_pause_button'); }
  get textVideoCurrentPosition() { return this.locator.byTestId('video_current_position'); }
  get textVideoProgress() { return this.locator.byTestId('video_progress'); }

  async tapOnBackButton() {
    await this.buttonBack.click();
  }

  async getVideoTitle(): Promise<string> {
    return await this.textVideoTitle.getText();
  }

  async getVideoCategory(): Promise<string> {
    return await this.textVideoCategory.getText();
  }

  async getVideoDescription(): Promise<string> {
    return await this.textVideoDescription.getText();
  }

  async tapOnPlayVideoButton() {
    await this.buttonPlayVideo.click();
  }

  async tapOnPauseVideoButton() {
    await this.buttonPauseVideo.click();
  }

  async getVideoProgress(): Promise<number> {
    const value = await this.textVideoProgress.getText();
    return Number.parseFloat(value);
  }

  async getVideoCurrentPositionInSeconds(): Promise<number> {
    const raw = await this.textVideoCurrentPosition.getText();
    const match = /^(\d+):([0-5]\d)$/.exec(raw.trim());

    if (!match) {
      throw new Error(`Unexpected video position format: "${raw}" (expected MM:SS)`);
    }

    return Number(match[1]) * 60 + Number(match[2]);
  }

  async playForSecondsThenPause(seconds: number): Promise<void> {
    const startPosition = await this.getVideoCurrentPositionInSeconds();
    const targetPosition = startPosition + seconds;

    await browser.waitUntil(
      async () => await this.getVideoCurrentPositionInSeconds() >= targetPosition,
      {
        timeout: (seconds + 30) * 1000,
        interval: TIMEOUTS.playbackPollInterval,
        timeoutMsg: `Video did not play for ${seconds.toString()} seconds`,
      },
    );

    await this.tapOnPauseVideoButton();
  }
}

export default new VideoDetailsScreen();
