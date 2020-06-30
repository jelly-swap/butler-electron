import { generateConfig } from './generateConfig';
import { validateConfig, areAllValid } from './validateConfig';
import { decryptPrivateKey } from './managePrivateKeys';

const { ipcRenderer } = window.require('electron');

export const readCFGFromFS = password =>
  new Promise((resolve, reject) => {
    if (!password) {
      resolve({});
    }

    ipcRenderer.send('loadConfig');

    ipcRenderer.once('configLoaded', (__message, config) => {
      decryptKeys(config.WALLETS, password);

      resolve(config);
    });
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
    const generatedConfig = generateConfig(config, password);

    const validatedConfig = validateConfig(generatedConfig);

    const allQuestionsAreValid = areAllValid(validatedConfig);

    if (!allQuestionsAreValid) {
      return;
    }

    ipcRenderer.send('saveConfig', generatedConfig);

    ipcRenderer.send('start-butler', JSON.stringify(generatedConfig));

    resolve({
      validatedConfig,
      allQuestionsAreValid,
      serverPort: generatedConfig.SERVER.PORT,
    });
  });
