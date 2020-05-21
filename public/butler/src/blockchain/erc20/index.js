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
const erc20_1 = require("@jelly-swap/erc20");
const emitter_1 = require("../../emitter");
const email_1 = require("../../email");
const math_1 = require("../../utils/math");
const logger_1 = require("../../logger");
const config_1 = require("../config");
const config_2 = require("../../config");
class Erc20Contract extends erc20_1.Contract {
    constructor(config) {
        super(new erc20_1.Providers.WalletProvider(config.PRIVATE_KEY, config.providerUrl), config);
        this.emailService = new email_1.default();
        this.receivers = new config_2.default().getReceivers(Object.keys(config_1.SECONDARY_NETWORKS));
        this.filter = {
            new: {
                receiver: this.receivers,
            },
            withdraw: {
                sender: this.receivers,
            },
        };
    }
    subscribe() {
        logger_1.logInfo(`Starting ERC20 Events - ${this.config.contractAddress}`);
        super.subscribe(onMessage, this.filter);
    }
    getPast(type, filter = this.filter) {
        const _super = Object.create(null, {
            getPastEvents: { get: () => super.getPastEvents }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPastEvents.call(this, type, filter);
        });
    }
    withdraw(withdraw) {
        const _super = Object.create(null, {
            withdraw: { get: () => super.withdraw }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!withdraw.tokenAddress) {
                withdraw.tokenAddress = this.config.TokenToAddress(withdraw.network);
            }
            return yield _super.withdraw.call(this, withdraw);
        });
    }
    userWithdraw(swap, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = swap.receiver;
            const balance = yield this.provider.getBalance(address);
            const isBalanceZero = math_1.greaterThan(balance, 0);
            if (!isBalanceZero) {
                const result = yield this.withdraw(Object.assign(Object.assign({}, swap), { secret }));
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
                logger_1.logInfo('START ERC20 REFUNDS');
                try {
                    let transactionHash;
                    const events = yield this.getPast('new', { new: { sender: this.receivers } });
                    for (const event of events) {
                        try {
                            if (event.status === 4) {
                                logger_1.logInfo(`REFUND ERC20: ${event.id}`);
                                transactionHash = yield _super.refund.call(this, event);
                                this.emailService.send('REFUND', Object.assign(Object.assign({}, event), { transactionHash }));
                            }
                        }
                        catch (err) {
                            logger_1.logError(`ERC20_REFUND_ERROR: ${err} ${event}`);
                        }
                    }
                }
                catch (err) {
                    logger_1.logError(`ERC20_REFUND_ERROR: ${err}`);
                }
            });
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield process();
            }), this.config.REFUND_PERIOD * 1000 * 60);
        });
    }
}
exports.default = Erc20Contract;
const onMessage = (result) => {
    new emitter_1.default().emit(result.eventName, result);
};
//# sourceMappingURL=index.js.map