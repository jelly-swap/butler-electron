import { generateConfig } from './generateConfig';
import { validateConfig, areAllValid } from './validateConfig';
import { decryptPrivateKey } from './managePrivateKeys';
import Emitter from './emitter';
import { DEFAULT_CONFIG } from '../constants';

const { ipcRenderer } = window.require('electron');

export const readCFGFromFS = password =>
  new Promise((resolve, reject) => {
    if (!password) {
      resolve({});
    }

    try {
      ipcRenderer.send('loadConfig', DEFAULT_CONFIG);

      ipcRenderer.once('configLoaded', (__message, { success, config }) => {
        // IF success is false we load DEFAULT_CONFIG

        if (!success) {
          resolve({ success, config });
          new Emitter().emitAll('CORRECT_PASSWORD');

          return;
        }

        const secretNotFound = decryptWalletsKeys(config.WALLETS, password);

        if (secretNotFound) {
          new Emitter().emitAll('WRONG_PASSWORD');
          return;
        }

        config.EXCHANGE && decryptExchangeKeys(config.EXCHANGE, password);

        config?.NOTIFICATIONS?.EMAIL?.ENABLED && decryptEmailPassword(config.NOTIFICATIONS.EMAIL, password);

        new Emitter().emitAll('CONFIG_LOADED', config);

        resolve({ success, config });

        new Emitter().emitAll('CORRECT_PASSWORD');
      });
    } catch (error) {
      console.log(error);
    }
  });

const decryptExchangeKeys = (exhange, password) => {
  const { API_KEY, SECRET_KEY } = exhange;

  exhange.API_KEY = decryptPrivateKey(API_KEY, password);
  exhange.SECRET_KEY = decryptPrivateKey(SECRET_KEY, password);
};

const decryptEmailPassword = (email, password) => {
  email.PASSWORD = decryptPrivateKey(email.PASSWORD, password);
};

const decryptWalletsKeys = (wallets, password) => {
  let secretNotFound = false;

  Object.keys(wallets).forEach(wallet => {
    let secret = wallets[wallet].SECRET;

    if (wallets[wallet].ENCRYPTED) {
      secret = decryptPrivateKey(wallets[wallet].SECRET, password);
    }

    if (!secret) {
      secretNotFound = true;
    } else {
      wallets[wallet].SECRET = secret;
      wallets[wallet].ENCRYPTED = false;
    }
  });

  return secretNotFound;
};

export const writeCFGOnFS = (config, password) =>
  new Promise((resolve, reject) => {
    const plainConfig = generateConfig(config, password, false);
    const encryptedConfig = generateConfig(config, password);

    const validatedConfig = validateConfig(plainConfig);

    const allQuestionsAreValid = areAllValid(validatedConfig);

    if (!allQuestionsAreValid) {
      return;
    }

    ipcRenderer.send('saveConfig', encryptedConfig);

    ipcRenderer.send('start-butler', JSON.stringify(plainConfig));

    resolve({
      validatedConfig,
      allQuestionsAreValid,
      serverPort: encryptedConfig.SERVER.PORT,
    });
  });
