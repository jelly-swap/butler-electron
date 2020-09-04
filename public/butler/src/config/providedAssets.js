"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
exports.default = () => {
    const userConfig = new _1.default().getUserConfig();
    const pairs = userConfig.PAIRS;
    return Object.keys(pairs).reduce((result, pair) => {
        const asset = pair.split('-')[1];
        if (asset) {
            if (!result[asset]) {
                result[asset] = true;
            }
        }
        return result;
    }, {});
};
