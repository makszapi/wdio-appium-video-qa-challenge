import { config as baseConfig } from './wdio.shared.conf.js';

export const config: Omit<WebdriverIO.Config, 'capabilities'> = {
  ...baseConfig,

  //
  // ======
  // Appium
  // ======
  //
  services: [
    ...baseConfig.services ?? [],
    [
      'appium',
      {
        // This will use the globally installed version of Appium
        // command: 'appium',
        args: {
          relaxedSecurity: true,
          // Write the Appium logs to a file in the root of the directory
          log: './logs/appium.log',
        },
      },
    ],
  ],
  before: async () => {
    if (driver.isAndroid) {
      await driver.updateSettings({
        // This reduces the timeout for the UiUiSelector from 10 seconds to 3 seconds
        waitForSelectorTimeout: 3 * 1000,
      });
    }
  },
};
