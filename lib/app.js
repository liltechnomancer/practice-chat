'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _rooms = require('./rooms');

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.argv[2] || 1337;
// import escapeHtml from './utils/escape-html'

var server = _http2.default.createServer(function (req, res) {});

server.listen(1337, function () {
  return console.log('listening on ' + PORT);
});

var clients = [];
var rooms = (0, _rooms.Rooms)();

var wss = new _ws2.default.Server({
  server: server
  // path: '/chat'
});

var onMessage = function onMessage(clients) {
  return function (message) {
    if (message.type === 'utf8') {
      console.log(message);
    }
  };
};

var greet = function greet(user) {
  return JSON.stringify({
    type: 'message',
    username: 'welcome bot',
    text: user + ' has joined the chat'
  });
};

var welcome = function welcome(user) {
  return function (client) {
    return client.send(greet(user));
  };
};

wss.on('connection', function (ws, req) {
  ws.on('message', function (message) {
    ws.id = 123;
    var msg = JSON.parse(message);
    console.log(msg);
    if (msg.type === 'message') wss.clients.forEach(function (x) {
      return x.send(JSON.stringify(msg));
    });
    if (msg.type === 'joinroom') rooms = rooms.map((0, _rooms.join)(msg.room.id)(ws));
    if (msg.type === 'userJoined') {
      rooms.map(function (x) {
        return (0, _ramda.map)(function (y) {
          return welcome(msg.username)(ws);
        }, x[1].sockets);
      });
    }
  });

  // connection.on('close', connection => {
  //   // close connection
  // })
});