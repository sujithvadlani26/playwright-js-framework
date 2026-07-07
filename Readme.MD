# Playwright JavaScript BDD Framework
A professional-grade automation framework using Playwright and Cucumber (Gherkin). This framework is designed for scalability with the Page Object Model (POM), a custom LoggerFactory, and environment-based configuration.

# Framework Architecture
The framework is organized into distinct layers to ensure separation of concerns:
 - features/: Business requirements written in plain English (Gherkin).
 - steps/: Step definitions that translate Gherkin into executable actions.
 - pages/: Page Object Model (POM) classes containing UI selectors and interactions.
 - utils/: Shared helpers, including the custom LoggerFactory for clean execution logs.
 - .features-gen/: Auto-generated Playwright tests (internal use, git-ignored).

# Prerequisites
 - Node.js: v18.0.0 or higher
 - npm: Included with Node.js

## Installation
# Clone the repository
git clone <your-repository-url>
cd playwright-js-framework

# Install project dependencies
npm install

# Install Playwright browser binaries
npx playwright install --with-deps

# Execution Commands
This framework uses playwright-bdd. You must generate the internal test files before running the Playwright engine.
 - npx bddgen --> Generates Playwright tests from .feature files.
 - npx playwright test --> Runs all generated tests in headless mode.
 - npm test --> Helper script to run both bddgen and test.
 - npx playwright test --ui --> Opens the Playwright UI Mode (best for local dev).
 - npx playwright show-report --> Opens the last generated HTML test report.

# Logging & Debugging
We use a custom LoggerFactory to provide clean, color-coded console output.
 - INFO: [2026-01-01T...][INFO][LoginPage]: Navigating to URL...
 - ERROR: [2026-01-01T...][ERROR][LoginPage]: Element not found!
To see traces and videos for failed tests, check the test-results/ folder or view the HTML report.

# Configuration
The playwright.config.js file controls:
 - Base URL: Update the use: { baseURL: '...' } property to change the target site.
 - Browsers: Currently configured for Chromium, Firefox, and Webkit (Safari).
 - Parallelism: Set to run tests in parallel by default for speed.


 npx playwright test tests/login.spec.js
 npx playwright test tests/login.spec.js --ui  

 npx playwright test tests/test.spec.js;

 npm run test:smoke