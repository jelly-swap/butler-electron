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
const utils_1 = require("@jelly-swap/utils");
// Ethereum
const ethers_1 = require("ethers");
//Bitcoin
const btc_web_wallet_1 = require("@jelly-swap/btc-web-wallet");
const btc_provider_1 = require("@jelly-swap/btc-provider");
// Aeternity
const aepp_sdk_1 = require("@aeternity/aepp-sdk");
const nacl = require("tweetnacl");
exports.compareAddress = (a1, a2) => {
    return a1.toLowerCase() === a2.toLowerCase();
};
exports.sleep = (msec) => {
    return new Promise((resolve) => setTimeout(resolve, msec));
};
exports.ethAddressMatch = (privateKey, address) => __awaiter(void 0, void 0, void 0, function* () {
    return ethers_1.utils.computeAddress(utils_1.fixHash(privateKey, true)).toLowerCase() === address.toLowerCase();
});
exports.btcAddressMatch = (mnemonic, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallet = new btc_web_wallet_1.default(mnemonic, new btc_provider_1.default(''));
        const btcAddress = yield wallet.getWalletAddress(address);
        return btcAddress.address.toLowerCase() === address.toLowerCase();
    }
    catch (err) {
        return false;
    }
});
exports.aeAddressMatch = (privateKey, address) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = nacl.sign.keyPair.fromSecretKey(Buffer.from(privateKey, 'hex'));
    const publicBuffer = Buffer.from(keys.publicKey);
    return `ak_${aepp_sdk_1.Crypto.encodeBase58Check(publicBuffer)}` === address;
});
exports.PK_MATCH_ADDRESS = {
    ETH: exports.ethAddressMatch,
    DAI: exports.ethAddressMatch,
    USDC: exports.ethAddressMatch,
    WBTC: exports.ethAddressMatch,
    BTC: exports.btcAddressMatch,
    AE: exports.aeAddressMatch,
};
//# sourceMappingURL=utils.js.map