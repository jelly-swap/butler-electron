const electron = require('electron');
const fs = require('fs');

const log = require('electron-log');

const { fork } = require('child_process');

const { app, ipcMain, globalShortcut } = electron;
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
      webSecurity: false,
    },
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }

  mainWindow.removeMenu();

  if (!isDev) {
    mainWindow.on('focus', () => {
      globalShortcut.registerAll(['CommandOrControl+R', 'F5', 'Control+F5'], () => {});
    });

    mainWindow.on('blur', () => {
      globalShortcut.unregisterAll();
    });
  }

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
  SAVE: 'saveConfig',
  LOAD: 'loadConfig',
};

const { START, STOP, SAVE, LOAD } = BUTLER_EVENTS;

ipcMain.on(START, (event, config) => {
  if (isDev) {
    butler = fork('./public/butler/src/index.js', [config]);
  } else {
    const asarPath = app.getAppPath();
    const butlerPath = `${asarPath}/build/butler/src/index.js`;

    log.info('Trying to start...', butlerPath);
    log.info('Config: ', config);
    log.info('Executable: ', process.execPath);
    butler = fork(butlerPath, [config]);
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

ipcMain.on(LOAD, event => {
  const configPath = getConfigPath();

  fs.readFile(configPath, (err, file) => {
    if (err) {
      log.info('Error reading config', err);
    }

    let fileToUse = file;

    const fileAsStr = file && file.toString();

    if (!fileAsStr) {
      fileToUse = JSON.stringify({});
    }

    event.sender.send('configLoaded', JSON.parse(fileToUse));
  });
});

ipcMain.on(SAVE, (event, file) => {
  const configPath = getConfigPath();

  fs.writeFile(configPath, JSON.stringify(file), err => {
    if (err) {
      log.info('Error writing config', err);
    }

    fs.readFile(configPath, (err, file) => {
      if (err) {
        log.info('Error reading config', err);
      }
      event.sender.send('configSaved', JSON.parse(file));
    });
  });
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

const getConfigPath = () => {
  if (isDev) {
    return './extraResources/config.json';
  } else {
    const dataPath = path.join(process.resourcesPath, 'data');
    const configFile = path.join(dataPath, 'config.json');
    return configFile;
  }
};
