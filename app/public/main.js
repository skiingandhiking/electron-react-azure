const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

    require('./menus/menu');

    // Create the browser window.
    mainWindow = new BrowserWindow({
        useContentSize: true,
        frame: true,
        skipTaskbar: true,
        transparent: false,
        type: 'toolbar',
        icon: __dirname + '/icons/favicon.png'
    });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, 'index.html'),
    }));

    if (process.env.ELECTRON_ENV === 'development') {
        // Open the DevTools. 
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});