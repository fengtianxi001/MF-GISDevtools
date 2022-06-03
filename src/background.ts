
import { app, BrowserWindow, globalShortcut } from "electron";
const gotTheLock = app.requestSingleInstanceLock();
let mainWindow;
const isDevelopment = process.env.NODE_ENV !== "production";
async function createWindow() {
  const win = new BrowserWindow({
    width: 960,
    height: 640,
    resizable: true,
    closable: true,
    // transparent: true,
    frame: false,
    opacity: 1,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      webSecurity: false,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    win.loadURL("app://./index.html");
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized && mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  app.on("ready", () => {
    mainWindow = createWindow();
    console.log("mainWindow", mainWindow);
    globalShortcut.register("Ctrl+Shift+b", function () {
      mainWindow.webContents.openDevTools();
    });
  });
}

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
