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
const ethereum_1 = require("@jelly-swap/ethereum");
const providers_1 = require("@jelly-swap/ethereum/dist/providers");
const emitter_1 = require("../../emitter");
const math_1 = require("../../utils/math");
const logger_1 = require("../../logger");
const email_1 = require("../../email");
class EthereumContract extends ethereum_1.Contract {
    constructor(config) {
        const _wallet = new providers_1.WalletProvider(config.PRIVATE_KEY, config.providerUrl);
        super(_wallet, config);
        this.wallet = _wallet;
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
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.wallet.signMessage(message);
        });
    }
    subscribe() {
        const _super = Object.create(null, {
            subscribe: { get: () => super.subscribe }
        });
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.logInfo(`Starting ETH Events - ${this.config.contractAddress}`);
            _super.subscribe.call(this, onMessage, this.filter);
        });
    }
    getPast(type, filter = this.filter) {
        const _super = Object.create(null, {
            getPastEvents: { get: () => super.getPastEvents }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.getPastEvents.call(this, type, filter);
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
                logger_1.logInfo('START ETH REFUNDS');
                try {
                    let transactionHash;
                    const swaps = yield this.getPast('new', { new: { sender: this.config.receiverAddress } });
                    for (const event of swaps) {
                        try {
                            if (event.status === 4) {
                                logger_1.logInfo(`REFUND ETH: ${event.id}`);
                                transactionHash = yield _super.refund.call(this, event);
                                this.emailService.send('REFUND', Object.assign(Object.assign({}, event), { transactionHash }));
                            }
                        }
                        catch (err) {
                            logger_1.logError(`ETH_REFUND_ERROR`, { err, event });
                        }
                    }
                }
                catch (err) {
                    logger_1.logError(`ETH_REFUND_ERROR`, err);
                }
            });
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield process();
            }), this.config.REFUND_PERIOD * 1000 * 60);
        });
    }
}
exports.default = EthereumContract;
const onMessage = (result) => {
    new emitter_1.default().emit(result.eventName, result);
};
//# sourceMappingURL=index.js.map