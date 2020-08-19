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
const node_binance_api_1 = __importDefault(require("node-binance-api"));
const math_1 = require("../utils/math");
const logger_1 = require("../logger");
const utils_1 = require("../utils");
const config_1 = __importDefault(require("../blockchain/config"));
const config_2 = __importDefault(require("../../config"));
const config_3 = __importDefault(require("../config"));
const ORDER_TYPE_TO_LABEL = {
    marketBuy: 'BUY',
    marketSell: 'SELL',
};
class BinanceExchange {
    constructor() {
        if (BinanceExchange.Instance) {
            return BinanceExchange.Instance;
        }
        const userConfig = new config_3.default().getUserConfig();
        this.binance = node_binance_api_1.default().options({
            APIKEY: utils_1.safeAccess(userConfig, ['EXCHANGE', 'API_KEY']) || utils_1.safeAccess(userConfig, ['PRICE', 'API_KEY']),
            APISECRET: utils_1.safeAccess(userConfig, ['EXCHANGE', 'SECRET_KEY']) || utils_1.safeAccess(userConfig, ['PRICE', 'SECRET_KEY']),
            useServerTime: true,
        });
        BinanceExchange.Instance = this;
        logger_1.logData(`Binance Exchange Connected!`);
    }
    placeOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exchangeOrder = this.formatOrder(order);
                if (!exchangeOrder) {
                    logger_1.logInfo(`BINANCE_INVALID_PAIR ${order.quote + order.base}`);
                    return;
                }
                const { type, pair, quantity } = exchangeOrder;
                yield this.binance[type](pair, quantity, (err, response) => {
                    if (err) {
                        logger_1.logDebug('BINANCE_ORDER_PLACE_ERROR', err);
                        logger_1.logError(`Could not place order in Binance for ${quantity} ${pair}`);
                    }
                    else {
                        logger_1.logInfo(`BINANCE_ORDER_PLACED ${pair} ${quantity} ${response.orderId}`);
                        logger_1.logData(`You placed ${ORDER_TYPE_TO_LABEL[type]} order in Binance for ${quantity} ${pair} `);
                    }
                });
                return true;
            }
            catch (err) {
                logger_1.logDebug('BINANCE_PLACE_ORDER_ERROR', err);
                return false;
            }
        });
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filteredBalances = {};
                return new Promise((resolve, reject) => {
                    this.binance.balance((error, balances) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            for (const network in config_2.default.NETWORKS) {
                                if (balances[network]) {
                                    const available = utils_1.safeAccess(balances, [network, 'available']) || 0;
                                    const onOrder = utils_1.safeAccess(balances, [network, 'onOrder']) || 0;
                                    filteredBalances[network] = { balance: math_1.add(available, onOrder) };
                                }
                            }
                            resolve(filteredBalances);
                        }
                    });
                });
            }
            catch (err) {
                logger_1.logDebug('BINANCE_GET_BALANCE_ERROR', err);
                return false;
            }
        });
    }
    fixPrecision(quote, quantity) {
        const precision = utils_1.safeAccess(config_2.default, ['BINANCE', 'PRECISION', quote]);
        if (precision) {
            return math_1.toFixed(math_1.divDecimals(quantity, config_1.default()[quote].decimals), precision);
        }
    }
    getPrices(quotes, bases) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prices = {};
                if (!bases) {
                    bases = quotes;
                }
                return new Promise((resolve, reject) => {
                    this.binance.prices((error, ticker) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            for (const q of quotes) {
                                for (const b of bases) {
                                    if (!ticker[b + q] && ticker[q + b]) {
                                        prices[`${b}-${q}`] = math_1.div(1, ticker[q + b]).toString();
                                    }
                                    if (ticker[q + b]) {
                                        prices[`${q}-${b}`] = ticker[q + b];
                                    }
                                }
                            }
                            Object.keys(config_2.default.DUPLICATE_PRICE).forEach((t) => {
                                const d = config_2.default.DUPLICATE_PRICE[t];
                                Object.keys(prices).forEach((p) => {
                                    const duplicate = p.replace(new RegExp('\\b' + d + '\\b'), t);
                                    prices[duplicate] = prices[p];
                                });
                                if (!prices[`${t}-${d}`]) {
                                    prices[`${t}-${d}`] = 1;
                                }
                                if (!prices[`${d}-${t}`]) {
                                    prices[`${d}-${t}`] = 1;
                                }
                            });
                            resolve(prices);
                        }
                    });
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    formatOrder(order) {
        const quote = config_2.default.DUPLICATE_PRICE[order.quote] || order.quote;
        const base = config_2.default.DUPLICATE_PRICE[order.base] || order.base;
        if (config_2.default.BINANCE.PAIRS[quote + base]) {
            return {
                type: 'marketBuy',
                pair: quote + base,
                quantity: order.buy,
            };
        }
        else if (config_2.default.BINANCE.PAIRS[base + quote]) {
            return {
                type: 'marketSell',
                pair: base + quote,
                quantity: order.sell,
            };
        }
    }
}
exports.default = BinanceExchange;
//# sourceMappingURL=binance.js.map