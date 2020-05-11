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
const moment = require("moment");
const validators_1 = require("./validators");
const config_1 = require("./config");
const math_1 = require("../utils/math");
const logger_1 = require("../logger");
const service_1 = require("../components/price/service");
const config_2 = require("../config");
const utils_1 = require("../utils");
exports.isInputSwapExpirationValid = (swap) => {
    const now = getCurrentDate(config_1.default[swap.network].unix);
    const result = math_1.greaterThan(math_1.sub(swap.expiration, now), config_1.default[swap.network].VALID_EXPIRATION);
    if (!result) {
        logger_1.logError(`INVALID_EXPIRATION`, swap);
    }
    return result;
};
exports.isOutputSwapValid = (swap) => __awaiter(void 0, void 0, void 0, function* () {
    const networkValidation = yield validators_1.default[swap.network].validateNewContract(swap);
    if (!networkValidation) {
        logger_1.logError(`CHAIN_VALIDATION_FAILED`, swap);
        return false;
    }
    //Add exception for ERC20 Tokens
    if (swap.outputAddress.toLowerCase() === config_1.default[swap.network].receiverAddress.toLowerCase()) {
        logger_1.logError(`WRONG_OUTPUT_ADDRESS`, swap);
        return false;
    }
    if (swap.sender.toLowerCase() === swap.receiver.toLowerCase()) {
        logger_1.logError(`SENDER_CANNOT_EQUAL_RECEIVER`, swap);
        return false;
    }
    const isPairValid = isInputPairValid(swap);
    if (!isPairValid) {
        logger_1.logError(`INVALID_PAIR`, swap);
        return false;
    }
    const isPriceValid = new service_1.PriceService().isInputPriceValid(swap);
    if (!isPriceValid) {
        logger_1.logError(`WRONG_PRICE`, swap);
        return false;
    }
    return true;
});
exports.validateWithdraw = (withdraw) => __awaiter(void 0, void 0, void 0, function* () {
    const networkValidation = yield validators_1.default[withdraw.network].validateWithdraw(withdraw);
    return networkValidation;
});
function isInputPairValid(swap) {
    const userConfig = new config_2.default().getUserConfig();
    const pair = utils_1.safeAccess(userConfig, ['PAIRS', `${swap.network}-${swap.outputNetwork}`]);
    if (pair) {
        return true;
    }
    return false;
}
const getCurrentDate = (unix) => {
    const now = moment.now().valueOf();
    if (unix) {
        return Math.floor(now / 1000);
    }
    return now;
};
//# sourceMappingURL=validator.js.map