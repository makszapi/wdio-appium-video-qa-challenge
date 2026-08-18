export const config: WebdriverIO.Config = {
  specs: [],
  capabilities: [],
  logLevel: 'debug',
  bail: 0,
  waitforTimeout: 45000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 3 * 60 * 1000, // 3min
  },
};
