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
const config_1 = require("../../blockchain/config");
const contracts_1 = require("../../blockchain/contracts");
const adapters_1 = require("../../blockchain/adapters");
const providedAssets_1 = require("../../config/providedAssets");
const exchange_1 = require("../../exchange");
const math_1 = require("../../utils/math");
const service_1 = require("../../components/price/service");
const repository_1 = require("./repository");
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
class BalanceService {
    constructor() {
        this.balances = {};
        this.exchangeBalances = {};
        this.exchange = new exchange_1.default();
        this.priceService = new service_1.PriceService();
        this.balanceRepository = new repository_1.default();
        if (BalanceService.Instance) {
            return BalanceService.Instance;
        }
        this.blockchainConfig = config_1.default();
        this.contracts = contracts_1.default();
        this.adapters = adapters_1.default();
        this.assets = providedAssets_1.default();
        BalanceService.Instance = this;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const network in this.assets) {
                    try {
                        const address = this.blockchainConfig[network].receiverAddress;
                        const result = yield this.contracts[network].getBalance(address, network);
                        const raw = result.toString();
                        const balance = this.adapters[network].parseFromNative(result || 0).toString();
                        this.balances[network] = { address, raw, balance };
                    }
                    catch (err) {
                        logger_1.logError(`Cannot get balances ${network} ${err}`);
                    }
                }
                this.exchangeBalances = yield this.exchange.getBalance();
                return this.balances;
            }
            catch (err) {
                logger_1.logError(`Cannot get balances ${err}`);
                return this.balances;
            }
        });
    }
    saveBalanceHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let portfolioInUsdcTotal = math_1.toBigNumber(0);
                const balances = [];
                for (const network in this.assets) {
                    try {
                        const jellyBalance = utils_1.safeAccess(this.balances, [network, 'balance']) || 0;
                        const exchangeBalance = utils_1.safeAccess(this.exchangeBalances, [network, 'balance']) || 0;
                        const pairPrice = this.priceService.getPairPrice(network, 'USDC');
                        const amount = math_1.add(jellyBalance, exchangeBalance);
                        const valueInUsdc = math_1.mul(pairPrice, amount);
                        balances.push({ assetName: network, amount, valueInUsdc });
                        portfolioInUsdcTotal = math_1.addBig(portfolioInUsdcTotal, valueInUsdc);
                    }
                    catch (err) {
                        logger_1.logInfo(`Balance History Service Warning - price missing ${network}-USDC  ${err}`);
                    }
                }
                balances.push({
                    assetName: 'TOTAL_USDC',
                    amount: portfolioInUsdcTotal.toString(),
                    valueInUsdc: portfolioInUsdcTotal.toString(),
                });
                this.balanceRepository.saveBalance(balances);
            }
            catch (err) {
                logger_1.logError(`Cannot save balance snapshot ${err}`);
            }
        });
    }
    getBalances() {
        return this.balances;
    }
    getExchangeBalances() {
        return this.exchangeBalances;
    }
}
exports.BalanceService = BalanceService;
//# sourceMappingURL=service.js.map