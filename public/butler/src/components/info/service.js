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
const axios_1 = require("axios");
const moment = require("moment");
const service_1 = require("../balance/service");
const service_2 = require("../price/service");
const logger_1 = require("../../logger");
const config_1 = require("../../config");
class InfoService {
    constructor() {
        this.pairs = {};
        this.prices = {};
        this.balances = {};
        if (InfoService.instance) {
            return InfoService.instance;
        }
        this.userConfig = new config_1.default().getUserConfig();
        this.name = this.userConfig.NAME;
        this.pairs = this.userConfig.PAIRS;
        this.balanceService = new service_1.BalanceService();
        this.priceService = new service_2.PriceService();
        InfoService.instance = this;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this.prices = this.priceService.getPricesWithSpreadAndFee();
            this.balances = this.balanceService.getBalances();
            this.updated = moment().valueOf();
        });
    }
    iAmAlive() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = this.getInfo();
                const result = yield axios_1.default.post(this.userConfig.AGGREGATOR_URL, info);
                const { valid, message } = (_a = result) === null || _a === void 0 ? void 0 : _a.data;
                if (!valid) {
                    logger_1.logError(`CANNOT_CONNECT_TO_NETWORK: ${message}`);
                }
            }
            catch (err) {
                logger_1.logError(`I_AM_ALIVE_ERROR: ${err}`);
            }
        });
    }
    getInfo() {
        return {
            name: this.name,
            pairs: this.pairs,
            prices: this.prices,
            balances: this.balances,
            updated: this.updated,
        };
    }
}
exports.default = InfoService;
//# sourceMappingURL=service.js.map