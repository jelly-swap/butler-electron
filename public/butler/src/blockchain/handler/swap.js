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
const adapters_1 = require("../adapters");
const contracts_1 = require("../contracts");
const validator_1 = require("../validator");
const utils_1 = require("../utils");
const logger_1 = require("../../logger");
const service_1 = require("../../components/swap/service");
const email_1 = require("../../email");
const exchange_1 = require("../../exchange");
const emitter_1 = require("../../emitter");
const math_1 = require("../../utils/math");
const RETRY_COUNT = 10;
const RETRY_TIME = 1000 * 10;
class SwapHandler {
    constructor() {
        this.swapService = new service_1.SwapService();
        this.emailService = new email_1.default();
        this.exchange = new exchange_1.default();
        this.contracts = contracts_1.default();
        this.adapters = adapters_1.default();
    }
    onSwap(inputSwap, maxTries = RETRY_COUNT) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logInfo(`SWAP_RECEIVED`, inputSwap);
            const isProcessed = yield this.swapService.findByIdAndNetwork(inputSwap.id, inputSwap.network);
            if (!isProcessed) {
                const adapter = this.adapters[inputSwap.outputNetwork];
                const contract = this.contracts[inputSwap.outputNetwork];
                const outputSwap = adapter.createSwapFromInput(inputSwap);
                const validOutputSwap = yield validator_1.isOutputSwapValid(outputSwap);
                const validInputSwap = validator_1.isInputSwapExpirationValid(inputSwap);
                if (validOutputSwap && validInputSwap) {
                    try {
                        logger_1.logInfo('SWAP_OUTPUT', outputSwap);
                        const result = yield contract.newContract(outputSwap);
                        const transactionHash = result.hash || result;
                        yield this.swapService.add(outputSwap.id, inputSwap);
                        yield this.swapService.add(inputSwap.id, Object.assign(Object.assign({}, outputSwap), { transactionHash }));
                        this.exchange.placeOrder(inputSwap);
                        logger_1.logInfo('SWAP_SENT', transactionHash);
                        yield this.emailService.send('SWAP', Object.assign(Object.assign({}, outputSwap), { transactionHash }));
                    }
                    catch (err) {
                        logger_1.logError('SWAP_BROADCAST_ERROR', inputSwap.id);
                        logger_1.logError(`SWAP_ERROR: ${err}`);
                        if (maxTries > 0) {
                            logger_1.logInfo('SWAP_RETRY', inputSwap.id);
                            yield utils_1.sleep((RETRY_COUNT + 1 - maxTries) * RETRY_TIME);
                            yield this.onSwap(inputSwap, maxTries - 1);
                        }
                        else {
                            logger_1.logError('SWAP_FAILED', inputSwap.id);
                        }
                    }
                }
            }
            else {
                logger_1.logInfo('SWAP_ALREADY_PROCESSED', inputSwap.id);
            }
        });
    }
    processOldSwaps() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logInfo(`TRACK_OLD_SWAPS`);
            const emitter = new emitter_1.default();
            for (const network in this.contracts) {
                try {
                    const swaps = yield this.contracts[network].getPast('new');
                    if (swaps) {
                        for (const swap of swaps) {
                            // if swap is Active
                            if (math_1.equal(swap.status, 1)) {
                                emitter.emit('NEW_CONTRACT', swap);
                            }
                        }
                    }
                }
                catch (err) {
                    logger_1.logError(`TRACK_OLD_SWAPS_ERROR ${network} ${err}`);
                }
            }
        });
    }
}
exports.default = SwapHandler;
//# sourceMappingURL=swap.js.map