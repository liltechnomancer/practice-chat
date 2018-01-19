'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leave = exports.join = exports.Rooms = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _ramda = require('ramda');

const socketLens = (0, _ramda.lens)((0, _ramda.prop)('sockets'), (0, _ramda.assoc)('sockets'));

const Rooms = (rooms = {}) => {
  const map = fn => Rooms(fn(rooms));
  const chain = fn => fn(rooms);
  const id = _ => rooms;
  const get = (id, fn) => {
    const room = rooms[id];
    fn(room);
    return Rooms(rooms);
  };

  return {
    get,
    chain,
    map,
    id
  };
};

const makeRoom = id => {
  const room = {
    id,
    sockets: {}
  };
  return room;
};

const getRoom = (id, rooms) => {
  const room = rooms[id];
  if (!room) return makeRoom(id);
  return room;
};

const addWsToRoom = ws => sockets => _extends({}, sockets, { [ws.id]: ws });

const removeWsFromRoom = ws => sockets => (0, _ramda.omit)([ws.id], sockets);

const join = id => ws => rooms => {
  const room = getRoom(id, rooms);
  const updated = (0, _ramda.over)(socketLens, addWsToRoom(ws), room);
  return _extends({}, rooms, { [id]: updated });
};

const leave = id => ws => rooms => {
  const room = getRoom(id, rooms);
  const updated = (0, _ramda.over)(socketLens, removeWsFromRoom(ws), room);
  return _extends({}, rooms, { [id]: updated });
};

exports.default = Rooms;
exports.Rooms = Rooms;
exports.join = join;
exports.leave = leave;