import { io } from "socket.io-client";

//const ENDPOINT = `${process.env.REACT_APP_SOCKETIO_SERVER}:${process.env.REACT_APP_SOCKETIO_PORT}`;
const ENDPOINT = "127.0.0.1:3005";
//SocketIO connection

const socket = io(ENDPOINT);

export default socket;
