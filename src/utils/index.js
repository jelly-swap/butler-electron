import BigNumber from 'big.js';
import { ASSETS_MAP } from '../constants/assets';
import { decrypt, encrypt } from './crypto';

export const safeAccess = (object, path) => {
  return object
    ? path.reduce(
        (accumulator, currentValue) => (accumulator && accumulator[currentValue] ? accumulator[currentValue] : null),
        object,
      )
    : null;
};

const ADDRESSES_LENGTH = {
  ETH: {
    MAX: 40,
  },
  BTC: {
    MAX: 39,
  },
  AE: {
    MIN: 38,
    MAX: 50,
  },
};

export const getNetworkRegex = network => {
  switch (network) {
    case 'BTC':
      return `^bc1[a-zA-HJ-NP-Z0-9]{${ADDRESSES_LENGTH.BTC.MAX}}$`;
    case 'AE':
      return `^ak_[a-zA-Z0-9]{${ADDRESSES_LENGTH.AE.MIN},${ADDRESSES_LENGTH.AE.MAX}}$`;
    case 'ONE':
      return `^one1[a-zA-HJ-NP-Z0-9]`;
    default:
      return `^0x[0-9a-fA-F]{${ADDRESSES_LENGTH.ETH.MAX}}$`;
  }
};

export const validateAddress = (asset, address) => {
  if (!new RegExp(getNetworkRegex(asset)).test(address)) {
    return true;
  }
};

export const cutHash = txHash => {
  return txHash.substring(0, 4) + '...' + txHash.substring(txHash.length, txHash.length - 4);
};

export const getAmount = (amount, network) => {
  return new BigNumber(amount).div(Math.pow(10, ASSETS_MAP[network].decimals)).toFixed(4).toString();
};

export const decryptSecrets = async (config, password) => {
  const decryptedConfig = { ...config };

  if (config.WALLETS) {
    for (const asset in config.WALLETS) {
      const secret = config.WALLETS[asset].SECRET;
      const encrypted = config.WALLETS[asset].ENCRYPTED;

      if (secret && encrypted) {
        const result = await decrypt(secret, password);
        if (result.success && result.data) {
          decryptedConfig.WALLETS[asset].SECRET = result.data;
        } else {
          throw new Error('WRONG_PASSWORD');
        }
      }
    }
  }

  if (config.NOTIFICATIONS?.EMAIL?.ENABLED) {
    const emailPassword = config.NOTIFICATIONS.EMAIL.PASSWORD;
    const result = await decrypt(emailPassword, password);

    if (result.success && result.data) {
      decryptedConfig.NOTIFICATIONS.EMAIL.PASSWORD = result.data;
    }
  }

  if (config.EXCHANGE?.API_KEY) {
    const exchangeApiKey = config.EXCHANGE.API_KEY;
    const result = await decrypt(exchangeApiKey, password);

    if (result.success && result.data) {
      decryptedConfig.EXCHANGE.API_KEY = result.data;
    }
  }

  if (config.EXCHANGE?.SECRET_KEY) {
    const exchangeSecretKey = config.EXCHANGE.SECRET_KEY;
    const result = await decrypt(exchangeSecretKey, password);

    if (result.success && result.data) {
      decryptedConfig.EXCHANGE.SECRET_KEY = result.data;
    }
  }

  return decryptedConfig;
};

export const encryptSecrets = async (config, password) => {
  const encryptedConfig = { ...config };

  if (config.WALLETS) {
    for (const asset in config.WALLETS) {
      const secret = config.WALLETS[asset].SECRET;
      if (secret) {
        const result = await encrypt(secret, password);
        if (result) {
          encryptedConfig.WALLETS[asset].SECRET = result;
          encryptedConfig.WALLETS[asset].ENCRYPTED = true;
        } else {
          throw new Error('ERROR_ENCRYPTING');
        }
      }
    }
  }

  if (config.NOTIFICATIONS?.EMAIL?.ENABLED) {
    const emailPassword = config.NOTIFICATIONS.EMAIL.PASSWORD;
    const result = await encrypt(emailPassword, password);
    if (result) {
      encryptedConfig.NOTIFICATIONS.EMAIL.PASSWORD = result;
    } else {
      throw new Error('ERROR_ENCRYPTING');
    }
  }
  if (config.EXCHANGE?.API_KEY) {
    const exchangeApiKey = config.EXCHANGE.API_KEY;
    const result = await encrypt(exchangeApiKey, password);

    if (result) {
      encryptedConfig.EXCHANGE.API_KEY = result;
    } else {
      throw new Error('ERROR_ENCRYPTING');
    }
  }

  if (config.EXCHANGE?.SECRET_KEY) {
    const exchangeSecretKey = config.EXCHANGE.SECRET_KEY;
    const result = await encrypt(exchangeSecretKey, password);

    if (result) {
      encryptedConfig.EXCHANGE.SECRET_KEY = result;
    } else {
      throw new Error('ERROR_ENCRYPTING');
    }
  }

  return encryptedConfig;
};
