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
    'BTC++': 'BTC++',
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
  'BTC++': {
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
  'BTC++': 'BTC++',
};

export const ERC20_TOKENS = {
  DAI: 'DAI',
  USDC: 'USDC',
  WBTC: 'WBTC',
  'BTC++': 'BTC++',
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
  'BTC++': 'INFURA',
};

export const PORT_ACTION_TYPES = {
  UPDATE_PORT: 'UPDATE_PORT',
};

/*eslint no-control-regex: "off"*/
export const REGEX_FOR_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const MIN_WORDS_FOR_VALID_SEED = 12;
export const MAX_WORDS_FOR_VALID_SEED = 24;

export const DEFAULT_CONFIG = {
  NAME: '',
  PAIRS: { 'BTC-ETH': { FEE: 0, PRICE: 0 } },
  WALLETS: {
    ETH: {
      ADDRESS: '',
      SECRET: '',
    },
    BTC: {
      ADDRESS: '',
      SECRET: '',
    },
  },
  BLOCKCHAIN_PROVIDER: { INFURA: '' },
  PRICE: {
    PROVIDER: 'CryptoCompare',
    API_KEY: '',
    UPDATE_INTERVAL: 30,
  },
  NOTIFICATIONS: {},
  AGGREGATOR_URL: 'https://network.jelly.market/api/v1/info',
  SERVER: { PORT: '9000' },
  DATABASE: { ACTIVE: 'SQLITE', SQLITE: { database: 'butler.sqlite' } },
};
