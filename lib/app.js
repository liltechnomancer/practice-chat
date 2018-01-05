'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import escapeHtml from './utils/escape-html'
var WebSocketServer = require('websocket').server;

var PORT = process.argv[2] || 1337;
var server = _http2.default.createServer(function (req, res) {});

server.listen(1337, function () {
  return console.log('listening on ' + PORT);
});

// const colors = ['red', 'green']
var clients = [];

var socketServer = new WebSocketServer({
  httpServer: server
});

var onMessage = function onMessage(clients) {
  return function (message) {
    if (message.type === 'utf8') {
      console.log(message);
    }
  };
};

socketServer.on('request', function (req) {
  var connection = req.accept(null, req.origin);
  console.log('connection from ' + req.origin);
  clients.push(connection);
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log(message);
      clients.map(function (x) {
        return x.sendUTF(JSON.stringify({ type: 'message', text: message.utf8Data }));
      });
    }
  });

  connection.on('close', function (connection) {
    // close connection
  });
});