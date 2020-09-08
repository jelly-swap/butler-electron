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
const logger_1 = require("../../logger");
const email_1 = __importDefault(require("../../email"));
class RefundHandler {
    constructor() {
        this.emailService = new email_1.default();
        this.contracts = contracts_1.default();
        this.adapters = adapters_1.default();
        this.localCache = {};
    }
    processRefunds(expiredSwaps) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const swap of expiredSwaps) {
                try {
                    const { inputAmount, network, id } = swap;
                    if (!this.localCache[id]) {
                        const contract = this.contracts[network];
                        const transactionHash = yield (contract === null || contract === void 0 ? void 0 : contract.refund(swap));
                        this.localCache[id] = true;
                        logger_1.logData(`Refund ${this.adapters[network].parseFromNative(String(inputAmount), network)} ${network}`);
                        logger_1.logInfo(`REFUND ${network}: ID: ${id}, TxHash: ${transactionHash}`);
                        if (transactionHash) {
                            yield this.emailService.send('REFUND', Object.assign(Object.assign({}, swap), { transactionHash }));
                        }
                    }
                }
                catch (err) {
                    logger_1.logDebug(`${swap.network}_REFUND_ERROR ${err}`, { err, swap });
                    logger_1.logError(`Cannot refund transaction: ${swap.id}`);
                }
            }
        });
    }
}
exports.default = RefundHandler;
