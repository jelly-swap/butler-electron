export const getConfigPath = () => {
  const isDev = window.require('electron-is-dev');

  if (isDev) {
    return './extraResources/config.json';
  } else {
    const path = window.require('path');
    const dataPath = path.join(process.resourcesPath, 'data');
    const configFile = path.join(dataPath, 'config.json');
    return configFile;
  }
};
