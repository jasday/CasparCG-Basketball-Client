const { app, BrowserWindow,ipcMain} = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
require("dotenv").config();



//Net import for TCP Stream
const Net = require("net");

//TCP Stream constants
const casparIP = process.env.CASPARCG_IP;
const casparPort = process.env.CASPARCG_PORT || 5250;

const serverPort = process.env.SERVER_PORT || 8000;

let casperEnabled = process.env.CASPAR_ENABLED;
let mainWindow;



function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    backgroundColor: "#313335",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);
  mainWindow.focus();

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

store = 'test';
mainWindow.webContents.send('store-data', store);


//IPC Listener

ipcMain.on('request-mainprocess-action', (event, arg) => {
  if (arg.message == "newWindow") {
    childWindow(arg.url, arg.num);
  } else if (arg.message == "closeWindow") {
    closeChildWindow(arg.num);
  } else if (arg.message == "updateWindow") {
    updateChildWindow(arg.url, arg.num);
  }
});

//TCP Stream to CasparCG Server

//Create Stream object
const stream = new Net.Socket();
let casparConnected = false;
let casparFirstConnection = true;
let errorCount = 0;
let intervalConnect = false;
const casparTimeout = process.env.CASPAR_RECONNECTION_TIMEOUT;

//Connect to Caspar Server
const casparConnect = () => {
  stream.connect({ port: casparPort, host: casparIP });
};

//Reconnection functions - will try to reconnect every 5 seconds.
const launchIntervalConnect = () => {
  if (false != intervalConnect) return;
  //TODO Emit connecting event
  io.sockets.emit("CG-CONNECTING");
  intervalConnect = setInterval(casparConnect, casparTimeout);
};

const clearIntervalConnect = () => {
  if (false == intervalConnect) return;
  clearInterval(intervalConnect);
  intervalConnect = false;
};

//Message helper
const sendMessage = (command) => {
  let commandBuffer = Buffer.from(command + "\r\n", "utf8");
  stream.write(commandBuffer);
  console.log("Caspar command sent: ", command);
};

stream.on("connect", () => {
  clearIntervalConnect();
  console.log(`CASPAR// Connected to Caspar Server ${casparIP}:${casparPort}`);
  errorCount = 0;
  casparFirstConnection = false;
  casparConnected = true;
  //TODO Emit connected event
  io.sockets.emit("CG-CONNECTED");
  sendMessage("INFO");
});

const casparDataHandler = (data) => {
  let dataAsString = data.toString().replace(/^[\s\t]*(\r\n|\n|\r)/gm, "");
  //TODO Emit data to renderer
  io.sockets.emit("CG-RECEIVED-DATA", dataAsString);
};

stream.on("error", (err) => {
  errorCount += 1;
  console.error(
      `CASPAR// Connection Attempt failed (${errorCount}) - ${err.code}`
  );
  //TODO Emit error message
  io.sockets.emit("CG-CONNECTION-ERROR", errorCount);
});

stream.on("data", (data) => {
  casparDataHandler(data);
});

stream.on("close", launchIntervalConnect);
stream.on("end", launchIntervalConnect);

if (casperEnabled == "TRUE") casparConnect();