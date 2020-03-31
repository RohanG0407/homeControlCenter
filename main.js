const electron = require('electron');
const {app, BrowserWindow} = electron;
const ipcMain = electron.ipcMain;
const path = require('path');
const url = require('url');


let win;
function newWindow(win, html, main = true) {
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, html),
        protocol: 'file',
        slashes: true
    }));

    if(main) {
        win.on('closed', () => {
            app.quit();
        })
    }

}

app.on('ready' ,() => {
    newWindow();
});



