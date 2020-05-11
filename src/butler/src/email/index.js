"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const swap_1 = require("./templates/swap");
const withdraw_1 = require("./templates/withdraw");
const refund_1 = require("./templates/refund");
const logger_1 = require("../logger");
const config_1 = require("../config");
const utils_1 = require("../utils");
class EmailService {
    constructor() {
        if (EmailService.Instance) {
            return EmailService.Instance;
        }
        this.userConfig = new config_1.default().getUserConfig();
        this.transport = nodemailer_1.createTransport({
            service: utils_1.safeAccess(this.userConfig, ['NOTIFICATIONS', 'EMAIL', 'SERVICE']),
            auth: {
                user: utils_1.safeAccess(this.userConfig, ['NOTIFICATIONS', 'EMAIL', 'USERNAME']),
                pass: utils_1.safeAccess(this.userConfig, ['NOTIFICATIONS', 'EMAIL', 'PASSWORD']),
            },
        });
        EmailService.Instance = this;
    }
    send(topic, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.userConfig.NOTIFICATIONS.EMAIL.ENABLED) {
                let result;
                switch (topic) {
                    case 'SWAP': {
                        result = swap_1.default(data);
                        break;
                    }
                    case 'WITHDRAW': {
                        result = withdraw_1.default(data);
                        break;
                    }
                    case 'REFUND': {
                        result = refund_1.default(data);
                        break;
                    }
                }
                if (result) {
                    yield this._send(topic, result);
                }
            }
        });
    }
    _send(title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: utils_1.safeAccess(this.userConfig, ['NOTIFICATIONS', 'EMAIL', 'FROM']),
                to: utils_1.safeAccess(this.userConfig, ['NOTIFICATIONS', 'EMAIL', 'TO']),
                subject: `${utils_1.safeAccess(this.userConfig, ['NOTIFICATIONS', 'EMAIL', 'SUBJECT'])} ${title}`,
                text: JSON.stringify(content.json),
                html: content.html,
            };
            yield this.transport.sendMail(mailOptions, (err, information) => {
                if (err) {
                    logger_1.logError('EMAIL_ERROR', err);
                }
                else {
                    logger_1.logInfo('EMAIL_SENT', information.response);
                }
            });
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=index.js.map