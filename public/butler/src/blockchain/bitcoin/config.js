"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_1 = require("@jelly-swap/bitcoin");
const btc_utils_1 = require("@jelly-swap/btc-utils");
const utils_1 = require("../../utils");
const config_1 = require("../../config");
const logger_1 = require("../../logger");
exports.default = () => {
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'BTC', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'BTC', 'SECRET']);
    const config = Object.assign(Object.assign({}, bitcoin_1.Config(14400)), { providerUrl: 'https://spacejelly.network/btc/api/v1/btc/', apiProviderUrl: 'https://spacejelly.network/btc/api/v1/btc/', explorer: 'https://blockstream.info/tx/', REFUND_PERIOD: 10, REFUND_BLOCKS: 500, VALID_EXPIRATION: 72000, NETWORK: btc_utils_1.Networks.bitcoin });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, REFUND: address, SEED: secret });
    }
    else {
        logger_1.logError('Bitcoin ADDRESS and SECRET are missing.');
    }
};
//# sourceMappingURL=config.js.map