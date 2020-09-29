"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_testnet_1 = __importDefault(require("./config-testnet"));
const config_mainnet_1 = __importDefault(require("./config-mainnet"));
let Config;
exports.default = () => {
    if (!Config) {
        Config = process.env.NETWORK === 'testnet' ? config_testnet_1.default() : config_mainnet_1.default();
    }
    return Config;
};
