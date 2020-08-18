"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const harmony_1 = require("@jelly-swap/harmony");
const config_1 = __importDefault(require("../../config"));
const utils_1 = require("../../utils");
exports.default = () => {
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'ONE', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'ONE', 'SECRET']);
    const config = Object.assign(Object.assign({}, harmony_1.Config(7200)), { providerUrl: 'https://api.s0.t.hmny.io', contractAddress: '0x381a5b682D3e143DCADc0C42912CB97BED501919', explorer: 'https://explorer.harmony.one/#/tx/', REFUND_PERIOD: 10, VALID_EXPIRATION: 72000 });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
    }
    else {
        throw new Error('ONE ADDRESS and SECRET are missing.');
    }
};
//# sourceMappingURL=config.js.map