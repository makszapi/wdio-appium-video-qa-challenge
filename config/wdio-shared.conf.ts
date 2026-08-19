import { join } from 'node:path';
import { WDIO_LOG_LEVEL, TEST_REPORT_DIR, TIMEOUTS } from './constants.js';

export const config: WebdriverIO.Config = {
  specs: [],
  capabilities: [],
  logLevel: WDIO_LOG_LEVEL,
  bail: 0,
  waitforTimeout: TIMEOUTS.global,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [],
  framework: 'mocha',

  //
  // ==========
  // Reporting
  // ==========
  // `spec` for the console, `allure` for the human-readable execution report,
  // `junit` for CI consumption.
  //
  reporters: [
    'spec',
    ['allure', {
      outputDir: join(TEST_REPORT_DIR, 'allure-results'),
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }],
    ['junit', {
      outputDir: join(TEST_REPORT_DIR, 'junit'),
    }],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 3 * 60 * 1000, // 3min
  },

  afterTest: async (_test, _context, { passed }) => {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
