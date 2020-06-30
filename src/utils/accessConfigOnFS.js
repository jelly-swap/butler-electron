import { generateConfig } from './generateConfig';
import { validateConfig, areAllValid } from './validateConfig';

const { ipcRenderer } = window.require('electron');

export const readCFGFromFS = password =>
  new Promise((resolve, reject) => {
    if (!password) {
      resolve({});
    }

    ipcRenderer.send('loadConfig');

    ipcRenderer.once('configLoaded', (__message, config) => {
      resolve(config);
    });
  });

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
