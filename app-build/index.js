const { app, BrowserWindow, } = require('electron');
const path = require('path');
const { logger } = require("./logger");
async function createWindow() {
    // const iconUrl = url.format({
    //     pathname: path.join(__dirname, `Icon/Icon.icns`),
    //     protocol: `file:`,
    //     slashes: true,
    // });
    // Create the browser window.
    const win = new BrowserWindow({
        "width": 1024,
        "height": 768,
        "webPreferences": {
            "nodeIntegration": true,
            "enableRemoteModule": true,
        },
    });
    // and load the index.html of the app.
    await win.loadFile(path.resolve(`./public/index.html`));
    if (process.env.NODE_ENV === `development`) {
        win.webContents.openDevTools();
    }
    logger.info(`Started app`);
}
app.on(`ready`, createWindow);
app.on(`window-all-closed`, () => {
    if (process.platform !== `darwin`) {
        app.quit();
    }
});
