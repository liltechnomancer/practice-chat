'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _ramda = require('ramda');

var socketLens = (0, _ramda.lens)((0, _ramda.prop)('sockets'), (0, _ramda.assoc)('sockets'));

var Rooms = function Rooms() {
  var rooms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();


  var makeRoom = function makeRoom(id) {
    var room = {
      id: id,
      sockets: (0, _immutable.Map)()
    };
    return room;
  };

  var getRoom = function getRoom(id) {
    var room = rooms.get(id);
    if (!room) return makeRoom(id);
    return room;
  };

  var addWsToRoom = function addWsToRoom(ws, room) {
    return room.sockets.set(ws.id, ws);
  };

  var removeWsFromRoom = function removeWsFromRoom(ws, room) {
    return room.sockets.delete(ws.id, ws);
  };

  //TODO: Rooms should be a monad & join and leave should be passed into flatMap/chain.
  var join = function join(id, ws) {
    var room = getRoom(id);
    return Rooms((0, _ramda.set)(socketLens, addWsToRoom(ws, room), room));
  };

  var leave = function leave(id, ws) {
    var room = getRoom(id);
    return Rooms((0, _ramda.set)(socketLens, removeWsFromRoom(ws, room), room));
  };

  var message = function message(opts, ws) {};

  return {
    join: join,
    leave: leave,
    message: message,
    rooms: rooms
  };
};

exports.default = Rooms;