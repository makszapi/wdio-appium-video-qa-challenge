import { join } from 'node:path';
import { LOG_DIR, TIMEOUTS } from './constants.js';
import { config as baseConfig } from './wdio-shared.conf.js';

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
        args: {
          relaxedSecurity: true,
          // Write the Appium logs to a file in the logs directory
          log: join(LOG_DIR, 'appium.log'),
        },
      },
    ],
  ],
  before: async () => {
    if (driver.isAndroid) {
      await driver.updateSettings({
        // This reduces the timeout for the UiSelector from 10 seconds to 3 seconds
        waitForSelectorTimeout: TIMEOUTS.selectorLookup,
      });
    }
  },
};
