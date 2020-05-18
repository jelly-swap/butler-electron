"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_1 = require("@jelly-swap/bitcoin");
const ethereum_1 = require("@jelly-swap/ethereum");
const aeternity_1 = require("@jelly-swap/aeternity");
const erc20_1 = require("@jelly-swap/erc20");
const config_1 = require("./config");
let Adapters;
exports.default = () => {
    if (!Adapters) {
        const Config = config_1.default();
        const AllAdapters = {
            ETH: Config.ETH && new ethereum_1.Adapter(Config.ETH),
            BTC: Config.BTC && new bitcoin_1.Adapter(Config.BTC),
            AE: Config.AE && new aeternity_1.Adapter(Config.AE),
            DAI: Config.DAI && new erc20_1.Adapter('DAI', Config.DAI),
            USDC: Config.USDC && new erc20_1.Adapter('USDC', Config.USDC),
            WBTC: Config.WBTC && new erc20_1.Adapter('WBTC', Config.WBTC),
        };
        Adapters = Object.entries(AllAdapters).reduce((a, [k, v]) => (v === undefined ? a : Object.assign(Object.assign({}, a), { [k]: v })), {});
    }
    return Adapters;
};
//# sourceMappingURL=adapters.js.map