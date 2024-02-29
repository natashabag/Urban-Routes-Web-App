exports.config = {
  runner: "local",
  specs: ["./test/specs/**/*.js"],
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 10,
  headless: true,
  capabilities: [
    {
      maxInstances: 5,
      browserName: "firefox",
      acceptInsecureCerts: true,
      "moz:firefoxOptions": {
        //args: ['-headless']
      },
    },
  ],
  logLevel: "error",
  bail: 0,
  baseUrl:
    "https://cnt-1c9341bd-09c0-48ea-a17a-a97f450888bd.containerhub.tripleten-services.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["geckodriver", "intercept"],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
