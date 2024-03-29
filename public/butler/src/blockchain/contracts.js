"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworkContracts = void 0;
const config_1 = __importDefault(require("./config"));
const config_2 = require("./erc20/config");
const bitcoin_1 = __importDefault(require("./bitcoin"));
const algorand_1 = __importDefault(require("./algorand"));
const ethereum_1 = __importDefault(require("./ethereum"));
const aeternity_1 = __importDefault(require("./aeternity"));
const erc20_1 = __importDefault(require("./erc20"));
const harmony_1 = __importDefault(require("./harmony"));
const matic_1 = __importDefault(require("./matic"));
const avalanche_1 = __importDefault(require("./avalanche"));
const binance_1 = __importDefault(require("./binance"));
const xinfin_1 = __importDefault(require("./xinfin"));
let Contracts;
let NetworkContracts;
const getErc20Contracts = (config) => {
    return Object.keys(config_2.SECONDARY_NETWORKS).reduce((object, token) => {
        if (config[token]) {
            object[token] = new erc20_1.default(config[token]);
        }
        return object;
    }, {});
};
const getContracts = () => {
    if (!Contracts) {
        const Config = config_1.default();
        const AllContracts = Object.assign(Object.assign({}, getErc20Contracts(Config)), { ETH: new ethereum_1.default(Config.ETH), BTC: Config.BTC && new bitcoin_1.default(Config.BTC), ALGO: Config.ALGO && new algorand_1.default(Config.ALGO), AE: Config.AE && new aeternity_1.default(Config.AE), ONE: Config.ONE && new harmony_1.default(Config.ONE), MATIC: Config.MATIC && new matic_1.default(Config.MATIC), AVAX: Config.AVAX && new avalanche_1.default(Config.AVAX), BNB: Config.BNB && new binance_1.default(Config.BNB), XDC: Config.XDC && new xinfin_1.default(Config.XDC) });
        Contracts = Object.entries(AllContracts).reduce((a, [k, v]) => (v === undefined ? a : Object.assign(Object.assign({}, a), { [k]: v })), {});
    }
    return Contracts;
};
const getNetworkContracts = () => {
    if (!NetworkContracts) {
        NetworkContracts = Object.entries(Contracts).reduce((a, [k, v]) => {
            if (config_2.SECONDARY_NETWORKS[k]) {
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
exports.getNetworkContracts = getNetworkContracts;
exports.default = getContracts;
