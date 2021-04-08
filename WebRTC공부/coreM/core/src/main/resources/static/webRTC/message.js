const socket = window.io();
var socket = new WebSocket('ws://localhost:8080/socket');

export const sendMessage = (type, payload) => socket.emit('message', {type, payload})
export const onMessage = (type, callback) => socket.on('message', message => message.type === type && callback(message.payload))