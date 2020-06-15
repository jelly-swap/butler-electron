"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEventListener = exports.getNetworkContracts = void 0;
const config_1 = require("./config");
const bitcoin_1 = require("./bitcoin");
const ethereum_1 = require("./ethereum");
const aeternity_1 = require("./aeternity");
const erc20_1 = require("./erc20");
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
        const AllContracts = Object.assign(Object.assign({}, getErc20Contracts(Config)), { ETH: Config.ETH && new ethereum_1.default(Config.ETH), BTC: Config.BTC && new bitcoin_1.default(Config.BTC), AE: Config.AE && new aeternity_1.default(Config.AE) });
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
exports.startEventListener = () => __awaiter(void 0, void 0, void 0, function* () {
    getContracts();
    exports.getNetworkContracts();
    for (const network in NetworkContracts) {
        yield NetworkContracts[network].subscribe();
    }
});
exports.default = getContracts;
//# sourceMappingURL=contracts.js.map