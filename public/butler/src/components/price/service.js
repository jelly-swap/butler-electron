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
const config_1 = require("../../../config");
const provider_1 = require("./provider");
const logger_1 = require("../../logger");
const config_2 = require("../../blockchain/config");
const math_1 = require("../../utils/math");
const config_3 = require("../../config");
const utils_1 = require("../../utils");
const utils_2 = require("../../blockchain/utils");
class PriceService {
    constructor() {
        this.prices = {};
        this.pricesWithSpreadAndFee = {};
        if (PriceService.instance) {
            return PriceService.instance;
        }
        this.blockchainConfig = config_2.default();
        this.userConfig = new config_3.default().getUserConfig();
        this.priceProvider = new provider_1.default[this.userConfig.PRICE.PROVIDER]();
        PriceService.instance = this;
    }
    update(provider, maxTries = 5) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let prices = {};
                if (provider) {
                    prices = yield provider.getPrices(config_1.default.PRICE.COINS);
                }
                else {
                    prices = yield this.priceProvider.getPrices(config_1.default.PRICE.COINS);
                }
                let supportedPrices = {};
                for (const pair in this.userConfig.PAIRS) {
                    if (prices[pair]) {
                        supportedPrices[pair] = prices[pair];
                    }
                    else {
                        logger_1.logError(`SUPPORTED_PAIR_MISSING_PRICE: ${pair}`);
                    }
                }
                if (Object.values(prices).length > 0) {
                    this.setPrices(supportedPrices);
                    this.setPricesWithSpreadAndFee(supportedPrices);
                }
            }
            catch (err) {
                if (maxTries > 0) {
                    yield utils_2.sleep(2000);
                    logger_1.logError('PRICE_SERVICE_DOWN', err);
                    logger_1.logInfo(`Starting new price service: ${this.userConfig.PRICE.PROVIDER}`);
                    this.priceProvider = new provider_1.default[this.userConfig.PRICE.PROVIDER]();
                    yield this.update(this.priceProvider, maxTries - 1);
                }
                else {
                    logger_1.logInfo(`Shutting down the application.`);
                    process.exit(-1);
                }
            }
        });
    }
    isInputPriceValid(swap) {
        try {
            const pairPrice = this.getPairPrice(swap.network, swap.outputNetwork);
            const inputDecimals = this.blockchainConfig[swap.network].decimals;
            const outputDecimals = this.blockchainConfig[swap.outputNetwork].decimals;
            const priceInBig = math_1.mulDecimals(pairPrice, outputDecimals);
            const outputAmount = math_1.mul(priceInBig, math_1.divDecimals(swap.inputAmount, inputDecimals));
            const pairSlippage = this.userConfig.PAIRS[`${swap.network}-${swap.outputNetwork}`].SLIPPAGE || 0;
            const requestedAmount = math_1.mul(outputAmount, math_1.add(1, pairSlippage));
            const outputAmountWithoutFee = math_1.sub(swap.outputAmount, math_1.mul(swap.outputAmount, config_1.default.FEE));
            return math_1.greaterThan(outputAmountWithoutFee, requestedAmount);
        }
        catch (err) {
            return false;
        }
    }
    getPrices() {
        return this.prices;
    }
    getPricesWithSpreadAndFee() {
        return this.pricesWithSpreadAndFee;
    }
    getPairPrice(base, quote) {
        const prices = this.getPrices();
        const price = prices[`${base}-${quote}`];
        if (price) {
            return math_1.toBigNumber(price).toString();
        }
        else {
            throw new Error('INVALID_PAIR');
        }
    }
    setPrices(prices) {
        this.prices = prices;
    }
    setPricesWithSpreadAndFee(prices) {
        const pricesWithSpread = {};
        Object.keys(prices).forEach((pair) => {
            const pairFee = utils_1.safeAccess(this.userConfig, ['PAIRS', pair, 'FEE']) || 0;
            pricesWithSpread[pair] = math_1.mul(prices[pair], math_1.sub(1, math_1.add(pairFee, config_1.default.FEE)));
        });
        this.pricesWithSpreadAndFee = pricesWithSpread;
    }
}
exports.PriceService = PriceService;
//# sourceMappingURL=service.js.map