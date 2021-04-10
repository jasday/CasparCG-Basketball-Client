//imports




//Server initialisation
const express = require("express");
const app = express();


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
/*io.on("connection", (socket) => {
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
});*/


//Listening on port from env file - Specifying ipv4 use
server.listen(serverPort, "0.0.0.0", () => {
  console.log(
    ` -==-==- \n Express server running on port ${serverPort} \n -==-==- \n`
  );
});
