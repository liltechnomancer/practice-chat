'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leave = exports.join = exports.Rooms = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _ramda = require('ramda');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var socketLens = (0, _ramda.lens)((0, _ramda.prop)('sockets'), (0, _ramda.assoc)('sockets'));

var Rooms = function Rooms() {
  var rooms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var map = function map(fn) {
    return Rooms(fn(rooms));
  };
  var chain = function chain(fn) {
    return fn(rooms);
  };
  var id = function id(_) {
    return rooms;
  };

  return {
    chain: chain,
    map: map,
    id: id
  };
};

var makeRoom = function makeRoom(id) {
  var room = {
    id: id,
    sockets: {}
  };
  return room;
};

var getRoom = function getRoom(id, rooms) {
  var room = rooms[id];
  if (!room) return makeRoom(id);
  return room;
};

var addWsToRoom = function addWsToRoom(ws) {
  return function (sockets) {
    return _extends({}, sockets, _defineProperty({}, ws.id, ws));
  };
};

var removeWsFromRoom = function removeWsFromRoom(ws) {
  return function (sockets) {
    return (0, _ramda.omit)([ws.id], sockets);
  };
};

var join = function join(id) {
  return function (ws) {
    return function (rooms) {
      var room = getRoom(id, rooms);
      var updated = (0, _ramda.over)(socketLens, addWsToRoom(ws), room);
      return _extends({}, rooms, _defineProperty({}, id, updated));
    };
  };
};

var leave = function leave(id) {
  return function (ws) {
    return function (rooms) {
      var room = getRoom(id, rooms);
      var updated = (0, _ramda.over)(socketLens, removeWsFromRoom(ws), room);
      return _extends({}, rooms, _defineProperty({}, id, updated));
    };
  };
};

exports.default = Rooms;
exports.Rooms = Rooms;
exports.join = join;
exports.leave = leave;