"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logData = exports.logDebug = exports.logError = exports.logWarn = exports.logInfo = exports.setLoggerConfig = void 0;
const winston_1 = require("winston");
const config_1 = require("./config");
let logger;
const setLoggerConfig = (combinedFile, errorFile) => {
    logger = winston_1.createLogger({
        exitOnError: false,
        levels: config_1.Config.levels,
        transports: [
            new winston_1.transports.Console({ format: config_1.consoleFormat }),
            new winston_1.transports.File({
                filename: combinedFile || `${__dirname}/../../logs/combined.log`,
                format: config_1.fileFormat,
            }),
            new winston_1.transports.File({
                filename: errorFile || `${__dirname}/../../logs/error.log`,
                format: config_1.fileFormat,
                level: 'debug',
            }),
        ],
    });
};
exports.setLoggerConfig = setLoggerConfig;
const logInfo = (msg, data) => log('info', msg, data);
exports.logInfo = logInfo;
const logWarn = (msg, data) => log('warn', msg, data);
exports.logWarn = logWarn;
const logError = (msg, data) => log('error', msg, data);
exports.logError = logError;
const logDebug = (msg, data) => log('debug', msg, data);
exports.logDebug = logDebug;
const logData = (msg, data) => log('data', msg, data);
exports.logData = logData;
const FORWARD_LOG_LEVEL = ['error', 'data'];
const log = (level, msg, data) => {
    if (data) {
        logger[level](`${msg} : ${JSON.stringify(data)}`);
    }
    else {
        logger[level](msg);
        if (process.send && FORWARD_LOG_LEVEL.includes(level)) {
            process.send({ TYPE: 'LOGGER', DATA: { level, timestamp: new Date().toLocaleString(), msg } });
        }
    }
};
exports.default = logger;
