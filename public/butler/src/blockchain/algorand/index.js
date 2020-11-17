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
const algorand_1 = require("@jelly-swap/algorand");
const algo_provider_1 = __importDefault(require("@jelly-swap/algo-provider"));
class BitcoinContract extends algorand_1.Contract {
    constructor(config) {
        const wallet = new algorand_1.Providers.MnemonicWallet(config.SEED, new algo_provider_1.default(config.providerUrl));
        super(wallet, config);
    }
    newContract(outputSwap) {
        const _super = Object.create(null, {
            newContract: { get: () => super.newContract }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const txHash = yield _super.newContract.call(this, outputSwap);
            if (txHash == 'FAILED') {
                throw new Error('Transaction cannot be broadcasted');
            }
            return txHash;
        });
    }
    refund(refund) {
        const _super = Object.create(null, {
            refund: { get: () => super.refund }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const txHash = yield _super.refund.call(this, refund);
            if (txHash === 'FAILED') {
                throw new Error('ALGO_REFUND_INVALID');
            }
            return txHash;
        });
    }
    withdraw(withdraw) {
        const _super = Object.create(null, {
            withdraw: { get: () => super.withdraw }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const txHash = yield _super.withdraw.call(this, withdraw);
            if (txHash === 'FAILED') {
                throw new Error('ALGO_WITHDRAW_INVALID');
            }
            return txHash;
        });
    }
    // TODO: Implement message signing.
    // async signMessage(message: string) {
    // return await this.wallet.signMessage(message);
    // }
    userWithdraw(__swap, __secret) {
        return __awaiter(this, void 0, void 0, function* () {
            // Can't do withdraw on user's behalf.
        });
    }
}
exports.default = BitcoinContract;
