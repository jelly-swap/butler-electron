"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    NETWORKS: {
        ETH: true,
        BTC: true,
        AE: true,
        DAI: true,
        USDC: true,
        WBTC: true,
    },
    // The amount of fee that is charged by JellySwap protocol.
    // Currently the usage of JellySwap protocol is free
    FEE: 0.0,
    // Choose wheter you will cover the fees for the user on their first withdraw or not.
    // If a user wants to swap BTC for ETH, but his ETH wallet is empty, he won't be able to make the withdraw.
    // By enabling this option, you will perform the withraw for the user, only if his address has 0 ETH balance
    COVER_FEES: false,
    // ================== Balance Snapshot ==================
    // Saves you current balance on every x seconds.
    // You can track your portfolio P&L with this option
    BALANCE_SNAPSHOT_INTERVAL: 3600,
    PRICE: {
        COINS: ['ETH', 'BTC', 'AE', 'DAI', 'WBTC', 'USDC', 'USDT'],
        UPDATE_INTERVAL: 30,
    },
    // ================== Binance configuration ==================
    BINANCE: {
        PAIRS: {
            ETHBTC: true,
            BTCUSDT: true,
            AEETH: true,
            AEBTC: true,
            ETHUSDC: true,
            BTCUSDC: true,
        },
        PRECISION: {
            ETH: 3,
            BTC: 4,
            USDT: 4,
            AE: 1,
            USDC: 4,
        },
        DUPLICATE_PRICE: { DAI: 'USDC', WBTC: 'BTC' },
    },
};
//# sourceMappingURL=config.js.map