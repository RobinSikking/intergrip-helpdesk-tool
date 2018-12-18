// Basic init
const electron = require('electron');
const {app, BrowserWindow} = electron;
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');

function isDev() {
    return process.mainModule.filename.indexOf('app.asar') === -1;
}

// Let electron reloads by itself when webpack watches changes in ./app/
if (isDev()) {
    require('electron-reload')(__dirname)
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        icon: __dirname + '/icons/icon.png',
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
});

const sendStatusToWindow = (text) => {
    log.info(text);

    if (mainWindow) {
        mainWindow.webContents.send('message', text)
    }
};

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update');
});

autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available');
});

autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available');
});

autoUpdater.on('error', (error) => {
    sendStatusToWindow('Error in auto-updater: ' + error.toString());
});

autoUpdater.on('download-progress', (progress) => {
    sendStatusToWindow(
        'Download speed ' + progress.bytesPerSecond + ' - Download ' + progress.precent
        + '% (' + progress.transferred + ' transferred)');
});

autoUpdater.on('update-downloaded', () => {
    sendStatusToWindow('Update downloaded; will install now');

    autoUpdater.quitAndInstall();
});