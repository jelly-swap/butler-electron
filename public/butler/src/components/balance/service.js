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
exports.BalanceService = void 0;
const config_1 = __importDefault(require("../../blockchain/config"));
const contracts_1 = __importDefault(require("../../blockchain/contracts"));
const adapters_1 = __importDefault(require("../../blockchain/adapters"));
const providedAssets_1 = __importDefault(require("../../config/providedAssets"));
const supportedNetworks_1 = __importDefault(require("../../config/supportedNetworks"));
const math_1 = require("../../utils/math");
const service_1 = require("../../components/price/service");
const repository_1 = __importDefault(require("./repository"));
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const config_2 = require("../../blockchain/erc20/config");
class BalanceService {
    constructor() {
        this.priceService = new service_1.PriceService();
        this.balanceRepository = new repository_1.default();
        this.providedBalances = {};
        this.allBalances = {};
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
            const erc20Address = {};
            try {
                for (const network in this.allAssets) {
                    try {
                        const address = this.blockchainConfig[network].receiverAddress;
                        const result = yield this.contracts[network].getBalance(address, network);
                        const raw = result.toString();
                        const balance = this.adapters[network].parseFromNative(result || 0, network).toString();
                        this.allBalances[network] = { address, raw, balance };
                        if (this.providedAssets[network]) {
                            this.providedBalances[network] = this.allBalances[network];
                        }
                        if (config_2.SECONDARY_NETWORKS[network]) {
                            if (!erc20Address[address]) {
                                const ethBalance = yield this.contracts['ETH'].getBalance(address, network);
                                erc20Address[address] = address;
                                if (!math_1.greaterThan(ethBalance, 0)) {
                                    logger_1.logError(`You need ETH in ${address} for the Ethereum network fees in order to  provide ${network}.`);
                                    process.exit(-1);
                                }
                            }
                        }
                    }
                    catch (err) {
                        logger_1.logDebug(`CANNOT_GET_BALANCES ${network} ${err}`);
                        logger_1.logDebug(`CANNOT_GET_BALANCES`, err);
                    }
                }
            }
            catch (err) {
                logger_1.logDebug(`CANNOT_GET_BALANCES`, err);
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
                        const amount = utils_1.safeAccess(this.allBalances, [network, 'balance']) || 0;
                        const pairPrice = this.priceService.getPairPrice(network, 'USDC');
                        const valueInUsdc = math_1.mul(pairPrice, amount);
                        balances.push({ assetName: network, amount, valueInUsdc });
                        portfolioInUsdcTotal = math_1.addBig(portfolioInUsdcTotal, valueInUsdc);
                    }
                    catch (err) {
                        logger_1.logDebug(`BALANCE_HISTORY_PRICE_${network}-USDC`, err);
                    }
                }
                this.balanceRepository.saveBalance(balances);
            }
            catch (err) {
                logger_1.logDebug(`CANNOT_SAVE_BALANCES`, err);
            }
        });
    }
    getBalances() {
        return this.providedBalances;
    }
    getAllBalances() {
        return this.allBalances;
    }
}
exports.BalanceService = BalanceService;
