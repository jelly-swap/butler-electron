"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const options_1 = require("./options");
const slack_1 = require("./slack");
const logger = winston_1.createLogger(options_1.default);
const slackTransport = slack_1.getSlackTransport();
if (slackTransport) {
    logger.add(slack_1.getSlackTransport());
}
exports.logInfo = (msg, data) => {
    if (data) {
        if (process.send) {
            process.send(`INFO: ${msg}: ${JSON.stringify(data)}`);
        }
        logger.log('info', `${msg}: ${JSON.stringify(data)}`);
    }
    else {
        if (process.send) {
            process.send(`INFO: ${msg}`);
        }
        logger.log('info', msg);
    }
};
exports.logError = (msg, data) => {
    if (data) {
        if (process.send) {
            process.send(`ERROR: ${msg}: ${JSON.stringify(data)}`);
        }
        logger.log('error', `${msg}: ${JSON.stringify(data)}`);
    }
    else {
        if (process.send) {
            process.send(`ERROR: ${msg}`);
        }
        logger.log('error', msg);
    }
};
//# sourceMappingURL=index.js.map