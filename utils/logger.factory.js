const colors = {
  info: '\x1b[32m',    // Green
  error: '\x1b[31m',   // Red
  warning: '\x1b[33m', // Yellow
  reset: '\x1b[0m'     // Reset
};

class Logger {
  constructor(component) {
    this.component = component; // e.g., 'LoginPage' or 'AuthTest'
  }

  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.component}]: ${message}`;
  }

  info(message) {
    console.log(`${colors.info}${this.formatMessage('info', message)}${colors.reset}`);
  }

  error(message) {
    console.error(`${colors.error}${this.formatMessage('error', message)}${colors.reset}`);
  }

  warn(message) {
    console.warn(`${colors.warning}${this.formatMessage('warn', message)}${colors.reset}`);
  }
}

// Factory function to create new loggers
exports.loggerFactory = (component) => new Logger(component);