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
    "https://cnt-4ee9406b-85e4-4cff-91b1-01199441b3d2.containerhub.tripleten-services.com",
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
