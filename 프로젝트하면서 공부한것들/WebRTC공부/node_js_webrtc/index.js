'use strict';

var os = require('os');
var nodeStatic = require('node-static');

//var http = require('http');
var socketIO = require('socket.io');

const https = require('https');
const fs = require('fs');
const { request } = require('http');

const options = {
  key: fs.readFileSync('./private.pem'),
  cert: fs.readFileSync('./public.pem')
};

var fileServer = new(nodeStatic.Server)();
let app = https.createServer(options,(req,res)=>{
  // console.log(fileServer)
  fileServer.server(req,res);
}).listen(3000);

console.log('Started chating server...');

// var app = http.createServer(function(req, res) {
//   fileServer.serve(req, res);
// }).listen(8080);

var io = socketIO.listen(app);

io.sockets.on('connection', function(socket) {

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);

    if (message==="bye" && socket.rooms['kihyun']) {
      io.of('/').in('kihyun').clients((error, socketIds) => {
        if (error) throw error;

        socketIds.forEach(socketId => {
          io.sockets.sockets[socketId].leave('kihyun');
        });
      });
    }


    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    console.log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    console.log(io.sockets.adapter)
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    console.log('Room ' + room + ' now has ' + numClients + ' client(s)');

    // if (numClients === 0){
    //   socket.join(room);
    //   console.log('Client ID ' + socket.id + ' created room ' + room);
    //   socket.emit('created', room, socket.id);
    //   console.log('created');
    // }
    // else if (numClients === 1){
    //   console.log('Client ID ' + socket.id + ' joined room ' + room);
    //   io.sockets.in(room).emit('join',room);
    // }
    // else if(numClients === 2){
    //   io.sockets.in(room).emit('join',room);
    //   socket.join(room);
    //   socket.emit('joined',room,socket.id);
    //   io.sockets.in(room).emit('ready');
    //   console.log('joined');
    // }
    if (numClients === 0) {
      socket.join(room);
      console.log('Client ID ' + socket.id + ' created room ' + room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);
      console.log('created');

    } else if (numClients === 1 || numClients === 2) {
      console.log('Client ID ' + socket.id + ' joined room ' + room);
      console.log('numClients ' + numClients)
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
      console.log('joined')
    } else { // max two clients
      console.log('full room ' + room);
      socket.emit('full', room);
    }
  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });

});
