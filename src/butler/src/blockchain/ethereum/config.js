"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_1 = require("@jelly-swap/ethereum");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const logger_1 = require("../../logger");
exports.default = () => {
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'ETH', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'ETH', 'SECRET']);
    const config = Object.assign(Object.assign({}, ethereum_1.Config(7200)), { providerUrl: 'https://mainnet.infura.io/v3/ee13a282868d4e7cb7d9a9543958631d', contractAddress: '0x471B080EffB2bc6fb33c8c6FE6ce1AB46F9f522b', explorer: 'https://etherscan.io/tx/', REFUND_PERIOD: 10, VALID_EXPIRATION: 72000, gasMultiplier: 3 });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
    }
    else {
        logger_1.logError('Ethereums ADDRESS and SECRET are missing.');
    }
};
//# sourceMappingURL=config.js.map