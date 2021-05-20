import { version } from '../../package.json';

export const BUTLER_EVENTS = {
  START: 'start-butler',
  STOP: 'stop-butler',
  STOPPED: 'butler-killed',
  SAVE: 'save-config',
  SAVED: 'config-saved',
  LOAD: 'load-config',
  LOADED: 'config-loaded',
  ALIVE: 'butler-alive',
  DIED: 'butler-died',
};

export const APP_EVENTS = {
  SERVER_DATA: 'SERVER_DATA',
};

export const PAIRS = {
  ETH: {
    BTC: 'BTC',
    ALGO: 'ALGO',
    BNB: 'BNB',
    DAI: 'DAI',
    AE: 'AE',
    MATIC: 'MATIC',
    USDC: 'USDC',
    ONE: 'ONE',
    AVAX: 'AVAX',
    XDC: 'XDC'
  },
  BTC: {
    ETH: 'ETH',
    ALGO: 'ALGO',
    BNB: 'BNB',
    DAI: 'DAI',
    TBTC: 'TBTC',
    AVAX: 'AVAX',
    MATIC: 'MATIC',
    USDC: 'USDC',
    WBTC: 'WBTC',
    ONE: 'ONE',
    AE: 'AE',
    XDC: 'XDC'
  },
  ONE: {
    BTC: 'BTC',
    ETH: 'ETH',
  },
  AVAX: {
    BTC: 'BTC',
    ETH: 'ETH',
    DAI: 'DAI',
  },
  DAI: {
    BTC: 'BTC',
    ALGO: 'ALGO',
    ETH: 'ETH',
    AVAX: 'AVAX',
  },
  AE: {
    BTC: 'BTC',
    ETH: 'ETH',
  },
  MATIC: {
    BTC: 'BTC',
    ETH: 'ETH',
  },
  USDC: {
    BTC: 'BTC',
    ALGO: 'ALGO',
    ETH: 'ETH',
  },
  WBTC: {
    BTC: 'BTC',
    ALGO: 'ALGO',
  },
  TBTC: {
    BTC: 'BTC',
    ALGO: 'ALGO',
  },
  BNB: {
    BTC: 'BTC',
    ETH: 'ETH',
  },
  XDC: {
    BTC: 'BTC',
    ETH: 'ETH',
  },
  ALGO: {
    BTC: 'BTC',
    ETH: 'ETH',
    USDC: 'USDC',
    WBTC: 'WBTC',
    DAI: 'DAI',
    TBTC: 'TBTC',
  },
};

export const ERC20_TOKENS = ['DAI', 'USDC', 'WBTC', 'TBTC'];

export const BUTLER_VERSION = version;

/*eslint no-control-regex: "off"*/
export const REGEX_FOR_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const getQuotes = pairs => {
  return Object.entries(pairs).reduce((object, asset) => {
    object[asset[0]] = Object.values(asset[1]);
    // object[asset] = TOKENS.filter(token => pairs[asset].includes(token));
    return object;
  }, {});
};

export const BASE_ASSETS = Object.keys(PAIRS);
export const QUOTE_ASSETS = getQuotes(PAIRS);

export const CONFIG_VERSION = 1;

export const DEFAULT_CONFIG = {
  NAME: '',
  VERSION: CONFIG_VERSION,
  PAIRS: { 'MATIC-ETH': { FEE: 0, PRICE: 0 } },
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
    SECRET_KEY: '',
    UPDATE_INTERVAL: 30,
  },
  EXCHANGE: {
    NAME: '',
    API_KEY: '',
    SECRET_KEY: '',
  },
  NOTIFICATIONS: {
    EMAIL: {
      ENABLED: false,
      USERNAME: '',
      PASSWORD: '',
      FROM: '',
      TO: '',
      SERVICE: 'gmail',
      SUBJECT: 'JELLY',
    },
  },
  AGGREGATOR_URL: 'https://jelly-jam.herokuapp.com/api/v1/info',
  TRACKER_URL: 'jelly-tracker.herokuapp.com',
  JELLY_PRICE_PROVIDER: '',
  SERVER: { PORT: '9000' },
  DATABASE: { ACTIVE: 'SQLITE', SQLITE: { database: 'butler.sqlite' } },
};

export const STATUS_COLOR = {
  INVALID: '#e7303c',
  COMPLETED: '#66a02c',
  ACTIVE: '#ff6f00',
  EXPIRED: '#e7303c',
  REFUNDED: '#66a02c',
};

export const STATUS = {
  0: 'INVALID', // Uninitialized  swap -> can go to ACTIVE
  1: 'ACTIVE', // Active swap -> can go to WITHDRAWN or EXPIRED
  2: 'REFUNDED', // Swap is refunded -> final state.
  3: 'COMPLETED', // Swap is withdrawn -> final state.
  4: 'EXPIRED', // Swap is expired -> can go to REFUNDED
};
