"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const slack_1 = require("./slack");
const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
        custom: 7,
    },
    colors: {
        error: 'red',
        debug: 'blue',
        warn: 'yellow',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        silly: 'magenta',
        custom: 'yellow',
    },
};
winston_1.addColors(config.colors);
const baseFormat = [
    winston_1.format.json(),
    winston_1.format.timestamp(),
    winston_1.format.align(),
    winston_1.format.printf((log) => `${new Date(log.timestamp).toLocaleString()} ${log.level}: ${log.message}`),
];
const fileFormat = winston_1.format.combine(...baseFormat);
const consoleFormat = winston_1.format.combine(winston_1.format.colorize(), ...baseFormat);
const logger = winston_1.createLogger({
    exitOnError: false,
    levels: config.levels,
    transports: [
        new winston_1.transports.Console({ format: consoleFormat }),
        new winston_1.transports.File({
            filename: `${__dirname}/../../logs/combined.log`,
            format: fileFormat,
        }),
        new winston_1.transports.File({
            filename: `${__dirname}/../../logs/error.log`,
            format: fileFormat,
            level: 'error',
        }),
    ],
});
if (slack_1.getSlackTransport()) {
    logger.add(slack_1.getSlackTransport());
}
exports.logWarn = (msg, data) => log('warn', msg, data);
exports.logInfo = (msg, data) => log('info', msg, data);
exports.logError = (msg, data) => log('error', msg, data);
const log = (level, msg, data) => {
    if (data) {
        logger[level](`${msg} : ${JSON.stringify(data)}`);
        if (process.send) {
            process.send(`${level.toUpperCase()}: ${msg}: ${JSON.stringify(data)}`);
        }
    }
    else {
        logger[level](msg);
        if (process.send) {
            process.send(`${level.toUpperCase()}: ${msg}`);
        }
    }
};
exports.default = logger;
//# sourceMappingURL=index.js.map