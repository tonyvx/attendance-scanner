const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const url = require("url");
const { channels } = require("../src/shared/constants");

let mainWindow;

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../public/index.html"),
      protocol: "file:",
      slashes: true,
    });
  var menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        { label: "Maundy Thursday" },
        { label: "Good Friday" },
        { label: "Easter Vigil" },
        { type: "separator" }, // Add this
        {
          label: "Exit",
          click() {
            app.quit();
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "pp.jpeg"),
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});
