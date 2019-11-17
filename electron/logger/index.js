class Logger {
  error(...msg) {
    console.error(...msg);
  }
  info(...msg) {
    console.info(...msg);
  }
}

const logger = new Logger();

module.exports = logger;