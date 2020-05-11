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
const contracts_1 = require("../contracts");
const utils_1 = require("../utils");
const logger_1 = require("../../logger");
const service_1 = require("../../components/swap/service");
const service_2 = require("../../components/withdraw/service");
const validator_1 = require("../validator");
const email_1 = require("../../email");
const emitter_1 = require("../../emitter");
const math_1 = require("../../utils/math");
const RETRY_COUNT = 10;
const RETRY_TIME = 1000 * 10;
class WithdrawHandler {
    constructor() {
        this.swapService = new service_1.SwapService();
        this.withdrawService = new service_2.WithdrawService();
        this.emailService = new email_1.default();
        this.contracts = contracts_1.default();
    }
    onWithdraw(withdraw, maxTries = RETRY_COUNT) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logInfo('ON_WITHDRAW', withdraw);
            const swap = yield this.swapService.findInputSwapByOutputSwapIdAndOutputNetwork(withdraw.id, withdraw.network);
            if (swap) {
                const contract = this.contracts[swap.network];
                logger_1.logInfo('WITHDRAW_SWAP_FOUND', swap);
                const valid = yield validator_1.validateWithdraw(withdraw);
                if (valid) {
                    const isProcessed = yield this.withdrawService.findByIdAndNetwork(withdraw.id, withdraw.network);
                    if (!isProcessed) {
                        try {
                            const result = yield contract.withdraw(Object.assign(Object.assign({}, swap), { secret: withdraw.secret }));
                            const transactionHash = result.hash || result;
                            yield this.withdrawService.add(withdraw);
                            logger_1.logInfo('WITHDRAW_SENT', Object.assign(Object.assign({}, withdraw), { transactionHash }));
                            yield this.emailService.send('WITHDRAW', Object.assign(Object.assign({}, swap), { transactionHash, secret: withdraw.secret }));
                        }
                        catch (err) {
                            logger_1.logError('WITHDRAW_BROADCAST_ERROR', withdraw.id);
                            logger_1.logError(`WITHDRAW_ERROR: ${err}`);
                            if (maxTries > 0) {
                                logger_1.logInfo('WITHDRAW_RETRY', withdraw.id);
                                yield utils_1.sleep((RETRY_COUNT + 1 - maxTries) * RETRY_TIME);
                                yield this.onWithdraw(withdraw, maxTries - 1);
                            }
                            else {
                                logger_1.logError('WITHDRAW_FAILED', withdraw.id);
                            }
                        }
                    }
                    else {
                        logger_1.logInfo('WITHDRAW_ALREADY_PROCESSED', withdraw.id);
                    }
                }
            }
            else {
                logger_1.logError('WITHDRAW_SWAP_NOT_FOUND', withdraw.id);
            }
        });
    }
    processOldWithdraws() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.logInfo(`TRACK_OLD_WITHDRAWS`);
                const emitter = new emitter_1.default();
                for (const network in this.contracts) {
                    const contract = this.contracts[network];
                    const withdraws = yield contract.getPast('withdraw');
                    const ids = withdraws.map((w) => w.id);
                    try {
                        const statuses = yield contract.getStatus(ids);
                        for (const index in withdraws) {
                            if (math_1.equal(statuses[index], 3)) {
                                const withdraw = withdraws[index];
                                const isProcessed = yield this.withdrawService.findByIdAndNetwork(withdraw.id, withdraw.network);
                                if (!isProcessed) {
                                    emitter.emit('WITHDRAW', withdraw);
                                }
                            }
                        }
                    }
                    catch (err) {
                        logger_1.logError(`TRACK_OLD_WITHDRAWS_PROCESSING_ERROR ${network} ${err}`);
                    }
                }
            }
            catch (err) {
                logger_1.logError(`TRACK_OLD_WITHDRAWS_ERROR ${err}`);
            }
        });
    }
}
exports.default = WithdrawHandler;
//# sourceMappingURL=withdraw.js.map