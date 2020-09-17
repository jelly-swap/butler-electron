"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const matic_1 = require("@jelly-swap/matic");
const config_1 = __importDefault(require("../../config"));
const utils_1 = require("../../utils");
exports.default = () => {
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'MATIC', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'MATIC', 'SECRET']);
    const config = Object.assign(Object.assign({}, matic_1.Config(7200)), { providerUrl: 'https://rpc-mainnet.matic.network', contractAddress: '0x1Ef8a808B3bE1Fc725Db5f6BAA9DC187E8b033eE', explorer: 'https://explorer.matic.network/tx/', chainId: 137, REFUND_PERIOD: 10, VALID_EXPIRATION: 72000 });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
    }
    else {
        throw new Error('MATIC ADDRESS and SECRET are missing.');
    }
};
