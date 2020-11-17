import algosdk from 'algosdk';
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

export const validateAddress = (network, address) => {
  switch (network) {
    case 'BTC':
      return RegExp(`^bc1[a-zA-HJ-NP-Z0-9]{${ADDRESSES_LENGTH.BTC.MAX}}$`).test(address);
    case 'ALGO':
      return algosdk.isValidAddress(address);
    case 'AE':
      return RegExp(`^ak_[a-zA-Z0-9]{${ADDRESSES_LENGTH.AE.MIN},${ADDRESSES_LENGTH.AE.MAX}}$`).test(address);
    case 'ONE':
      return RegExp(`^one1[a-zA-HJ-NP-Z0-9]`).test(address);
    default:
      return RegExp(`^0x[0-9a-fA-F]{${ADDRESSES_LENGTH.ETH.MAX}}$`).test(address);
  }
};

export const cutHash = txHash => {
  return txHash.substring(0, 4) + '...' + txHash.substring(txHash.length, txHash.length - 4);
};

export const getAmount = (amount, network) => {
  return new BigNumber(amount).div(Math.pow(10, ASSETS_MAP[network].decimals)).toFixed(4).toString();
};

export const decryptSecrets = async (config, password) => {
  const decryptedConfig = JSON.parse(JSON.stringify(config));

  if (decryptedConfig.ENCRYPTED) {
    decryptedConfig.ENCRYPTED = false;

    if (decryptedConfig.WALLETS) {
      for (const asset in decryptedConfig.WALLETS) {
        const secret = decryptedConfig.WALLETS[asset].SECRET;

        if (secret) {
          const result = await decrypt(secret, password);
          if (result.success && result.data) {
            decryptedConfig.WALLETS[asset].SECRET = result.data;
          } else {
            throw new Error('WRONG_PASSWORD');
          }
        }
      }
    }

    if (decryptedConfig.NOTIFICATIONS?.EMAIL?.ENABLED) {
      const emailPassword = decryptedConfig.NOTIFICATIONS.EMAIL.PASSWORD;
      const result = await decrypt(emailPassword, password);

      if (result.success && result.data) {
        decryptedConfig.NOTIFICATIONS.EMAIL.PASSWORD = result.data;
      }
    }

    if (decryptedConfig.EXCHANGE?.API_KEY) {
      const exchangeApiKey = decryptedConfig.EXCHANGE.API_KEY;
      const result = await decrypt(exchangeApiKey, password);

      if (result.success && result.data) {
        decryptedConfig.EXCHANGE.API_KEY = result.data;
      }
    }

    if (decryptedConfig.EXCHANGE?.SECRET_KEY) {
      const exchangeSecretKey = decryptedConfig.EXCHANGE.SECRET_KEY;
      const result = await decrypt(exchangeSecretKey, password);

      if (result.success && result.data) {
        decryptedConfig.EXCHANGE.SECRET_KEY = result.data;
      }
    }
  }

  return decryptedConfig;
};

export const encryptSecrets = async (config, password) => {
  const encryptedConfig = JSON.parse(JSON.stringify(config));

  if (!encryptedConfig.ENCRYPTED) {
    encryptedConfig.ENCRYPTED = true;

    if (encryptedConfig.WALLETS) {
      for (const asset in encryptedConfig.WALLETS) {
        const secret = encryptedConfig.WALLETS[asset].SECRET;
        if (secret) {
          const result = await encrypt(secret, password);
          if (result) {
            encryptedConfig.WALLETS[asset].SECRET = result;
          } else {
            throw new Error('ERROR_ENCRYPTING');
          }
        }
      }
    }

    if (encryptedConfig.NOTIFICATIONS?.EMAIL?.ENABLED) {
      const emailPassword = encryptedConfig.NOTIFICATIONS.EMAIL.PASSWORD;
      const result = await encrypt(emailPassword, password);
      if (result) {
        encryptedConfig.NOTIFICATIONS.EMAIL.PASSWORD = result;
      } else {
        throw new Error('ERROR_ENCRYPTING');
      }
    }
    if (encryptedConfig.EXCHANGE?.API_KEY) {
      const exchangeApiKey = encryptedConfig.EXCHANGE.API_KEY;
      const result = await encrypt(exchangeApiKey, password);

      if (result) {
        encryptedConfig.EXCHANGE.API_KEY = result;
      } else {
        throw new Error('ERROR_ENCRYPTING');
      }
    }

    if (encryptedConfig.EXCHANGE?.SECRET_KEY) {
      const exchangeSecretKey = encryptedConfig.EXCHANGE.SECRET_KEY;
      const result = await encrypt(exchangeSecretKey, password);

      if (result) {
        encryptedConfig.EXCHANGE.SECRET_KEY = result;
      } else {
        throw new Error('ERROR_ENCRYPTING');
      }
    }
  }

  return encryptedConfig;
};
