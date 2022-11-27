import socketIOClient from 'socket.io-client';
const PORT = 8080;
const socket = socketIOClient(`http://192.168.106.44:${PORT}`);
export default socket;
