const electron = require('electron');

const log = require('electron-log');

const { fork } = require('child_process');

const { app, ipcMain } = electron;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

const { autoUpdater } = require('electron-updater');
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

log.transports.file.level = 'info';
log.transports.file.file = 'butler-electron.log';

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

  mainWindow.on('closed', () => (mainWindow = null));

  if (!isDev) {
    autoUpdater.checkForUpdates();
  }
}

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
  createWindow();
});

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

//-------------------------------------------------------------------
// Butler
//-------------------------------------------------------------------
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

//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------
const sendStatusToWindow = text => {
  log.info(text);
  if (mainWindow) {
    mainWindow.webContents.send('message', text);
  }
};

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', info => {
  log.info('update-not-available');

  sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', err => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
});

autoUpdater.on('download-progress', progressObj => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`,
  );
});

autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('Update downloaded; will install now');
});

autoUpdater.on('update-downloaded', info => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 500 ms.
  // You could call autoUpdater.quitAndInstall(); immediately
  autoUpdater.quitAndInstall();
});
