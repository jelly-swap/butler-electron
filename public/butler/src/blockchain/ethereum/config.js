"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_1 = require("@jelly-swap/ethereum");
const config_1 = __importDefault(require("../../config"));
const supportedNetworks_1 = __importDefault(require("../../config/supportedNetworks"));
const utils_1 = require("../../utils");
exports.default = () => {
    var _a;
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', 'ETH', 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', 'ETH', 'SECRET']);
    const config = Object.assign(Object.assign({}, ethereum_1.Config(7200)), { providerUrl: ((_a = userConfig.BLOCKCHAIN_PROVIDER) === null || _a === void 0 ? void 0 : _a.INFURA) || 'https://mainnet.infura.io/v3/ee13a282868d4e7cb7d9a9543958631d', contractAddress: '0x471B080EffB2bc6fb33c8c6FE6ce1AB46F9f522b', explorer: 'https://etherscan.io/tx/', REFUND_PERIOD: 10, VALID_EXPIRATION: 72000, gasMultiplier: 1 });
    if (!(address && secret)) {
        if (supportedNetworks_1.default()['ETH']) {
            throw new Error(`Ethereum ADDRESS and SECRET are missing.`);
        }
        return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
    }
    return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
};
