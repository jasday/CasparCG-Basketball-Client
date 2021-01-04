import { io } from "socket.io-client";

const ENDPOINT = `${process.env.REACT_APP_SOCKETIO_SERVER}:${process.env.REACT_APP_SOCKETIO_PORT}`;

//SocketIO connection
const socket = io(ENDPOINT);

export default socket;
