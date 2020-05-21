"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_testnet_1 = require("./config-testnet");
const config_mainnet_1 = require("./config-mainnet");
let Config;
exports.SECONDARY_NETWORKS = {
    WBTC: 'WBTC',
    USDC: 'USDC',
    DAI: 'DAI',
};
exports.default = () => {
    if (!Config) {
        Config = process.env.NETWORK === 'testnet' ? config_testnet_1.default : config_mainnet_1.default();
    }
    return Config;
};
//# sourceMappingURL=config.js.map