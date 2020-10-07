const { ipcRenderer, shell, remote } = window.require('electron');

export const sendFromRenderer = (type, payload) => {
  ipcRenderer.send(type, payload);
};

export const receiveFromMain = (type, callback) => {
  ipcRenderer.once(type, callback);
};

export const openLink = url => {
  shell.openExternal(url);
};

export const getGlobalVariable = variableName => {
  return remote.getGlobal(variableName);
};
