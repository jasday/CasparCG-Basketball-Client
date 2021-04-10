const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
require("dotenv").config();

//CONFIG:
/*
ENABLE CASPAR
CASPAR IP
CASPAR PORT
CHANNEL LAYER
VIDEO LAYER
 */


//Net import for TCP Stream
const Net = require("net");

//TCP Stream constants
const casparIP = process.env.CASPARCG_IP;
const casparPort = process.env.CASPARCG_PORT || 5250;

let casperEnabled = process.env.CASPAR_ENABLED;
let mainWindow;
let store = {header: 'default', value: 'default'};

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


function sendToClient(store) {
  mainWindow.webContents.send('store-data', store);
  store.header = '';
}

function sendStringToClient(message){
  store = {header: 'CG-CONNECTING', value: message};
  mainWindow.webContents.send('store-data', store)
}


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
  store = {header: 'CG-CONNECTING', value: 'default'};
  sendToClient(store);
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
  setTimeout(() => {
    store = {header: 'CG-CONNECTED', value: 'default'};
    sendToClient(store);
    sendMessage("INFO");
  }, 5000);

});

const casparDataHandler = (data) => {
  let dataAsString = data.toString().replace(/^[\s\t]*(\r\n|\n|\r)/gm, "");
  store = {header: 'CG-RECEIVED-DATA', value: dataAsString};
  sendToClient(store);
};

stream.on("error", (err) => {
  errorCount += 1;
  console.error(
      `CASPAR// Connection Attempt failed (${errorCount}) - ${err.code}`
  );
  store = {header: 'CG-CONNECTION-ERROR', value: 'default'};
  sendToClient(store);
});

stream.on("data", (data) => {
  casparDataHandler(data);
});

stream.on("close", ()=> casperEnabled ? launchIntervalConnect() : sendStringToClient("Caspar stream disconnected and disabled, will not reconnect"));
stream.on("end", ()=> casperEnabled ? launchIntervalConnect() : sendStringToClient("Caspar stream disconnected and disabled, will not reconnect"));

if (casperEnabled == "TRUE") casparConnect();


//IPC Listener

//Escaping function
function escapeJSON(object){
  let objectJSON = {};
  objectJSON = JSON.stringify(object);
  return objectJSON.replaceAll('"','\\"');
}

ipcMain.on('request-mainprocess-action', (event, arg) => {
  let message = '';
  let payload = {};
  switch (arg.action) {
    case "toggle-scores":
      payload = {
        type: "toggle_scores"
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "set-quarter":
      payload = {
        type: "set-quarter",
        payload: {
          quarter: arg.payload.quarter
        }
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "timer-pause":
      payload = {
        type: "timer-pause"
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "timer-play":
      payload = {
        type: "timer-play"
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "timer-set":
      payload = {
        type: "timer-set",
        payload: {
          minutes: arg.payload.minutes,
          seconds: arg.payload.seconds
        }
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "score-update":
      payload = {
        type: "score-update",
        payload: {
          team: arg.payload.team,
          score: arg.payload.score
        }
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "team-name-update":
      payload = {
        type: "team-name-update",
        payload: {
          team: arg.payload.team,
          name: arg.payload.name
        }
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "team-shortname-update":
      payload = {
        type: "team-shortname-update",
        payload: {
          team: arg.payload.team,
          name: arg.payload.name
        }
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "player-name-update":
      payload = {
        type: "player-name-update",
        payload: {
          team: arg.payload.team,
          id: arg.payload.playerID,
          name: arg.payload.playerName
        }
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    case "player-number-update":
      payload = {
        type: "player-number-update",
        payload: {
          team: arg.payload.team,
          id: arg.payload.playerID,
          number: arg.payload.playerNumber
        }
      };
      message = `CG 1-1 UPDATE 1 "${escapeJSON(payload)}"`;
      sendMessage(message);
      break;
    default:
      message = '';
      payload = {};
      console.error("IPC switch has fallen through to default case")
      break
  }
});
