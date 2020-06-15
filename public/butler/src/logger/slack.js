"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SlackHook = require("winston-slack-webhook-transport");
const config_1 = require("../config");
const utils_1 = require("../utils");
exports.getSlackTransport = () => {
    const userConfig = new config_1.default().getUserConfig();
    if (userConfig.NOTIFICATIONS.SLACK.ENABLED) {
        return new SlackHook({
            level: 'error',
            webhookUrl: utils_1.safeAccess(userConfig, ['NOTIFICATIONS', 'SLACK', 'WEBHOOK_URL']),
        });
    }
};
//# sourceMappingURL=slack.js.map