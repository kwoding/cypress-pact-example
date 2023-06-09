const { defineConfig } = require("cypress");
const pactCypressPlugin = require('@pactflow/pact-cypress-adapter/dist/plugin');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      pactCypressPlugin(on, config, fs);
    },
    baseUrl: 'http://localhost:3000',
    env: {
      headersBlocklist: ["access-control-allow-origin", "access-control-allow-credentials"],
    }
  },
});
