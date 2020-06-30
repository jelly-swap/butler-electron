import { generateConfig } from './generateConfig';
import { validateConfig, areAllValid } from './validateConfig';
import { decryptPrivateKey } from './managePrivateKeys';

const { ipcRenderer } = window.require('electron');

export const readCFGFromFS = password =>
  new Promise((resolve, reject) => {
    if (!password) {
      resolve({});
    }

    try {
      ipcRenderer.send('loadConfig');

      ipcRenderer.once('configLoaded', (__message, config) => {
        if (config.success === false) {
          resolve({});
          return;
        }

        console.log(config);

        decryptKeys(config.WALLETS, password);

        resolve(config);
      });
    } catch (error) {
      console.log(error);
    }
  });

const decryptKeys = (wallets, password) => {
  Object.keys(wallets).forEach(wallet => {
    const secret = decryptPrivateKey(wallets[wallet], password);

    wallets[wallet].SECRET = secret;
    wallets[wallet].ENCRYPTED = false;
  });
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
