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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./bitcoin/config"));
const config_2 = __importDefault(require("./algorand/config"));
const config_3 = __importDefault(require("./ethereum/config"));
const config_4 = __importDefault(require("./aeternity/config"));
const config_5 = __importStar(require("./erc20/config"));
const config_6 = __importDefault(require("./harmony/config"));
const config_7 = __importDefault(require("./matic/config"));
const config_8 = __importDefault(require("./avalanche/config"));
const config_9 = __importDefault(require("./binance/config"));
const supportedNetworks_1 = __importDefault(require("../config/supportedNetworks"));
const getErc20Configs = (supportedNetworks) => {
    return Object.keys(config_5.SECONDARY_NETWORKS).reduce((object, token) => {
        if (supportedNetworks[token]) {
            object[token] = config_5.default(token);
        }
        return object;
    }, {});
};
exports.default = () => {
    const supportedNetworks = supportedNetworks_1.default();
    return Object.assign({ BTC: supportedNetworks['BTC'] && config_1.default(), ALGO: supportedNetworks['ALGO'] && config_2.default(), ETH: config_3.default(), AE: supportedNetworks['AE'] && config_4.default(), ONE: supportedNetworks['ONE'] && config_6.default(), MATIC: supportedNetworks['MATIC'] && config_7.default(), AVAX: supportedNetworks['AVAX'] && config_8.default(), BNB: supportedNetworks['BNB'] && config_9.default() }, getErc20Configs(supportedNetworks));
};
