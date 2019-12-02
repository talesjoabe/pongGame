// serial connection
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyUSB0');
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// socket server
var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log('My socket server is running');

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection: ' + socket.id);
  // socket.on('recv', fnc);

  parser.on('data', printInfo);
  function printInfo(data) {
    io.sockets.emit('recv', data);
    // console.log(data);
  }
}
