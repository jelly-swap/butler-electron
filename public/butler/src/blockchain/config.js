"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECONDARY_NETWORKS = void 0;
const config_testnet_1 = __importDefault(require("./config-testnet"));
const config_mainnet_1 = __importDefault(require("./config-mainnet"));
let Config;
exports.SECONDARY_NETWORKS = {
    WBTC: 'WBTC',
    USDC: 'USDC',
    DAI: 'DAI',
    'BTC++': 'BTC++',
};
exports.default = () => {
    if (!Config) {
        Config = process.env.NETWORK === 'testnet' ? config_testnet_1.default : config_mainnet_1.default();
    }
    return Config;
};
//# sourceMappingURL=config.js.map