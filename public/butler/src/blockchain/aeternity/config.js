"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aeternity_1 = require("@jelly-swap/aeternity");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const logger_1 = require("../../logger");
exports.default = () => {
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'AE', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'AE', 'SECRET']);
    const config = Object.assign(Object.assign({}, aeternity_1.Config(7200)), { providerUrl: 'https://sdk-mainnet.aepps.com/', internalUrl: 'https://sdk-mainnet.aepps.com/', compilerUrl: 'https://compiler.aepps.com', wsUrl: 'wss://mainnet.aeternal.io/websocket', apiUrl: 'https://mainnet.aeternal.io/', contractAddress: 'ct_jmRkfpzmn7KZbXbkEL9wueJkb1vaFzMnVFJMFjAnJgj1CTtQe', explorer: 'https://explorer.aepps.com/transactions/', REFUND_PERIOD: 10, 
        //Expiration is in milliseconds
        VALID_EXPIRATION: 72000000 });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, KEY_PAIR: {
                publicKey: address,
                secretKey: secret,
            } });
    }
    else {
        logger_1.logError('Aeternity ADDRESS and SECRET are missing.');
    }
};
//# sourceMappingURL=config.js.map