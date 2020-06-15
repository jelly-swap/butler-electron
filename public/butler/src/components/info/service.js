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
const contracts_1 = require("../../blockchain/contracts");
const service_1 = require("../balance/service");
const service_2 = require("../price/service");
const logger_1 = require("../../logger");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
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
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.update();
                const info = this.getInfo();
                const result = yield axios_1.default.post(`${this.userConfig.AGGREGATOR_URL}/register`, info);
                const { valid, message } = result === null || result === void 0 ? void 0 : result.data;
                if (!valid) {
                    logger_1.logError(`CANNOT_CONNECT_TO_NETWORK`, message);
                }
            }
            catch (err) {
                logger_1.logError(`REGISTER_ERROR`, err);
            }
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            this.prices = this.priceService.getPricesWithSpreadAndFee();
            this.balances = this.balanceService.getBalances();
            this.updated = moment().valueOf();
            yield this.getSignatures();
        });
    }
    getSignatures() {
        return __awaiter(this, void 0, void 0, function* () {
            const contracts = contracts_1.default();
            for (const network of Object.keys(this.balances)) {
                const message = `${this.name} is LP for ${network} at Jelly v0.1 at ${this.updated}`;
                const signMessageFunction = utils_1.safeAccess(contracts, [network, 'signMessage']);
                if (signMessageFunction) {
                    try {
                        const sig = yield contracts[network].signMessage(message);
                        this.balances[network]['signature'] = sig;
                    }
                    catch (err) {
                        logger_1.logError('Cannot sign message', err);
                    }
                }
            }
        });
    }
    iAmAlive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = this.getInfo();
                const result = yield axios_1.default.post(`${this.userConfig.AGGREGATOR_URL}/update`, info);
                const { valid, message } = result === null || result === void 0 ? void 0 : result.data;
                if (!valid) {
                    logger_1.logError(`CANNOT_CONNECT_TO_NETWORK`, message);
                    if (message === 'NOT_REGISTERED') {
                        yield this.register();
                    }
                }
            }
            catch (err) {
                logger_1.logError(`I_AM_ALIVE_ERROR`, err);
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