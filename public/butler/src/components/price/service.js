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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceService = void 0;
const config_1 = __importDefault(require("../../../config"));
const provider_1 = __importDefault(require("./provider"));
const logger_1 = require("../../logger");
const math_1 = require("../../utils/math");
const config_2 = __importDefault(require("../../config"));
const utils_1 = require("../../utils");
const utils_2 = require("../../blockchain/utils");
class PriceService {
    constructor() {
        this.prices = {};
        this.pricesWithSpreadAndFee = {};
        if (PriceService.instance) {
            return PriceService.instance;
        }
        this.userConfig = new config_2.default().getUserConfig();
        this.priceProvider = new provider_1.default[this.userConfig.PRICE.PROVIDER]();
        if (this.userConfig.JELLY_PRICE_PROVIDER) {
            this.jellyProvider = new provider_1.default.Jelly();
        }
        PriceService.instance = this;
    }
    update(provider, maxTries = 40) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let prices = {};
                if (provider) {
                    prices = yield provider.getPrices(config_1.default.PRICE.COINS);
                }
                else {
                    prices = yield this.priceProvider.getPrices(config_1.default.PRICE.COINS);
                }
                if (this.jellyProvider) {
                    const jellyPrices = yield this.jellyProvider.getPrices(null, null);
                    prices = Object.assign(Object.assign({}, prices), jellyPrices);
                }
                for (const pair in this.userConfig.PAIRS) {
                    if (!prices[pair]) {
                        logger_1.logDebug(`MISSING_PRICE`, pair);
                        logger_1.logError(`The price for ${pair} is missing.`);
                    }
                }
                if (Object.values(prices).length > 0) {
                    this.setPrices(prices);
                    this.setPricesWithSpreadAndFee(prices);
                }
            }
            catch (err) {
                if (maxTries > 0) {
                    yield utils_2.sleep(15000);
                    logger_1.logDebug('PRICE_SERVICE_DOWN', err);
                    logger_1.logInfo(`Starting new price service: ${this.userConfig.PRICE.PROVIDER}`);
                    this.priceProvider = new provider_1.default[this.userConfig.PRICE.PROVIDER]();
                    yield this.update(this.priceProvider, maxTries - 1);
                }
                else {
                    logger_1.logError(`Shutting down the application after 10 minutes without price provider.`);
                    process.exit(-1);
                }
            }
        });
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
    getPairPriceWithSpreadAndFee(base, quote) {
        const prices = this.getPricesWithSpreadAndFee();
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
            const pairPrice = utils_1.safeAccess(this.userConfig, ['PAIRS', pair, 'PRICE']) || 0;
            pricesWithSpread[pair] = pairPrice > 0 ? pairPrice : math_1.mul(prices[pair], math_1.sub(1, math_1.add(pairFee, config_1.default.FEE)));
        });
        this.pricesWithSpreadAndFee = pricesWithSpread;
    }
}
exports.PriceService = PriceService;
