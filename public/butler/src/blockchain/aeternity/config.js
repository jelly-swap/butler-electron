"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aeternity_1 = require("@jelly-swap/aeternity");
const config_1 = __importDefault(require("../../config"));
const utils_1 = require("../../utils");
exports.default = () => {
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'AE', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'AE', 'SECRET']);
    const config = Object.assign(Object.assign({}, aeternity_1.Config(7200)), { providerUrl: 'https://mainnet.aeternity.io/', internalUrl: 'https://mainnet.aeternity.io/', compilerUrl: 'https://latest.compiler.aepps.com', wsUrl: 'wss://mainnet.aeternal.io/websocket', apiUrl: 'https://mainnet.aeternal.io/', contractAddress: 'ct_jmRkfpzmn7KZbXbkEL9wueJkb1vaFzMnVFJMFjAnJgj1CTtQe', explorer: 'https://explorer.aepps.com/transactions/', REFUND_PERIOD: 10, VALID_EXPIRATION: 72000 });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, KEY_PAIR: {
                publicKey: address,
                secretKey: secret,
            } });
    }
    else {
        throw new Error('Aeternity ADDRESS and SECRET are missing.');
    }
};
