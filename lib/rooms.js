'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Rooms = function Rooms() {
  var rooms = new Map();

  var makeRoom = function makeRoom(id) {
    var room = {
      id: id,
      sockets: new Map()
    };
    rooms.set(id, room);
    return room;
  };

  var getRoom = function getRoom(id) {
    var room = rooms.get(id);
    if (!room) return makeRoom(id);
    console.log('yay');
    return room;
  };

  var join = function join(id, ws) {
    var room = getRoom(id);
    return room;
  };

  var leave = function leave(opts, ws) {};
  var message = function message(opts, ws) {};

  return {
    join: join,
    leave: leave,
    message: message
  };
};

exports.default = Rooms;