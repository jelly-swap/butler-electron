import { getNetworkRegex } from './addressValidation';
import { REGEX_FOR_EMAIL } from '../constants';

export const validateConfig = Config => {
  return {
    NAME: validateName(Config.NAME),
    PAIRS: validateTraidingPairs(Config.PAIRS),
    WALLETS: validateWallets(Config.WALLETS, Config.PAIRS),
    PRICE: validatePriceProvider(Config.PRICE),
    EXCHANGE: validateExchange(Config.EXCHANGE),
    NOTIFICATIONS: validateNotifications(Config.NOTIFICATIONS),
  };
};

const validateName = name => {
  return Boolean(name);
};

const validateTraidingPairs = pairs => {
  for (const pair in pairs) {
    if (pairs[pair].FEE === undefined || pairs[pair].FEE === null) {
      return false;
    }
  }

  return true;
};

const validateWallets = (wallets, pairs) => {
  for (const pair in pairs) {
    const [provide, receive] = pair.split('-').reverse();

    for (const wallet in wallets) {
      const isValidProvide = validateWalletState(wallets, provide);
      const isValidReceive = validateWalletState(wallets, receive);

      if (!isValidProvide || !isValidReceive) {
        return false;
      }
    }
  }

  return true;
};

const validatePriceProvider = priceProvider => {
  if (
    priceProvider.PROVIDER === 'Binance' &&
    (!priceProvider.API_KEY || !priceProvider.SECRET_KEY || !priceProvider.INTERVAL)
  ) {
    return false;
  } else if (!priceProvider.API_KEY || !priceProvider.INTERVAL) {
    return false;
  }

  return true;
};

const validateExchange = exchange => {
  if (!exchange) return true;

  if (!exchange.API_KEY || !exchange.SECRET_KEY) {
    return false;
  }

  return true;
};

const validateNotifications = notifications => {
  const selectedNotifications = Object.keys(notifications);

  const validatedNotificaitons = { EMAIL: true, SLACK: true };

  selectedNotifications.forEach(notification => {
    if (notification === 'SLACK') {
      if (!notifications.SLACK.enabled) {
        validatedNotificaitons.SLACK = true;
      } else if (notifications.SLACK.enabled && !notifications.SLACK.webhookUrl) {
        validatedNotificaitons.SLACK = false;
      } else {
        validatedNotificaitons.SLACK = true;
      }
    } else if (notification === 'EMAIL') {
      if (
        notifications.EMAIL.enabled &&
        (!REGEX_FOR_EMAIL.test(notifications.EMAIL.username) ||
          !REGEX_FOR_EMAIL.test(notifications.EMAIL.from) ||
          !REGEX_FOR_EMAIL.test(notifications.EMAIL.to) ||
          !notifications.EMAIL.password)
      ) {
        validatedNotificaitons.EMAIL = false;
      } else {
        validatedNotificaitons.EMAIL = true;
      }
    }
  });

  return validatedNotificaitons;
};

const validateWalletState = (wallets, network) => {
  if (!new RegExp(getNetworkRegex(network)).test(wallets[network].ADDRESS) || !wallets[network].SECRET) {
    return false;
  }

  return true;
};

export const checkForInvalid = questions => {
  for (const key in questions) {
    // Notifications is nested OBJECT covering EMAIL and SLACK inside
    if (key === 'NOTIFICATIONS') {
      if (!questions[key].EMAIL || !questions[key].SLACK) {
        return false;
      }
    } else if (!questions[key]) {
      return false;
    }
  }

  return true;
};
