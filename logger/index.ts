class Logger {
  error(...msg: any[]) {
    console.error(...msg);
  }
  info(...msg: any[]) {
    console.info(...msg);
  }
}

const logger = new Logger();

export { logger, Logger };