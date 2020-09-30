"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const avalanche_1 = require("@jelly-swap/avalanche");
const config_1 = __importDefault(require("../../config"));
const utils_1 = require("../../utils");
exports.default = () => {
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'BNB', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'BNB', 'SECRET']);
    const config = Object.assign(Object.assign({}, avalanche_1.Config(7200)), { explorer: 'https://bscscan.com//tx/', providerUrl: 'https://bsc-dataseed.binance.org/', contractAddress: '0xe77b9f7a4b0f22ab015c30d9f1a016b4759179ae', chainId: 56, REFUND_PERIOD: 10, VALID_EXPIRATION: 72000 });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
    }
    else {
        throw new Error('BNB ADDRESS and BNB are missing.');
    }
};
