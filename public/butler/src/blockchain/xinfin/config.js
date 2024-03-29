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
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'XDC', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'XDC', 'SECRET']);
    const config = Object.assign(Object.assign({}, avalanche_1.Config(7200)), { explorer: 'https://explorer.xinfin.network/tx/', providerUrl: 'https://appsrpc.xinfin.network/', contractAddress: '0xdc81ec2ea4e84e8f53824922101b3d285e4c036b', chainId: 50, REFUND_PERIOD: 10, VALID_EXPIRATION: 72000 });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
    }
    else {
        throw new Error('XDC ADDRESS and XDC Private key are missing.');
    }
};
