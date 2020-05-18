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
const bitcoin_1 = require("@jelly-swap/bitcoin");
const btc_web_wallet_1 = require("@jelly-swap/btc-web-wallet");
const btc_provider_1 = require("@jelly-swap/btc-provider");
const emitter_1 = require("../../emitter");
const logger_1 = require("../../logger");
const email_1 = require("../../email");
class BitcoinContract extends bitcoin_1.Contract {
    constructor(config) {
        const provider = new btc_provider_1.BitcoinProvider(config.providerUrl);
        const wallet = new btc_web_wallet_1.Wallet(config.SEED, provider, config.NETWORK, 'bech32');
        super(wallet, config);
        this.emailService = new email_1.default();
    }
    newContract(outputSwap) {
        const _super = Object.create(null, {
            newContract: { get: () => super.newContract }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const txHash = yield _super.newContract.call(this, outputSwap);
            if (txHash == 'Swap failed.') {
                throw new Error('Transaction cannot be broadcasted');
            }
            return txHash;
        });
    }
    subscribe() {
        logger_1.logInfo(`Starting BTC Events`);
        super.subscribe(onMessage, {
            new: {
                type: 'getSwapsByReceiverAndBlock',
                address: this.config.receiverAddress,
            },
            withdraw: {
                type: 'getWithdrawBySenderAndBlock',
                address: this.config.receiverAddress,
            },
        });
    }
    getPast(type, __user, receiver = this.config.receiverAddress) {
        const _super = Object.create(null, {
            getPastEvents: { get: () => super.getPastEvents }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPastEvents.call(this, type, {
                new: {
                    type: 'getSwapsByReceiver',
                    address: receiver,
                },
                withdraw: {
                    type: 'getWithdrawBySender',
                    address: receiver,
                },
            });
        });
    }
    processRefunds() {
        const _super = Object.create(null, {
            getPastEvents: { get: () => super.getPastEvents },
            refund: { get: () => super.refund }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const process = () => __awaiter(this, void 0, void 0, function* () {
                logger_1.logInfo('START BTC REFUNDS');
                const blockNumber = yield this.getCurrentBlock();
                let transactionHash;
                try {
                    const events = yield _super.getPastEvents.call(this, 'new', {
                        new: {
                            type: 'getExpiredSwaps',
                            address: this.config.receiverAddress,
                            startBlock: Number(blockNumber) - this.config.REFUND_BLOCKS,
                            endBlock: blockNumber,
                        },
                    });
                    if (events) {
                        for (const event of events) {
                            try {
                                if (event.status === 4) {
                                    logger_1.logInfo(`REFUND BTC: ${event.id}`);
                                    transactionHash = yield _super.refund.call(this, event);
                                    if (transactionHash == 'Swap failed.') {
                                        logger_1.logInfo(`Refund cannot be executed still!`);
                                    }
                                    else {
                                        this.emailService.send('REFUND', Object.assign(Object.assign({}, event), { transactionHash }));
                                    }
                                }
                            }
                            catch (err) {
                                logger_1.logError(`BTC_REFUND_ERROR: ${err} ${event}`);
                            }
                        }
                    }
                }
                catch (err) {
                    logger_1.logError(`BTC_REFUND_ERROR: ${err}`);
                }
            });
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield process();
            }), this.config.REFUND_PERIOD * 1000 * 60);
        });
    }
    userWithdraw(__swap, __secret) {
        return __awaiter(this, void 0, void 0, function* () {
            // Can't do withdraw on user's behalf.
        });
    }
    isValidForRefund() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
exports.default = BitcoinContract;
const onMessage = (result) => {
    new emitter_1.default().emit(result.eventName, result);
};
//# sourceMappingURL=index.js.map