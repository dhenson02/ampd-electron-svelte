const {
    app,
    BrowserWindow,
} = require('electron');

// const fs = require('fs');
// const path = require('path');

// const { logger } = require('./logger');
// const gqlInit = require('./graphql-server');

async function createWindow () {
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
    await win.loadFile('index.html');
    if ( process.env.NODE_ENV === `development` ) {
        win.webContents.openDevTools();
    }
    // let contents = win.webContents
    // console.log(await contents.capturePage());
}

app.on(`ready`, createWindow);
// app.whenReady()
    // .then(() => gqlInit()
    //     .catch(error => logger.error(`Failed to initialize GraphQL`, error)))
    // .then(createWindow);

app.on(`window-all-closed`, () => {
    if ( process.platform !== `darwin` ) {
        app.quit();
    }
});
