import { join } from 'node:path';

export const ANDROID_APP_ID = 'com.videoqa.challenge';
export const IOS_APP_ID = ''; // TODO: Add the iOS app ID when the iOS suite is added
// For local run update with the avalibale emulator
export const ANDROID_AVD = process.env['ANDROID_AVD'] ?? 'Pixel_8_2';
export const ANDROID_PLATFORM_VERSION = process.env['ANDROID_PLATFORM_VERSION'] ?? '15.0';
export const ANDROID_APK_PATH = process.env['ANDROID_APK_PATH']
  ?? join(process.cwd(), 'apps', 'VideoQAChallenge-debug.apk');

export const WDIO_LOG_LEVEL = (process.env['WDIO_LOG_LEVEL'] ?? 'info') as NonNullable<WebdriverIO.Config['logLevel']>;
export const LOG_DIR = process.env['LOG_DIR'] ?? join(process.cwd(), 'logs');
export const TEST_REPORT_DIR = process.env['TEST_REPORT_DIR'] ?? join(process.cwd(), 'test_reports');

export const ANDROID_LAUNCH_ARGS = process.env['ANDROID_LAUNCH_ARGS']
  ?? '--ez resetAllState true --ei contentDelayMs 500 --ei videoBufferingMs 1500';

//
// ============================
// Timeouts (milliseconds)
// ============================
export const TIMEOUTS = {
  /** Screen-to-screen navigation, including the transition animation. */
  screenTransition: 10_000,
  /** A single element becoming visible on an already-rendered screen. */
  elementVisible: 10_000,
  /** Video player state machine reaching a target state. */
  playerStateChange: 15_000,
  /** Poll interval when watching the playback position advance. */
  playbackPollInterval: 250,
  /** UiAutomator2 selector lookup, set via driver settings. */
  selectorLookup: 3_000,
  /** Global expect-webdriverio / waitFor default. */
  global: 15_000,
} as const;
