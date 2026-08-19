import { ANDROID_AVD, ANDROID_LAUNCH_ARGS, ANDROID_PLATFORM_VERSION, ANDROID_APK_PATH } from './constants.js';
import { config as baseConfig } from './wdio-shared-local-appium.conf.js';

export const config: WebdriverIO.Config = {
  ...baseConfig,

  // ============
  // Specs
  // ============
  specs: ['../tests/specs/**/videoapp-*.spec.ts'],

  // ============
  // Capabilities
  // ============
  // Every machine-specific value comes from config/constants.ts and can be
  // overridden from the environment variable
  // For all capabilities please check
  // https://github.com/appium/appium-uiautomator2-driver
  capabilities: [
    {
      'platformName': 'Android',
      'wdio:maxInstances': 1,
      'appium:avd': ANDROID_AVD,
      'appium:platformVersion': ANDROID_PLATFORM_VERSION,
      'appium:orientation': 'PORTRAIT',
      'appium:automationName': 'UiAutomator2',
      'appium:app': ANDROID_APK_PATH,
      'appium:appWaitActivity': 'com.videoqa.challenge.MainActivity',
      'appium:newCommandTimeout': 360,
      // Clean state and fixed (non-randomised) delays on every session
      'appium:optionalIntentArguments': ANDROID_LAUNCH_ARGS,
    },
  ],
};
