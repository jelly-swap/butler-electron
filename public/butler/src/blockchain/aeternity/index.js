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
const aeternity_1 = require("@jelly-swap/aeternity");
const utils_1 = require("@jelly-swap/utils");
const emitter_1 = require("../../emitter");
const math_1 = require("../../utils/math");
const logger_1 = require("../../logger");
const email_1 = require("../../email");
class AeternityContract extends aeternity_1.Contract {
    constructor(config) {
        super(new aeternity_1.Providers.HTTP(config, config.KEY_PAIR), config);
        this.emailService = new email_1.default();
        this.filter = {
            new: {
                receiver: this.config.receiverAddress,
            },
            withdraw: {
                sender: this.config.receiverAddress,
            },
        };
    }
    subscribe() {
        const _super = Object.create(null, {
            subscribe: { get: () => super.subscribe }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logInfo(`Starting AE Events - ${this.config.contractAddress}`);
            _super.subscribe.call(this, onMessage, this.filter);
        });
    }
    getPast(type, filter = this.filter) {
        const _super = Object.create(null, {
            getPastEvents: { get: () => super.getPastEvents }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPastEvents.call(this, type, filter);
        });
    }
    getStatus(ids) {
        const _super = Object.create(null, {
            getStatus: { get: () => super.getStatus }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const fixedIds = ids.map((i) => utils_1.fixHash(i, false));
            return yield _super.getStatus.call(this, fixedIds);
        });
    }
    userWithdraw(swap, secret) {
        const _super = Object.create(null, {
            getBalance: { get: () => super.getBalance },
            withdraw: { get: () => super.withdraw }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const address = swap.receiver;
            const balance = yield _super.getBalance.call(this, address);
            const isBalanceZero = math_1.greaterThan(balance, 0);
            if (!isBalanceZero) {
                const result = yield _super.withdraw.call(this, Object.assign(Object.assign({}, swap), { secret }));
                return result;
            }
        });
    }
    processRefunds() {
        const _super = Object.create(null, {
            refund: { get: () => super.refund }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const process = () => __awaiter(this, void 0, void 0, function* () {
                logger_1.logInfo('START AE REFUNDS');
                try {
                    let transactionHash;
                    const events = yield this.getPast('new', { new: { sender: this.config.receiverAddress } });
                    for (const event of events) {
                        try {
                            if (event.status === 4) {
                                logger_1.logInfo(`REFUND AE: ${event.id}`);
                                transactionHash = yield _super.refund.call(this, event);
                                transactionHash =
                                    typeof transactionHash == 'object' ? transactionHash.hash : transactionHash;
                                this.emailService.send('REFUND', Object.assign(Object.assign({}, event), { transactionHash }));
                            }
                        }
                        catch (err) {
                            logger_1.logError(`AE_REFUND_ERROR: ${err} ${event}`);
                        }
                    }
                }
                catch (err) {
                    logger_1.logError(`AE_REFUND_ERROR: ${err}`);
                }
            });
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield process();
            }), this.config.REFUND_PERIOD * 1000 * 60);
        });
    }
}
exports.default = AeternityContract;
const onMessage = (result) => {
    new emitter_1.default().emit(result.eventName, Object.assign(Object.assign({}, result), { id: utils_1.fixHash(result.id) }));
};
//# sourceMappingURL=index.js.map