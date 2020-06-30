import { generateConfig } from './generateConfig';
import { validateConfig, areAllValid } from './validateConfig';
import { decryptPrivateKey } from './managePrivateKeys';
import Emitter from './emitter';

const { ipcRenderer } = window.require('electron');

export const readCFGFromFS = password =>
  new Promise((resolve, reject) => {
    if (!password) {
      resolve({});
    }

    try {
      ipcRenderer.send('loadConfig');

      ipcRenderer.once('configLoaded', (__message, { success, config }) => {
        // IF success is false we load DEFAULT_CONFIG

        if (!success) {
          resolve({ success, config });
          new Emitter().emitAll('CORRECT_PASSWORD');

          return;
        }

        const secretNotFound = decryptKeys(config.WALLETS, password);

        if (secretNotFound) {
          new Emitter().emitAll('WRONG_PASSWORD');
          return;
        }

        new Emitter().emitAll('CONFIG_LOADED', config);

        resolve({ success, config });

        new Emitter().emitAll('CORRECT_PASSWORD');
      });
    } catch (error) {
      console.log(error);
    }
  });

const decryptKeys = (wallets, password) => {
  let secretNotFound = false;

  Object.keys(wallets).forEach(wallet => {
    const secret = decryptPrivateKey(wallets[wallet], password);

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
    const encryptedConfig = generateConfig(config, password);
    const plainConfig = generateConfig(config, password, false);

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
