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
const exchanges_1 = __importDefault(require("./exchanges"));
const logger_1 = require("../logger");
const config_1 = __importDefault(require("../config"));
class Exchange {
    constructor() {
        var _a, _b;
        if (Exchange.Instance) {
            return Exchange.Instance;
        }
        this.userConfig = new config_1.default().getUserConfig();
        if (exchanges_1.default[(_b = (_a = this.userConfig) === null || _a === void 0 ? void 0 : _a.EXCHANGE) === null || _b === void 0 ? void 0 : _b.NAME]) {
            this.exchange = new exchanges_1.default[this.userConfig.EXCHANGE.NAME]();
        }
        else {
            this.exchange = new exchanges_1.default.mock();
        }
        Exchange.Instance = this;
    }
    placeOrder(swap) {
        return __awaiter(this, void 0, void 0, function* () {
            const base = swap.network;
            const quote = swap.outputNetwork;
            const buy = this.fixPrecision(quote, swap.outputAmount);
            const sell = this.fixPrecision(base, swap.inputAmount);
            try {
                const result = yield this.exchange.placeOrder({ quote, base, buy, sell });
                return result;
            }
            catch (err) {
                logger_1.logError(`Could not place order in ${this.userConfig.EXCHANGE.NAME}.`);
                logger_1.logError('PLACE_ORDER_ERROR', err);
                return false;
            }
        });
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.exchange.getBalance();
        });
    }
    fixPrecision(quote, quantity) {
        return this.exchange.fixPrecision(quote, quantity);
    }
}
exports.default = Exchange;
//# sourceMappingURL=index.js.map