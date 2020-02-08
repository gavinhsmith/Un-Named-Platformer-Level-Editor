const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const modalPath = path.join('file://', __dirname, 'main/index.html');

app.on('ready',function () {
  mainw = new BrowserWindow({
    //width: 1000,
    //height: 500,
    //resizable: false,
    //fullscreen: false,
    icon: path.join(__dirname, 'build/icon.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  let win = mainw;

  //win.setMenu(null);
  win.on('close', () => {win = null});
  win.loadURL(modalPath);
  win.show();
});
