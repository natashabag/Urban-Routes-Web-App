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
        binary: "/Applications/Firefox.app/Contents/MacOS/firefox",
      },
    },
  ],
  logLevel: "error",
  bail: 0,
  baseUrl:
    "https://cnt-134d377c-f320-49cd-8407-df0de3f206b9.containerhub.tripleten-services.com",
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
