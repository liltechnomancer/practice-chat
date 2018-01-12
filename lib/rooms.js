'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leave = exports.join = exports.Rooms = undefined;

var _immutable = require('immutable');

var _ramda = require('ramda');

var socketLens = (0, _ramda.lens)((0, _ramda.prop)('sockets'), (0, _ramda.assoc)('sockets'));

var Rooms = function Rooms() {
  var rooms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();


  var map = function map(fn) {
    return Rooms(fn(rooms));
  };
  var chain = function chain(fn) {
    return fn(rooms);
  };
  var id = function id(_) {
    return rooms;
  };

  //TODO: Making Rooms monadic, message should be seperate.
  var message = function message(opts, ws) {};

  return {
    chain: chain,
    map: map,
    id: id
  };
};

var makeRoom = function makeRoom(id) {
  var room = {
    id: id,
    sockets: (0, _immutable.Map)()
  };
  return room;
};

var addWsToRoom = function addWsToRoom(ws, room) {
  return room.sockets.set(ws.id, ws);
};

var removeWsFromRoom = function removeWsFromRoom(ws, room) {
  return room.sockets.delete(ws.id, ws);
};

var getRoom = function getRoom(id, rooms) {
  var room = rooms.get(id);
  if (!room) return makeRoom(id);
  return room;
};

var join = function join(id) {
  return function (ws) {
    return function (rooms) {
      var room = getRoom(id, rooms);
      return (0, _ramda.set)(socketLens, addWsToRoom(ws, room), room);
    };
  };
};

var leave = function leave(id) {
  return function (ws) {
    return function (rooms) {
      var room = getRoom(id, rooms);
      return (0, _ramda.set)(socketLens, removeWsFromRoom(ws, room), room);
    };
  };
};

exports.default = Rooms;
exports.Rooms = Rooms;
exports.join = join;
exports.leave = leave;