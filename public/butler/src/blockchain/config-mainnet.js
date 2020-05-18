"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./bitcoin/config");
const config_2 = require("./ethereum/config");
const config_3 = require("./aeternity/config");
const config_4 = require("./erc20/config");
const supportedNetworks_1 = require("../config/supportedNetworks");
exports.default = () => {
    const supportedNetworks = supportedNetworks_1.default();
    return {
        BTC: supportedNetworks['BTC'] && config_1.default(),
        ETH: supportedNetworks['ETH'] && config_2.default(),
        AE: supportedNetworks['AE'] && config_3.default(),
        DAI: supportedNetworks['DAI'] && config_4.default('DAI'),
        USDC: supportedNetworks['USDC'] && config_4.default('USDC'),
        WBTC: supportedNetworks['WBTC'] && config_4.default('WBTC'),
    };
};
//# sourceMappingURL=config-mainnet.js.map