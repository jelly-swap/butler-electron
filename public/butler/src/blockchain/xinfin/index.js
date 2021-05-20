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
const avalanche_1 = require("@jelly-swap/avalanche");
const providers_1 = require("@jelly-swap/avalanche/dist/src/providers");
const math_1 = require("../../utils/math");
const DEFAULT_OPTIONS = { gasPrice: '0x6D6E2EDC00', gasLimit: 350000 };
class XinfinContract extends avalanche_1.Contract {
    constructor(config) {
        const _wallet = new providers_1.WalletProvider(config.PRIVATE_KEY, config);
        super(_wallet, config);
        this.wallet = _wallet;
    }
    newContract(swap) {
        const _super = Object.create(null, {
            newContract: { get: () => super.newContract }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.newContract.call(this, swap, DEFAULT_OPTIONS);
        });
    }
    withdraw(withdraw) {
        const _super = Object.create(null, {
            withdraw: { get: () => super.withdraw }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.withdraw.call(this, withdraw, DEFAULT_OPTIONS);
        });
    }
    refund(refund) {
        const _super = Object.create(null, {
            refund: { get: () => super.refund }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.refund.call(this, refund, DEFAULT_OPTIONS);
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.wallet.signMessage(message);
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
                const result = yield _super.withdraw.call(this, Object.assign(Object.assign({}, swap), { secret }), DEFAULT_OPTIONS);
                return result;
            }
        });
    }
}
exports.default = XinfinContract;
