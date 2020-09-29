"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PK_MATCH_ADDRESS = exports.aeAddressMatch = exports.oneAddressMatch = exports.btcAddressMatch = exports.ethAddressMatch = exports.sleep = exports.compareAddress = void 0;
const utils_1 = require("@jelly-swap/utils");
const adapters_1 = __importDefault(require("./adapters"));
// Ethereum
const ethers_1 = require("ethers");
//Bitcoin
const btc_web_wallet_1 = __importDefault(require("@jelly-swap/btc-web-wallet"));
const btc_provider_1 = __importDefault(require("@jelly-swap/btc-provider"));
// Aeternity
const aepp_sdk_1 = require("@aeternity/aepp-sdk");
const nacl = __importStar(require("tweetnacl"));
// Harmony
const providers_1 = require("@jelly-swap/harmony/dist/src/providers");
const config_1 = require("./erc20/config");
exports.compareAddress = (a1, a2) => {
    return a1.toLowerCase() === a2.toLowerCase();
};
exports.sleep = (msec) => {
    return new Promise((resolve) => setTimeout(resolve, msec));
};
exports.ethAddressMatch = (privateKey, address) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.compareAddress(ethers_1.utils.computeAddress(utils_1.fixHash(privateKey, true)), address);
});
exports.btcAddressMatch = (mnemonic, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wallet = new btc_web_wallet_1.default(mnemonic, new btc_provider_1.default(''));
        const btcAddress = yield wallet.getWalletAddress(address);
        return exports.compareAddress(btcAddress.address, address);
    }
    catch (err) {
        return false;
    }
});
exports.oneAddressMatch = (privateKey, address) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = new providers_1.WalletProvider(undefined, privateKey).addByPrivateKey(privateKey);
    const bech32Address = adapters_1.default()['ONE'].parseAddress(wallet.address);
    return exports.compareAddress(address, bech32Address);
});
exports.aeAddressMatch = (privateKey, address) => __awaiter(void 0, void 0, void 0, function* () {
    const keys = nacl.sign.keyPair.fromSecretKey(Buffer.from(privateKey, 'hex'));
    const publicBuffer = Buffer.from(keys.publicKey);
    return `ak_${aepp_sdk_1.Crypto.encodeBase58Check(publicBuffer)}` === address;
});
const getErc20Matcher = () => {
    return Object.keys(config_1.SECONDARY_NETWORKS).reduce((object, token) => {
        object[token] = exports.ethAddressMatch;
        return object;
    }, {});
};
exports.PK_MATCH_ADDRESS = Object.assign(Object.assign({}, getErc20Matcher()), { ETH: exports.ethAddressMatch, BTC: exports.btcAddressMatch, AE: exports.aeAddressMatch, ONE: exports.oneAddressMatch, MATIC: exports.ethAddressMatch, AVAX: exports.ethAddressMatch });
