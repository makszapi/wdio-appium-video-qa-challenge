import { join } from 'node:path';
import { config as baseConfig } from './wdio.shared.local.appium.conf.js';

export const config: WebdriverIO.Config = {
  ...baseConfig,

  // ============
  // Specs
  // ============
  specs: ['../tests/specs/**/videoapp.*.spec.ts'],

  // ============
  // Capabilities
  // ============
  // For all capabilities please check
  // https://github.com/appium/appium-uiautomator2-driver
  capabilities: [
    {
      'platformName': 'Android',
      'wdio:maxInstances': 1,

      // NOTE: Change this name according to the Emulator you have created on your local machine
      'appium:avd': 'Pixel_8_2',
      // NOTE: Change this version according to the Emulator you have created on your local machine
      'appium:platformVersion': '15.0',
      'appium:orientation': 'PORTRAIT',
      'appium:automationName': 'UiAutomator2',
      // The path to the app
      'appium:app': join(process.cwd(), 'apps', 'VideoQAChallenge-debug.apk'),
      'appium:appWaitActivity': 'com.videoqa.challenge.MainActivity',
      'appium:newCommandTimeout': 240,
      'appium:optionalIntentArguments': '--ez resetAllState true',
    },
  ],
};
