'use strict';

var _rooms = require('./rooms');

var _ramda = require('ramda');

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let rooms = (0, _rooms.Rooms)();
const clients = [];

const greet = user => JSON.stringify({
  type: 'message',
  username: 'Welcome bot',
  text: `${user} has joined the chat`
});

const welcome = user => client => client.send(greet(user));

module.exports = wss => {
  wss.on('connection', (ws, req) => {
    ws.id = (0, _v2.default)();
    clients.push(ws);
    ws.on('message', message => {
      const msg = JSON.parse(message);
      console.log(msg);
      if (msg.type === 'message') rooms.get(msg.room, room => (0, _ramda.map)(x => x.send(JSON.stringify(msg)), room.sockets));
      if (msg.type === 'joinroom') {
        welcome(msg.username)(ws);
        rooms = rooms.map((0, _rooms.join)(msg.room)(ws));
      }
      if (msg.type === 'userJoined') {
        rooms.map(x => (0, _ramda.map)(y => welcome(msg.username)(ws), x[msg.room].sockets));
      }
    });

    ws.on('close', connection => {
      connection.close();
    });
  });
};