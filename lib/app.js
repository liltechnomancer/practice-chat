'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.argv[2] || 1337;
// import escapeHtml from './utils/escape-html'

var server = _http2.default.createServer(function (req, res) {});

server.listen(1337, function () {
  return console.log('listening on ' + PORT);
});

var clients = [];

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

wss.on('connection', function (ws, req) {
  ws.on('message', function (message) {
    var msg = JSON.parse(message);
    console.log(msg);
    if (msg.type === 'message') wss.clients.forEach(function (x) {
      return x.send(JSON.stringify(msg));
    });
    if (msg.type === 'userJoined') {
      wss.clients.forEach(function (x) {
        return x.send(JSON.stringify({
          type: 'message',
          username: 'bot',
          text: msg.username + ' has joined the chat!'
        }));
      });
    }
  });

  // connection.on('close', connection => {
  //   // close connection
  // })
});