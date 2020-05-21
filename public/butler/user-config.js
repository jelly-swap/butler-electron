"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // ================== BASIC ==================
    NAME: 'NODE_NAME',
    // Traiding pairs
    PAIRS: {
        'ETH-USDC': {
            FEE: 0.01,
        },
        'ETH-DAI': {
            FEE: 0.01,
        },
    },
    // WALLET SETUP
    WALLETS: {
        //ETH provider wallet
        //Should be different than your ERC20 provider wallet
        ETH: {
            ADDRESS: '0xfCd50a1620f21A46Ddf39B526DCA17c59D94e323',
            // Ethereum Private Key
            SECRET: 'F877C159A076F27D989E506F11AB4FADBE6694F9857E43107F049B4D9901A6A0',
        },
        BTC: {
            ADDRESS: 'bc1qg8farg3ysttwqrt2mqpwwrqdw8mfc48ydtzhug',
            // BIP39 mnemonic
            SECRET: 'time eternal kiwi final school betray embark cruel face torch neglect food',
        },
        AE: {
            ADDRESS: 'ak_2DwBMPvRkBHj2vZqjCKhupgqYg5Do9oTUMfhM57bkAoauzxKm',
            // Aeternity Private key
            SECRET: 'b5ad4632e6a6bd8d166132b915f39e15ad4044fe8a4f02ec61cec775470c334aa1108831159d060953f3b7d679fe1173c2731f0dff60b76db8bcf00e2e235ba8',
        },
        //Use one common ETH address for all ERC20 tokens!
        //Should be different than your ETH provider wallet!
        DAI: {
            ADDRESS: '0xfCd50a1620f21A46Ddf39B526DCA17c59D94e322',
            // Ethereum Private Key
            SECRET: 'F877C159A076F27D989E506F11AB4FADBE6694F9857E43107F049B4D9901A6A0',
        },
        USDC: {
            ADDRESS: '0xfCd50a1620f21A46Ddf39B526DCA17c59D94e323',
            // Ethereum Private Key
            SECRET: 'F877C159A076F27D989E506F11AB4FADBE6694F9857E43107F049B4D9901A6A0',
        },
        WBTC: {
            ADDRESS: '0xfCd50a1620f21A46Ddf39B526DCA17c59D94e323',
            // Ethereum Private Key
            SECRET: 'F877C159A076F27D989E506F11AB4FADBE6694F9857E43107F049B4D9901A6A0',
        },
    },
    // PRICE PROVIDER
    PRICE: {
        PROVIDER: 'CryptoCompare',
        API_KEY: '',
        SECRET_KEY: '',
        UPDATE_INTERVAL: 30,
    },
    // REBALANCE
    EXCHANGE: {
        NAME: '',
        API_KEY: '',
        SECRET_KEY: '',
    },
    // NOTIFICATIONS
    NOTIFICATIONS: {
        EMAIL: {
            ENABLED: false,
            SERVICE: 'gmail',
            USERNAME: '',
            PASSWORD: '',
            FROM: '',
            TO: '',
            SUBJECT: 'JELLY',
        },
        SLACK: {
            ENABLED: false,
            WEBHOOK_URL: '',
        },
    },
    // ================== ADVANCED ==================
    AGGREGATOR_URL: 'http://localhost:9005/api/v1/info',
    SERVER: { PORT: 9000 },
    // ================== Database configuration ==================
    //options: mongodb or sqlite
    DATABASE: {
        ACTIVE: 'SQLITE',
        MONGODB: {
            //Docker Setup
            URL: 'mongodb://db:27017/butler',
            AUTH: 'admin',
            MONGO_PASSWORD: process.env.MONGO_PASSWORD,
        },
        SQLITE: {
            database: 'butler.sqlite',
        },
    },
};
//# sourceMappingURL=user-config.js.map