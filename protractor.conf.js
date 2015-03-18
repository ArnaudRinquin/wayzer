exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
   'browserName': 'chrome'
  },
  baseUrl:'http://127.0.0.1:3000',
  specs: ['client/**/*.e2e.js'],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
