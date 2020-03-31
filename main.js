const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const path = require('path');
const url = require('url');


let win;
// Define Menu Bar
let menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                click() {
                    app.quit();
                }
            }

        ]
    },
];
//Change to production when ready to build and deploy
process.env.NODE_ENV = 'development';

//Function for making a new BrowserWindow
function newWindow(win, html, main = true, menu = menuTemplate) {
    win = new BrowserWindow({
        title: "Control Center",
        webPreferences: {
            nodeIntegration: true
        },
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, html),
        protocol: 'file',
        slashes: true
    }));

    //If window is closed shuts down app
    if(main) {
        win.on('closed', () => {
            app.quit();
        })
    }

};

//Code run when app loads
app.on('ready' ,() => {
    //Opens mainScreen window
    newWindow(win, "mainScreen.html");
    //Adds menu to browserWindow
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    localStorage.setItem("String", "Hello");
});

//If in development stage add devtools menu option
if(process.env.NODE_ENV !== 'production') {
    menuTemplate.push(
        {
            label:"Dev Tools",
            submenu: [
                {
                    label: "Toggle Dev Tools",
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        });
};

// If platform is MacOS then append
if(process.platform == 'darwin') {
    menuTemplate.unshift({
        label: "Main"
    });
}



