//imports

require("dotenv").config();

const casparIP = process.env.CASPARCG_IP;
const casparPort = process.env.CASPARCG_PORT || 5250;

const serverPort = process.env.SERVER_PORT || 8000;

let casperEnabled = process.env.CASPAR_ENABLED;

//Server initialisation
const express = require("express");
const app = express();
const Net = require("net");

//Starting socket.io server
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.static(__dirname));

//Handling CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Default path
app.get("/", (req, res) => {
  res.send("Hello World").status(200);
});

//Socket IO connection
io.on("connection", (socket) => {
  console.log(
    `SOCKET// User Connected from ${socket.handshake.address} at ${new Date(
      socket.handshake.issued
    ).toLocaleTimeString("en-GB")}, ${new Date(
      socket.handshake.issued
    ).toLocaleDateString("en-GB")}`
  );

  //Timer Listeners
  socket.on("TIMER-PAUSE", () => {
    socket.broadcast.emit("TIMER-PAUSE");
  });
  socket.on("TIMER-PLAY", () => {
    socket.broadcast.emit("TIMER-PLAY");
  });
  socket.on("TIMER-SET", (data) => {
    socket.broadcast.emit("TIMER-SET", data);
  });

  socket.on("TIMER-SYNC-REQ", () => {
    socket.broadcast.emit("TIMER-SYNC-REQ");
  });
  socket.on("TIMER-SYNC-RES", (data) => {
    socket.broadcast.emit("TIMER-SYNC-RES", data);
  });
  socket.on("SCORE-UPDATE", (data) => {
    socket.broadcast.emit("SCORE-UPDATE", data);
  });
  socket.on("TOGGLE-SCORES", () => {
    socket.broadcast.emit("TOGGLE-SCORES");
  });
  socket.on("TEAM-NAME-UPDATE", (data) => {
    socket.broadcast.emit("TEAM-NAME-UPDATE", data);
  });
  socket.on("TEAM-SHORTNAME-UPDATE", (data) => {
    socket.broadcast.emit("TEAM-SHORTNAME-UPDATE", data);
  });
  socket.on("PLAYER-NAME-UPDATE", (data) => {
    socket.broadcast.emit("TEAM-SHORTNAME-UPDATE", data);
  });
  socket.on("PLAYER-NUMBER-UPDATE", (data) => {
    socket.broadcast.emit("TEAM-SHORTNAME-UPDATE", data);
  });
  socket.on("SET-QUARTER", (data) => {
    console.log(data);
    socket.broadcast.emit("SET-QUARTER", data);
  });

  //Disconnection
  socket.on("disconnect", (reason) => {
    console.log(`SOCKET// Client disconnected: ${reason}`);
  });
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
  io.sockets.emit("CG-CONNECTED");
  sendMessage("INFO");
});

const casparDataHandler = (data) => {
  let dataAsString = data.toString().replace(/^[\s\t]*(\r\n|\n|\r)/gm, "");
  io.sockets.emit("CG-RECEIVED-DATA", dataAsString);
};

stream.on("error", (err) => {
  errorCount += 1;
  console.error(
    `CASPAR// Connection Attempt failed (${errorCount}) - ${err.code}`
  );
  io.sockets.emit("CG-CONNECTION-ERROR", errorCount);
});

stream.on("data", (data) => {
  casparDataHandler(data);
});

stream.on("close", launchIntervalConnect);
stream.on("end", launchIntervalConnect);

if (casperEnabled == "TRUE") casparConnect();

//Listening on port from env file - Specifying ipv4 use
server.listen(serverPort, "0.0.0.0", () => {
  console.log(
    ` -==-==- \n Express server running on port ${serverPort} \n -==-==- \n`
  );
});
