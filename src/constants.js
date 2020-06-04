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
    WBTC: 'WBTC',
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
  WBTC: {
    BTC: 'BTC',
  },
};

export const WALLETS = {
  ETH: 'ETH',
  DAI: 'DAI',
  USDC: 'USDC',
  WBTC: 'WBTC',
  BTC: 'BTC',
  AE: 'AE',
};

export const ERC20_TOKENS = {
  DAI: 'DAI',
  USDC: 'USDC',
  WBTC: 'WBTC',
};

export const PRICE_PROVIDER_INTERVALS = {
  10: '0:10',
  15: '0:15',
  30: '0:30',
  60: '1:00',
  90: '1:30',
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

export const BLOCKCHAIN_PROVIDERS = {
  ETH: 'INFURA',
  DAI: 'INFURA',
  WBTC: 'INFURA',
  USDC: 'INFURA',
};

export const PORT_ACTION_TYPES = {
  UPDATE_PORT: 'UPDATE_PORT',
};

/*eslint no-control-regex: "off"*/
export const REGEX_FOR_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const WORDS_IN_SEED_PHRASE = 12;
