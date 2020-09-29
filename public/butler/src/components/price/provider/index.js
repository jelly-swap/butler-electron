"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cryptocompare_1 = __importDefault(require("./cryptocompare"));
const binance_1 = __importDefault(require("./binance"));
const jelly_1 = __importDefault(require("./jelly"));
exports.default = {
    CryptoCompare: cryptocompare_1.default,
    Binance: binance_1.default,
    Jelly: jelly_1.default,
};
