"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_1 = require("@jelly-swap/bitcoin");
const ethereum_1 = require("@jelly-swap/ethereum");
const aeternity_1 = require("@jelly-swap/aeternity");
const erc20_1 = require("@jelly-swap/erc20");
const harmony_1 = require("@jelly-swap/harmony");
const matic_1 = require("@jelly-swap/matic");
const avalanche_1 = require("@jelly-swap/avalanche");
const config_1 = __importDefault(require("./config"));
const config_2 = require("./erc20/config");
let Adapters;
const getErc20Adapters = (config) => {
    return Object.keys(config_2.SECONDARY_NETWORKS).reduce((object, token) => {
        if (config[token]) {
            object[token] = new erc20_1.Adapter(config[token]);
        }
        return object;
    }, {});
};
exports.default = () => {
    if (!Adapters) {
        const Config = config_1.default();
        const AllAdapters = Object.assign(Object.assign({}, getErc20Adapters(Config)), { ETH: Config.ETH && new ethereum_1.Adapter(Config.ETH), BTC: Config.BTC && new bitcoin_1.Adapter(Config.BTC), AE: Config.AE && new aeternity_1.Adapter(Config.AE), ONE: Config.ONE && new harmony_1.Adapter(Config.ONE), MATIC: Config.MATIC && new matic_1.Adapter(Config.MATIC), AVAX: Config.AVAX && new avalanche_1.Adapter(Config.AVAX), BNB: Config.BNB && new avalanche_1.Adapter(Config.BNB) });
        Adapters = Object.entries(AllAdapters).reduce((a, [k, v]) => (v === undefined ? a : Object.assign(Object.assign({}, a), { [k]: v })), {});
    }
    return Adapters;
};
