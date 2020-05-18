"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const erc20_1 = require("@jelly-swap/erc20");
const config_1 = require("./bitcoin/config");
const config_2 = require("./ethereum/config");
const config_3 = require("./aeternity/config");
const TokenConfig = {
    DAI: {
        network: 'DAI',
        decimals: 18,
        address: '0x2d69ad895797c880abce92437788047ba0eb7ff6',
        MIN_AMOUNT: 20,
        MAX_AMOUNT: 80,
    },
};
const AddressToToken = {
    '0x2d69ad895797c880abce92437788047ba0eb7ff6': TokenConfig.DAI,
};
const Erc20Config = (token) => {
    return Object.assign(Object.assign({}, erc20_1.Config(token, TokenConfig, AddressToToken, 86400)), { providerUrl: 'https://ropsten.infura.io/v3/8fe4fc9626494d238879981936dbf144', contractAddress: '0x66ea49fd943544d59e14d1bd9107217c7503906a', explorer: 'https://ropsten.etherscan.io/tx/', receiverAddress: '0xc555d8bc1B47F53F2b28fd2B3301aD94F7add17C', estimation: 600, timestampUnix: true, PRIVATE_KEY: 'DCBFD4610309E52CF5DCC1B2FB926D17007FE4B889DA8951B03AB89F7E32E0DD', REFUND_PERIOD: 10, VALID_EXPIRATION: 72000 });
};
exports.default = {
    BTC: Object.assign(Object.assign({}, config_1.default), { explorer: 'https://blockstream.info/testnet/tx/', providerUrl: 'https://localhost:8080', apiProviderUrl: 'https://localhost:8080', receiverAddress: 'tb1qc4mwllgvmy0xqsdexpm5v8g74ldmv698whnyrw' }),
    ETH: Object.assign(Object.assign({}, config_2.default), { explorer: 'https://ropsten.etherscan.io/tx/', providerUrl: 'https://ropsten.infura.io/v3/8fe4fc9626494d238879981936dbf144', contractAddress: '0x2c7d163af0ab8d4a592913e1a599c35ebb7051c5', receiverAddress: '0xF684C21Ec023E93da0B402ac0a274317eb51C2c7', PRIVATE_KEY: '1C616F51208B907EA96816901C0A3893A5A0AD2F8A8892CCC3606D42808CBFAC' }),
    AE: Object.assign(Object.assign({}, config_3.default), { explorer: 'https://testnet.explorer.aepps.com/transactions/', providerUrl: 'https://sdk-testnet.aepps.com/', internalUrl: 'https://sdk-testnet.aepps.com/', compilerUrl: 'https://compiler.aepps.com', wsUrl: 'wss://testnet.aeternal.io/websocket', contractAddress: 'ct_2M9XPMwz1GggFRPatEd2aAPZbig32ZqRJBnhTT2yRVM4k6CQnb', receiverAddress: 'ak_2ifr2XxhrMskWdnXZqJE2mVhhwhXYvQD6nRGYLMR5mTSHW4RZz', apiUrl: 'https://testnet.aeternal.io/' }),
    DAI: Erc20Config('DAI'),
    WBTC: Erc20Config('WBTC'),
    USDC: Erc20Config('USDC'),
};
//# sourceMappingURL=config-testnet.js.map