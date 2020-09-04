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
const contracts_1 = __importDefault(require("../contracts"));
const adapters_1 = __importDefault(require("../adapters"));
const utils_1 = require("../utils");
const logger_1 = require("../../logger");
const service_1 = require("../../components/swap/service");
const service_2 = require("../../components/withdraw/service");
const validator_1 = require("../validator");
const email_1 = __importDefault(require("../../email"));
const RETRY_COUNT = 10;
const RETRY_TIME = 1000 * 10;
class WithdrawHandler {
    constructor() {
        this.swapService = new service_1.SwapService();
        this.withdrawService = new service_2.WithdrawService();
        this.emailService = new email_1.default();
        this.contracts = contracts_1.default();
        this.adapters = adapters_1.default();
        this.localCache = {};
    }
    onWithdraw(withdraw, maxTries = RETRY_COUNT) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logInfo('ON_WITHDRAW', withdraw);
            const swap = yield this.swapService.findInputSwapByOutputSwapIdAndOutputNetwork(withdraw.id, withdraw.network);
            if (swap) {
                const { network, inputAmount } = swap;
                const contract = this.contracts[network];
                logger_1.logInfo('WITHDRAW_SWAP_FOUND', swap);
                const valid = yield validator_1.validateWithdraw(withdraw);
                if (valid) {
                    const isProcessed = yield this.withdrawService.findByIdAndNetwork(withdraw.id, withdraw.network);
                    if (!isProcessed && !this.localCache[withdraw.id]) {
                        try {
                            this.localCache[withdraw.id] = true;
                            const result = yield contract.withdraw(Object.assign(Object.assign({}, swap), { secret: withdraw.secret }));
                            const transactionHash = result.hash || result;
                            try {
                                yield this.withdrawService.add(withdraw);
                                logger_1.logInfo('WITHDRAW_SENT', Object.assign(Object.assign({}, withdraw), { transactionHash }));
                                logger_1.logData(`You received ${this.adapters[network].parseFromNative(String(inputAmount), network)} ${network}.`);
                                yield this.emailService.send('WITHDRAW', Object.assign(Object.assign({}, swap), { transactionHash, secret: withdraw.secret }));
                            }
                            catch (err) {
                                logger_1.logDebug(`WITHDRAW_SERVICE_ERROR: ${err}`);
                            }
                        }
                        catch (err) {
                            this.localCache[withdraw.id] = false;
                            logger_1.logDebug(`WITHDRAW_ERROR ${err}`, err);
                            logger_1.logDebug('WITHDRAW_BROADCAST_ERROR', withdraw.id);
                            if (maxTries > 0) {
                                logger_1.logInfo('WITHDRAW_RETRY', withdraw.id);
                                yield utils_1.sleep((RETRY_COUNT + 1 - maxTries) * RETRY_TIME);
                                yield this.onWithdraw(withdraw, maxTries - 1);
                            }
                            else {
                                logger_1.logDebug('WITHDRAW_FAILED', withdraw.id);
                            }
                        }
                    }
                    else {
                        logger_1.logDebug('WITHDRAW_ALREADY_PROCESSED', withdraw.id);
                    }
                }
            }
            else {
                logger_1.logDebug('WITHDRAW_SWAP_NOT_FOUND', withdraw.id);
            }
        });
    }
    processOldWithdraws(withdraws) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logData(`Checking for missed withdrawals.`);
            try {
                for (const index in withdraws) {
                    const withdraw = withdraws[index];
                    const isProcessed = yield this.withdrawService.findByIdAndNetwork(withdraw.id, withdraw.network);
                    if (!isProcessed) {
                        yield this.onWithdraw(withdraw);
                    }
                }
            }
            catch (err) {
                logger_1.logDebug(`TRACK_OLD_WITHDRAWS_PROCESSING_ERROR`, { err });
            }
        });
    }
}
exports.default = WithdrawHandler;
