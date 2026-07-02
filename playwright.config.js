// const { defineConfig, devices } = require('@playwright/test');
const { defineConfig } = require('@playwright/test');
const { defineBddConfig, cucumberReporter } = require('playwright-bdd');

// Default to production if no ENV is provided
const ENV = process.env.ENV || 'prod';
const TAG = process.env.TAG || '@regression';

const environments = {
  staging: 'https://staging.saucedemo.com',
  prod: 'https://www.saucedemo.com',
};

// const testDir = defineBddConfig({
//   features: 'features/*.feature',
//   steps: 'steps/*.steps.js',
//   tags: process.env.TAGS || '', // If no tags provided, run everything
// });

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: ['steps/*.steps.js', 'steps/fixtures.js'], // Ensure fixtures is included in steps
  importTestFrom: 'steps/fixtures.js',            // Add this line (path is relative to config)
  tags:process.env.TAGS || ''
});

module.exports = defineConfig({
  // testDir: './tests',
  testDir,
  fullyParallel: true, // Run all tests in parallel
  retries: process.env.CI ? 2 : 0, // Retry twice on CI failures
  // reporter: 'html', // Generate a nice HTML report
  
  use: {
    baseURL: environments[ENV],
    browserName: 'chromium',
    headless: false,
    trace: 'on-first-retry', // Record traces for debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['html'], // Standard Playwright report
    cucumberReporter('json', { outputFile: 'cucumber-report/report.json' }),
  ],
  // 1. Disable parallel execution within a single file
  fullyParallel: false, 
  
  // 2. Limit the number of browser instances to one
  workers: 1,
  // projects: [
  //   { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  //   // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  //   // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  // ],
});



// // @ts-check
// import { defineConfig, devices } from '@playwright/test';

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * @see https://playwright.dev/docs/test-configuration
//  */
// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('')`. */
//     // baseURL: 'http://localhost:3000',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: 'on-first-retry',
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },

//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });

