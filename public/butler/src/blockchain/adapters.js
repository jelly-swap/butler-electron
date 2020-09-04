"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_1 = require("@jelly-swap/bitcoin");
const ethereum_1 = require("@jelly-swap/ethereum");
const aeternity_1 = require("@jelly-swap/aeternity");
const erc20_1 = require("@jelly-swap/erc20");
const harmony_1 = require("@jelly-swap/harmony");
const matic_1 = require("@jelly-swap/matic");
const config_1 = __importStar(require("./config"));
let Adapters;
const getErc20Adapters = (config) => {
    return Object.keys(config_1.SECONDARY_NETWORKS).reduce((object, token) => {
        if (config[token]) {
            object[token] = new erc20_1.Adapter(config[token]);
        }
        return object;
    }, {});
};
exports.default = () => {
    if (!Adapters) {
        const Config = config_1.default();
        const AllAdapters = Object.assign(Object.assign({}, getErc20Adapters(Config)), { ETH: Config.ETH && new ethereum_1.Adapter(Config.ETH), BTC: Config.BTC && new bitcoin_1.Adapter(Config.BTC), AE: Config.AE && new aeternity_1.Adapter(Config.AE), ONE: Config.ONE && new harmony_1.Adapter(Config.ONE), MATIC: Config.MATIC && new matic_1.Adapter(Config.MATIC) });
        Adapters = Object.entries(AllAdapters).reduce((a, [k, v]) => (v === undefined ? a : Object.assign(Object.assign({}, a), { [k]: v })), {});
    }
    return Adapters;
};
//# sourceMappingURL=adapters.js.map