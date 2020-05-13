const electron = require('electron');

const { fork } = require('child_process');

const { app, ipcMain, globalShortcut } = electron;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow, butler;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }

  mainWindow.removeMenu();

  mainWindow.on('focus', () => {
    globalShortcut.registerAll(['CommandOrControl+R', 'F5', 'Control+F5'], () => {});
  });

  mainWindow.on('blur', () => {
    globalShortcut.unregisterAll();
  });

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const BUTLER_EVENTS = {
  START: 'start-butler',
  STOP: 'stop-butler',
};

const { START, STOP } = BUTLER_EVENTS;

ipcMain.on(START, (event, config) => {
  if (isDev) {
    butler = fork('./src/butler/src/index.js', [config]);
  } else {
    const dataPath = path.join(process.resourcesPath, 'data');
    const butlerPath = path.join(dataPath, 'butler');
    butler = fork(`${butlerPath}/src/index.js`, [config]);
  }

  butler.on('message', msg => {
    event.sender.send('data', msg);
  });
});

ipcMain.on(STOP, event => {
  if (butler?.killed) return;

  butler.kill();

  const listeners = Object.values(BUTLER_EVENTS);

  ipcMain.removeAllListeners(listeners);

  const homePath = '/';

  event.sender.send('butlerHasBeenKilled', homePath);
});
