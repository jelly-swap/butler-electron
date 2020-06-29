const fs = require('fs');

const log = require('electron-log');

const { BrowserWindow, dialog, app, ipcMain, globalShortcut } = require('electron');

const { fork } = require('child_process');

const path = require('path');
const isDev = require('electron-is-dev');

const { autoUpdater } = require('electron-updater');
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

log.transports.file.level = 'info';
log.transports.file.file = `${path.join(app.getPath('userData'), 'butler-electron.log')}`;

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
  if (!butler) {
    const butlerPath = `${path.join(app.getAppPath(), 'build/butler/src/index.js')}`;

    log.info('Trying to start...', butlerPath);
    log.info('Config: ', config);
    log.info('Executable: ', process.execPath);

    const _config = JSON.parse(config);
    if (_config?.DATABASE?.SQLITE?.database) {
      _config.DATABASE.SQLITE.database = `${path.join(app.getPath('userData'), 'butler.sqlite')}`;
    }

    butler = fork(butlerPath, [JSON.stringify(_config)], { execPath: process.execPath });

    butler.on('message', msg => {
      if (event && event.sender && event.sender.send) {
        event.sender.send('data', msg);
      }
    });

    event.preventDefault();
  }
});

ipcMain.on(STOP, event => {
  if (!butler || butler?.killed) {
    return;
  }

  dialog
    .showMessageBox(mainWindow, {
      buttons: ['Yes', 'No', 'Cancel'],
      message: 'Do you really want to stop Butler?',
    })
    .then(result => {
      if (result.response === 0) {
        butler.kill();
        butler = null;

        const listeners = Object.values(BUTLER_EVENTS);
        ipcMain.removeAllListeners(listeners);

        event.sender.send('butlerHasBeenKilled', '/');
      }
    });

  event.preventDefault();
});

ipcMain.on(LOAD, event => {
  const configPath = getConfigPath();

  fs.readFile(configPath, (err, file) => {
    if (err) {
      log.info('Error reading config', err);
      return;
    }

    let fileToUse = file;

    const fileAsStr = file && file.toString();

    if (!fileAsStr) {
      fileToUse = JSON.stringify({});
    }

    event.sender.send('configLoaded', JSON.parse(fileToUse));
  });

  event.preventDefault();
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

  event.preventDefault();
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
  dialog
    .showMessageBox(mainWindow, {
      buttons: ['Get Updates'],
      message: 'A new update is now available. Updates need to be installed.',
    })
    .then(result => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      } else if (result.response === 1) {
        process.exit(-1);
      }
    });
});

const getConfigPath = () => {
  return `${path.join(app.getPath('userData'), 'config.json')}`;
};
