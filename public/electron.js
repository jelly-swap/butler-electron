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
const combinedLog = `${path.join(app.getPath('userData'), 'butler-combined.log')}`;
const errorLog = `${path.join(app.getPath('userData'), 'butler-error.log')}`;

let mainWindow, butler;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: { nodeIntegration: true, webSecurity: false },
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
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
  STOPPED: 'butler-killed',
  SAVE: 'save-config',
  LOAD: 'load-config',
  LOADED: 'config-loaded',
  ALIVE: 'butler-alive',
  DIED: 'butler-died',
};

ipcMain.on(BUTLER_EVENTS.START, (event, config) => {
  if (!butler) {
    const butlerPath = `${path.join(app.getAppPath(), 'build/butler/src/index.js')}`;

    log.info('Trying to start...', butlerPath);
    log.info('Executable: ', process.execPath);

    if (config?.DATABASE?.SQLITE?.database) {
      config.DATABASE.SQLITE.database = `${path.join(app.getPath('userData'), 'butler.sqlite')}`;
    }

    butler = fork(butlerPath, [JSON.stringify(config), combinedLog, errorLog], { execPath: process.execPath });

    butler.on('message', msg => {
      if (event && event.sender && event.sender.send) {
        const channel = msg.TYPE || 'DATA';
        console.log(channel, msg.DATA);
        event.sender.send(channel, msg.DATA);
      }
    });

    event.preventDefault();
  }
});

ipcMain.on(BUTLER_EVENTS.STOP, event => {
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
        event.sender.send(BUTLER_EVENTS.STOPPED);
      }
    });

  event.preventDefault();
});

ipcMain.on(BUTLER_EVENTS.SAVE, (event, file) => {
  const configPath = getConfigPath();

  fs.writeFile(configPath, JSON.stringify(file), err => {
    if (err) {
      log.info('Error writing config', err);
    }

    fs.readFile(configPath, (err, file) => {
      if (err) {
        log.info('Error reading config', err);
      }
      event.sender.send(BUTLER_EVENTS.LOADED, JSON.parse(file));
    });
  });

  event.preventDefault();
});

ipcMain.on(BUTLER_EVENTS.LOAD, (event, defaultConfig) => {
  const configPath = getConfigPath();

  fs.readFile(configPath, (err, file) => {
    if (err) {
      log.info('Error reading config', err);
      if (err.code === 'ENOENT') {
        event.sender.send(BUTLER_EVENTS.LOADED, { success: false, config: defaultConfig, reason: 'FILE_NOT_FOUND' });
      } else {
        event.sender.send(BUTLER_EVENTS.LOADED, { success: false, config: defaultConfig, reason: 'UNKNOWN' });
      }
      return;
    }

    if (file) {
      const config = file.toString();
      event.sender.send(BUTLER_EVENTS.LOADED, { success: true, config: JSON.parse(config) });
    }
  });

  event.preventDefault();
});

ipcMain.on(BUTLER_EVENTS.ALIVE, event => {
  if (butler && !butler.connected) {
    butler.kill();
    butler = null;
    event.sender.send(BUTLER_EVENTS.DIED);
  }
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
