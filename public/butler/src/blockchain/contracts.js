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
exports.getNetworkContracts = void 0;
const config_1 = __importStar(require("./config"));
const bitcoin_1 = __importDefault(require("./bitcoin"));
const ethereum_1 = __importDefault(require("./ethereum"));
const aeternity_1 = __importDefault(require("./aeternity"));
const erc20_1 = __importDefault(require("./erc20"));
const harmony_1 = __importDefault(require("./harmony"));
const matic_1 = __importDefault(require("./matic"));
let Contracts;
let NetworkContracts;
const getErc20Contracts = (config) => {
    return Object.keys(config_1.SECONDARY_NETWORKS).reduce((object, token) => {
        if (config[token]) {
            object[token] = new erc20_1.default(config[token]);
        }
        return object;
    }, {});
};
const getContracts = () => {
    if (!Contracts) {
        const Config = config_1.default();
        const AllContracts = Object.assign(Object.assign({}, getErc20Contracts(Config)), { ETH: Config.ETH && new ethereum_1.default(Config.ETH), BTC: Config.BTC && new bitcoin_1.default(Config.BTC), AE: Config.AE && new aeternity_1.default(Config.AE), ONE: Config.ONE && new harmony_1.default(Config.ONE), MATIC: Config.MATIC && new matic_1.default(Config.MATIC) });
        Contracts = Object.entries(AllContracts).reduce((a, [k, v]) => (v === undefined ? a : Object.assign(Object.assign({}, a), { [k]: v })), {});
    }
    return Contracts;
};
exports.getNetworkContracts = () => {
    if (!NetworkContracts) {
        NetworkContracts = Object.entries(Contracts).reduce((a, [k, v]) => {
            if (config_1.SECONDARY_NETWORKS[k]) {
                a['ERC20'] = v;
            }
            else {
                a[k] = v;
            }
            return a;
        }, {});
    }
    return NetworkContracts;
};
exports.default = getContracts;
//# sourceMappingURL=contracts.js.map