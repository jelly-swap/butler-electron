"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const erc20_1 = require("@jelly-swap/erc20");
const config_1 = __importDefault(require("../../config"));
const utils_1 = require("../../utils");
const TokenConfig = {
    DAI: {
        network: 'DAI',
        decimals: 18,
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    WBTC: {
        network: 'WBTC',
        decimals: 8,
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    },
    USDC: {
        network: 'USDC',
        decimals: 6,
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    'BTC++': {
        network: 'BTC++',
        decimals: 18,
        address: '0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd',
    },
};
const AddressToToken = {
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': TokenConfig.WBTC,
    '0x6b175474e89094c44da98b954eedeac495271d0f': TokenConfig.DAI,
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': TokenConfig.USDC,
    '0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd': TokenConfig['BTC++'],
};
exports.default = (token) => {
    var _a;
    const userConfig = new config_1.default().getUserConfig();
    const address = utils_1.safeAccess(userConfig, ['WALLETS', token, 'ADDRESS']);
    const secret = utils_1.safeAccess(userConfig, ['WALLETS', token, 'SECRET']);
    const config = Object.assign(Object.assign(Object.assign({}, erc20_1.Config(TokenConfig, AddressToToken, 7200)), TokenConfig[token]), { providerUrl: ((_a = userConfig.BLOCKCHAIN_PROVIDER) === null || _a === void 0 ? void 0 : _a.INFURA) || 'https://mainnet.infura.io/v3/02cf6338c88b42f595f8fd946134fa4b', contractAddress: '0x133DbFdf74f565838A2f9413Fb53761a19f06ADF', explorer: 'https://etherscan.io/tx/', REFUND_PERIOD: 10, VALID_EXPIRATION: 72000, gasMultiplier: 1 });
    if (address && secret) {
        return Object.assign(Object.assign({}, config), { receiverAddress: address, PRIVATE_KEY: secret });
    }
    else {
        throw new Error(`${token} ADDRESS and SECRET are missing.`);
    }
};
//# sourceMappingURL=config.js.map