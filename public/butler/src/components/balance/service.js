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
const supportedNetworks_1 = require("../../config/supportedNetworks");
const exchange_1 = require("../../exchange");
const math_1 = require("../../utils/math");
const service_1 = require("../../components/price/service");
const repository_1 = require("./repository");
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
class BalanceService {
    constructor() {
        this.exchange = new exchange_1.default();
        this.priceService = new service_1.PriceService();
        this.balanceRepository = new repository_1.default();
        this.providedBalances = {};
        this.allBalances = {};
        this.exchangeBalances = {};
        if (BalanceService.Instance) {
            return BalanceService.Instance;
        }
        this.blockchainConfig = config_1.default();
        this.contracts = contracts_1.default();
        this.adapters = adapters_1.default();
        this.providedAssets = providedAssets_1.default();
        this.allAssets = supportedNetworks_1.default();
        BalanceService.Instance = this;
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const network in this.allAssets) {
                    try {
                        const address = this.blockchainConfig[network].receiverAddress;
                        const result = yield this.contracts[network].getBalance(address, network);
                        const raw = result.toString();
                        const balance = this.adapters[network].parseFromNative(result || 0).toString();
                        this.allBalances[network] = { address, raw, balance };
                        if (this.providedAssets[network]) {
                            this.providedBalances[network] = this.allBalances[network];
                        }
                    }
                    catch (err) {
                        logger_1.logError(`Cannot get balances ${network} ${err}`);
                    }
                }
                this.exchangeBalances = yield this.exchange.getBalance();
            }
            catch (err) {
                logger_1.logError(`Cannot get balances ${err}`);
            }
        });
    }
    saveBalanceHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let portfolioInUsdcTotal = math_1.toBigNumber(0);
                const balances = [];
                for (const network in this.allAssets) {
                    try {
                        const jellyBalance = utils_1.safeAccess(this.allBalances, [network, 'balance']) || 0;
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
        return this.providedBalances;
    }
    getAllBalances() {
        return this.allBalances;
    }
    getExchangeBalances() {
        return this.exchangeBalances;
    }
}
exports.BalanceService = BalanceService;
//# sourceMappingURL=service.js.map