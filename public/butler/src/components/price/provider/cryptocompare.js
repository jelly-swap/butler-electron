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
const node_fetch_1 = require("node-fetch");
const CryptoCompareApi = require("cryptocompare");
const config_1 = require("../../../config");
global.fetch = node_fetch_1.default;
class CryptoCompareProvider {
    constructor() {
        const userConfig = new config_1.default().getUserConfig();
        CryptoCompareApi.setApiKey(userConfig.PRICE.API_KEY);
    }
    getPrices(q, b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!b) {
                    b = q;
                }
                const prices = {};
                const result = yield CryptoCompareApi.priceMulti(q, b);
                Object.keys(result).forEach((base) => {
                    Object.keys(result[base]).forEach((quote) => {
                        prices[`${base}-${quote}`] = result[base][quote];
                    });
                });
                return prices;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.default = CryptoCompareProvider;
//# sourceMappingURL=cryptocompare.js.map