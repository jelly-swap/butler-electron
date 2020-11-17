"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
let SupportedNetworks;
exports.default = () => {
    const userConfig = new _1.default().getUserConfig();
    const pairs = userConfig.PAIRS;
    if (!SupportedNetworks) {
        SupportedNetworks = Object.keys(pairs).reduce((result, pair) => {
            const base = pair.split('-')[0];
            const quote = pair.split('-')[1];
            if (base && quote) {
                if (!result[base]) {
                    result[base] = true;
                }
                if (!result[quote]) {
                    result[quote] = true;
                }
            }
            return result;
        }, {});
    }
    return SupportedNetworks;
};
