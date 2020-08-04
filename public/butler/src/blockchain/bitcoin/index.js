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
class BitcoinContract extends bitcoin_1.Contract {
    constructor(config) {
        const provider = new btc_provider_1.BitcoinProvider(config.providerUrl);
        const wallet = new btc_web_wallet_1.Wallet(config.SEED, provider, config.NETWORK, 'bech32');
        super(wallet, config);
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
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.wallet.signMessage(message, this.config.receiverAddress);
        });
    }
    userWithdraw(__swap, __secret) {
        return __awaiter(this, void 0, void 0, function* () {
            // Can't do withdraw on user's behalf.
        });
    }
}
exports.default = BitcoinContract;
//# sourceMappingURL=index.js.map