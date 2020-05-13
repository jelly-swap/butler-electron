'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const winston_1 = require('winston');
const fileFormat = winston_1.format.combine(
  winston_1.format.timestamp(),
  winston_1.format.align(),
  winston_1.format.printf(
    log => `${new Date(log.timestamp).toLocaleString()} ${log.level.toUpperCase()}: ${log.message}`,
  ),
);
const consoleFormat = winston_1.format.combine(
  winston_1.format.colorize(),
  winston_1.format.timestamp(),
  winston_1.format.align(),
  winston_1.format.printf(log => `${new Date(log.timestamp).toLocaleString()} ${log.level}: ${log.message}`),
);
exports.default = {
  exitOnError: false,
  level: 'info',
  transports: [
    new winston_1.transports.Console({ format: consoleFormat }),
    new winston_1.transports.File({
      filename: `${__dirname}/../../logs/combined.log`,
      format: fileFormat,
      level: 'info',
    }),
    new winston_1.transports.File({
      filename: `${__dirname}/../../logs/error.log`,
      format: fileFormat,
      level: 'error',
    }),
  ],
};
//# sourceMappingURL=options.js.map
