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
const BitcoinValidator = __importStar(require("./bitcoin/validator"));
const EthereumValidator = __importStar(require("./ethereum/validator"));
const AeternityValidator = __importStar(require("./aeternity/validator"));
const Erc20Validator = __importStar(require("./erc20/validator"));
const HarmonyValidator = __importStar(require("./harmony/validator"));
const MaticValidator = __importStar(require("./matic/validator"));
const AvalancheValidator = __importStar(require("./avalanche/validator"));
const BinanceValidator = __importStar(require("./binance/validator"));
const config_1 = require("./erc20/config");
const getErc20Validators = () => {
    return Object.keys(config_1.SECONDARY_NETWORKS).reduce((object, token) => {
        object[token] = Erc20Validator;
        return object;
    }, {});
};
exports.default = Object.assign({ BTC: BitcoinValidator, ETH: EthereumValidator, AE: AeternityValidator, ONE: HarmonyValidator, MATIC: MaticValidator, AVAX: AvalancheValidator, BNB: BinanceValidator }, getErc20Validators());
