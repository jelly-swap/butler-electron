export const generateConfig = config => {
  return {
    NAME: config.NAME,
    PAIRS: getPairs(config.PAIRS),
    WALLETS: getWallets(config.WALLETS),
    PRICE: getPrice(config.PRICE_PROVIDER),
    EXCHANGE: getExchange(config.REBALANCE),
    NOTIFICATIONS: getNotifications(config.NOTIFICATIONS),
    AGGREGATOR_URL: getAggregatorUrl(config.SERVER_OPTIONS),
    SERVER: getServerPort(config.SERVER_OPTIONS),
    DATABASE: getDatabase(config.DATABASE),
  };
};

const getPairs = selectedPairs => {
  if (!selectedPairs || !Object.keys(selectedPairs).length) return;

  const pairs = {};

  Object.keys(selectedPairs).forEach(pair => {
    const { provide, receive, fee } = selectedPairs[pair];
    pairs[receive + '-' + provide] = { FEE: fee };
  });

  return { ...pairs };
};

const getWallets = selectedWallets => {
  if (!selectedWallets || !Object.keys(selectedWallets).length) return;

  const wallets = {};

  Object.keys(selectedWallets).forEach(wallet => {
    const { address, secret } = selectedWallets[wallet];

    wallets[wallet] = {
      ADDRESS: address,
      SECRET: secret,
    };
  });

  return { ...wallets };
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

const getExchange = selectedExchange => {
  if (!selectedExchange || !Object.keys(selectedExchange).length) return;

  const nameOfExhange = Object.keys(selectedExchange)[0];

  return {
    NAME: nameOfExhange,
    API_KEY: selectedExchange[nameOfExhange].apiKey,
    SECRET_KEY: selectedExchange[nameOfExhange].secretKey,
  };
};

const getNotifications = notifications => {
  if (!notifications || !Object.keys(notifications).length) return;

  const selectedChannels = {};

  Object.keys(notifications).forEach(channel => {
    if (notifications[channel].enabled) {
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

const getServerPort = serverOptions => {
  if (!serverOptions || !Object.keys(serverOptions).length || !serverOptions.port) return;

  return {
    PORT: serverOptions.port,
  };
};

const getDatabase = selectedDatabase => {
  if (!selectedDatabase || !Object.keys(selectedDatabase).length) return;

  const dbName = selectedDatabase.active.toUpperCase();

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
