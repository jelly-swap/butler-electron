"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_1 = require("@jelly-swap/bitcoin");
const ethereum_1 = require("@jelly-swap/ethereum");
const aeternity_1 = require("@jelly-swap/aeternity");
const erc20_1 = require("@jelly-swap/erc20");
const config_1 = require("./config");
let Adapters;
const getErc20Adapters = (config) => {
    return Object.keys(config_1.SECONDARY_NETWORKS).reduce((object, token) => {
        if (config[token]) {
            object[token] = new erc20_1.Adapter(token, config[token]);
        }
        return object;
    }, {});
};
exports.default = () => {
    if (!Adapters) {
        const Config = config_1.default();
        const AllAdapters = Object.assign(Object.assign({}, getErc20Adapters(Config)), { ETH: Config.ETH && new ethereum_1.Adapter(Config.ETH), BTC: Config.BTC && new bitcoin_1.Adapter(Config.BTC), AE: Config.AE && new aeternity_1.Adapter(Config.AE) });
        Adapters = Object.entries(AllAdapters).reduce((a, [k, v]) => (v === undefined ? a : Object.assign(Object.assign({}, a), { [k]: v })), {});
    }
    return Adapters;
};
//# sourceMappingURL=adapters.js.map