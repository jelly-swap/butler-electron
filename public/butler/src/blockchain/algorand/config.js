"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const algorand_1 = require("@jelly-swap/algorand");
const utils_1 = require("../../utils");
const config_1 = __importDefault(require("../../config"));
exports.default = () => {
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'ALGO', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'ALGO', 'SECRET']);
    const config = Object.assign(Object.assign({}, algorand_1.Config(7200)), { explorer: 'https://algoexplorer.io/tx/', providerUrl: 'https://spacejelly.network/algo/api/v1/algo', REFUND_PERIOD: 10, VALID_EXPIRATION: 72000, unix: true });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, SEED: secret });
    }
    else {
        throw new Error('Algorand ADDRESS and SECRET are missing.');
    }
};
