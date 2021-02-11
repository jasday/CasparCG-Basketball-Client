import { io } from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3005";

//SocketIO connection
const socket = io(ENDPOINT);

export default socket;
