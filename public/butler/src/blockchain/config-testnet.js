"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const erc20_1 = require("@jelly-swap/erc20");
const supportedNetworks_1 = __importDefault(require("../config/supportedNetworks"));
const config_1 = __importDefault(require("./bitcoin/config"));
const config_2 = __importDefault(require("./ethereum/config"));
const config_3 = __importDefault(require("./harmony/config"));
const config_4 = __importDefault(require("./aeternity/config"));
const config_5 = require("./config");
exports.default = () => {
    const supportedNetworks = supportedNetworks_1.default();
    return Object.assign({ BTC: supportedNetworks['BTC'] && Config.BTC(), ETH: supportedNetworks['ETH'] && Config.ETH(), ONE: supportedNetworks['ONE'] && Config.ONE(), AE: supportedNetworks['AE'] && Config.AE() }, getErc20Configs(supportedNetworks));
};
const TokenConfig = {
    DAI: {
        network: 'DAI',
        decimals: 18,
        address: '0x2d69ad895797c880abce92437788047ba0eb7ff6',
    },
};
const AddressToToken = {
    '0x2d69ad895797c880abce92437788047ba0eb7ff6': TokenConfig.DAI,
};
const Config = {
    BTC: () => {
        return Object.assign(Object.assign({}, config_1.default()), { explorer: 'https://blockstream.info/testnet/tx/', providerUrl: 'https://localhost:8080', apiProviderUrl: 'https://localhost:8080' });
    },
    ETH: () => {
        return Object.assign(Object.assign({}, config_2.default()), { explorer: 'https://ropsten.etherscan.io/tx/', providerUrl: 'https://ropsten.infura.io/v3/8fe4fc9626494d238879981936dbf144', contractAddress: '0xcaa21a48048235ce5b77b6b7b2a1c50417826cfc' });
    },
    AE: () => {
        return Object.assign(Object.assign({}, config_4.default()), { explorer: 'https://testnet.explorer.aepps.com/transactions/', providerUrl: 'https://sdk-testnet.aepps.com/', internalUrl: 'https://sdk-testnet.aepps.com/', compilerUrl: 'https://compiler.aepps.com', wsUrl: 'wss://testnet.aeternal.io/websocket', contractAddress: 'ct_2M9XPMwz1GggFRPatEd2aAPZbig32ZqRJBnhTT2yRVM4k6CQnb', receiverAddress: 'ak_2ifr2XxhrMskWdnXZqJE2mVhhwhXYvQD6nRGYLMR5mTSHW4RZz', apiUrl: 'https://testnet.aeternal.io/' });
    },
    DAI: () => Erc20Config('DAI'),
    ONE: () => {
        return Object.assign({}, config_3.default());
    },
};
function getErc20Configs(supportedNetworks) {
    return Object.keys(config_5.SECONDARY_NETWORKS).reduce((object, token) => {
        if (supportedNetworks[token]) {
            object[token] = Erc20Config(token);
        }
        return object;
    }, {});
}
function Erc20Config(token) {
    return Object.assign(Object.assign(Object.assign({}, erc20_1.Config(TokenConfig, AddressToToken, 86400)), TokenConfig[token]), { providerUrl: 'https://ropsten.infura.io/v3/8fe4fc9626494d238879981936dbf144', contractAddress: '0x66ea49fd943544d59e14d1bd9107217c7503906a', explorer: 'https://ropsten.etherscan.io/tx/', estimation: 600, timestampUnix: true, REFUND_PERIOD: 10, VALID_EXPIRATION: 72000 });
}
