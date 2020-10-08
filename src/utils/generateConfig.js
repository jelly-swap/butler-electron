import { encrypt } from './crypto';

export const generateConfig = (config, password, encrypted = true) => {
  return {
    NAME: config.NAME,
    VERSION: config.VERSION,
    PAIRS: getPairs(config.PAIRS),
    WALLETS: getWallets(config.WALLETS, password, encrypted),
    ...(config.BLOCKCHAIN_PROVIDER &&
      Object.keys(config.BLOCKCHAIN_PROVIDER).length && {
        BLOCKCHAIN_PROVIDER: getBlockchainProvider(config.BLOCKCHAIN_PROVIDER),
      }),
    PRICE: getPrice(config.PRICE_PROVIDER),
    EXCHANGE: getExchange(config.EXCHANGE, password, encrypted),
    NOTIFICATIONS: getNotifications(config.NOTIFICATIONS, password, encrypted),
    AGGREGATOR_URL: getAggregatorUrl(config.SERVER_OPTIONS),
    TRACKER_URL: getTrackerUrl(config.SERVER_OPTIONS),
    JELLY_PRICE_PROVIDER: getJellyPriceProvider(config.SERVER_OPTIONS),
    SERVER: getServerPort(config.SERVER_OPTIONS),
    DATABASE: getDatabase(config.DATABASE),
  };
};

const getPairs = selectedPairs => {
  if (!selectedPairs || !Object.keys(selectedPairs).length) return;

  const pairs = {};

  Object.keys(selectedPairs).forEach(pair => {
    const { provide, receive, fee, price } = selectedPairs[pair];
    pairs[receive + '-' + provide] = { FEE: fee / 100, PRICE: Number(price) };
  });

  return { ...pairs };
};

const getWallets = (selectedWallets, password, encrypted = true) => {
  if (!selectedWallets || !Object.keys(selectedWallets).length) return;

  const wallets = {};

  Object.keys(selectedWallets).forEach(wallet => {
    const { address, secret } = selectedWallets[wallet];

    if (address && secret) {
      const encryptedSecret = encrypt(secret, password);

      wallets[wallet] = {
        ADDRESS: address,
        SECRET: encrypted ? encryptedSecret : secret,
        ENCRYPTED: encrypted,
      };
    }
  });

  return { ...wallets };
};

const getBlockchainProvider = blockchainProvider => {
  return blockchainProvider;
};

const getPrice = selectedPriceProvider => {
  if (!selectedPriceProvider || !Object.keys(selectedPriceProvider).length) return;

  const nameOfPriceProvider = Object.keys(selectedPriceProvider)[0];

  return {
    PROVIDER: nameOfPriceProvider,
    API_KEY: selectedPriceProvider[nameOfPriceProvider].apiKey,
    UPDATE_INTERVAL: selectedPriceProvider[nameOfPriceProvider].interval,
    ...(nameOfPriceProvider === 'Binance' && { SECRET_KEY: selectedPriceProvider[nameOfPriceProvider].secretKey }),
  };
};

const getExchange = (selectedExchange, password, encrypted) => {
  if (!selectedExchange || !Object.keys(selectedExchange).length) return;

  const nameOfExhange = Object.keys(selectedExchange)[0];

  let { apiKey, secretKey } = selectedExchange[nameOfExhange];

  if (encrypted) {
    apiKey = encrypt(selectedExchange[nameOfExhange].apiKey, password);
    secretKey = encrypt(selectedExchange[nameOfExhange].secretKey, password);
  }

  return {
    NAME: nameOfExhange,
    API_KEY: apiKey,
    SECRET_KEY: secretKey,
  };
};

const getNotifications = (notifications, password, encrypted) => {
  if (!notifications || !Object.keys(notifications).length) return;

  const selectedChannels = {};

  Object.keys(notifications).forEach(channel => {
    if (notifications[channel].ENABLED) {
      if (channel === 'EMAIL' && encrypted) {
        notifications.EMAIL.PASSWORD = encrypt(notifications.EMAIL.PASSWORD, password);
      }

      selectedChannels[channel] = {
        ...notifications[channel],
      };
    }
  });

  return { ...selectedChannels };
};

const getAggregatorUrl = serverOptions => {
  if (!serverOptions || !Object.keys(serverOptions).length || !serverOptions.aggregatorUrl) return;

  return serverOptions.aggregatorUrl;
};

const getTrackerUrl = serverOptions => {
  if (!serverOptions || !Object.keys(serverOptions).length || !serverOptions.trackerUrl) return;

  return serverOptions.trackerUrl;
};

const getJellyPriceProvider = serverOptions => {
  if (!serverOptions || !Object.keys(serverOptions).length || !serverOptions.jellyPriceProvider) return;

  return serverOptions.jellyPriceProvider;
};
const getServerPort = serverOptions => {
  if (!serverOptions || !Object.keys(serverOptions).length || !serverOptions.port) return;

  return {
    PORT: serverOptions.port,
  };
};

const getDatabase = selectedDatabase => {
  if (!selectedDatabase || !Object.keys(selectedDatabase).length) return;

  const dbName = selectedDatabase.active.toUpperCase() || selectedDatabase?.ACTIVE?.toUpperCase();

  const database = { ACTIVE: dbName };

  switch (dbName) {
    case 'MONGODB': {
      database.MONGODB = {
        URL: selectedDatabase.url,
        AUTH: selectedDatabase.auth,
        MONGO_PASSWORD: selectedDatabase.password,
      };
      break;
    }
    case 'SQLITE': {
      database.SQLITE = {
        database: 'butler.sqlite',
      };
      break;
    }
    default:
      break;
  }

  return database;
};
