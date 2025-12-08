import winston from 'winston';

const LOG_DIR = process.env.LOG_DIR || 'logs';

const now = new Date();
const logFilename = now
  .toISOString()
  .replace(/\..+/, '') // delete the dot and everything after;
  .replace(/:/g, '-') // replace : with a -
  .replace(/T/, '.'); // replace T with a dot

export const logger = winston.createLogger({
  level: 'info', // minimum level to log
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // log to console
    new winston.transports.File({
      filename: `${LOG_DIR}/${logFilename}.error.log`,
      level: 'error',
    }),
    new winston.transports.File({ filename: `${LOG_DIR}/${logFilename}.log` }),
  ],
});

export const consoleLogger = function (level, message, ...params) {
  logger.log(level, message);
  if (params.length > 0) {
    logger.log(level, JSON.stringify(params));
  }
};
