import socketIOClient from 'socket.io-client';
const PORT = 8080;
const socket = socketIOClient(`http://localhost:${PORT}`);
export default socket;
