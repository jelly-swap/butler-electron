"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./bitcoin/config");
const config_2 = require("./ethereum/config");
const config_3 = require("./aeternity/config");
const config_4 = require("./erc20/config");
const supportedNetworks_1 = require("../config/supportedNetworks");
const config_5 = require("./config");
const getErc20Configs = (supportedNetworks) => {
    return Object.keys(config_5.SECONDARY_NETWORKS).reduce((object, token) => {
        if (supportedNetworks[token]) {
            object[token] = config_4.default(token);
        }
        return object;
    }, {});
};
exports.default = () => {
    const supportedNetworks = supportedNetworks_1.default();
    return Object.assign({ BTC: supportedNetworks['BTC'] && config_1.default(), ETH: supportedNetworks['ETH'] && config_2.default(), AE: supportedNetworks['AE'] && config_3.default() }, getErc20Configs(supportedNetworks));
};
//# sourceMappingURL=config-mainnet.js.map