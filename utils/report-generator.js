const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: './cucumber-report',
  reportPath: './cucumber-report/html',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest',
    },
    device: 'Local Test Machine',
    platform: {
      name: 'windows',
      version: '11',
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'SauceDemo BDD' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ],
  },
});