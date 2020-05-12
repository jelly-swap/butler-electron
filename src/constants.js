export const PAIRS = {
  ETH: {
    BTC: 'BTC',
    DAI: 'DAI',
    AE: 'AE',
    USDC: 'USDC',
  },
  BTC: {
    ETH: 'ETH',
    DAI: 'DAI',
    AE: 'AE',
    USDC: 'USDC',
  },
  DAI: {
    BTC: 'BTC',
    ETH: 'ETH',
  },
  AE: {
    BTC: 'BTC',
    ETH: 'ETH',
  },
  USDC: {
    BTC: 'BTC',
    ETH: 'ETH',
  },
};

export const ASSETS_TO_NETWORK = {
  ETH: 'ETH',
  DAI: 'ETH',
  USDC: 'ETH',
  WBTC: 'ETH',
  AE: 'AE',
  BTC: 'BTC',
};

export const DATABASES = ['mongodb', 'sqlite'];

export const UI_DB_NAMES = {
  mongodb: 'MONGO DB',
  sqlite: 'SQLITE',
};

export const PRICE_PROVIERS = ['CryptoCompare', 'Binance'];

export const LABELS = {
  NAME: 'Name',
  EMAIL: 'Email',
  SLACK: 'Slack',
  BLOCKCHAIN: 'Wallet setup',
  EXCHANGE: 'Exchange',
  AGGREGATOR_URL: 'Aggregator url',
  DATABASES: 'Databases',
  SERVER_PORT: 'Server port',
  PRICE_PROVIDER: 'Price provider',
  CRYPTO_COMPARE: 'Crypto Compare',
  BINANCE: 'Binance',
};
