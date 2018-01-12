import { Map } from 'immutable'
import { lens, prop, assoc, set } from 'ramda'

const socketLens = lens(prop('sockets'), assoc('sockets'))

const Rooms = (rooms = Map()) => {


  const map = (fn) => Rooms(fn(rooms))
  const chain = fn => fn(rooms)
  const id = _ => rooms

  //TODO: Making Rooms monadic, message should be seperate.
  const message = (opts, ws) => {}

  return {
    chain,
    map,
    id 
  }
}

const makeRoom = id => {
  const room = {
    id,
    sockets: Map()
  }
  return room
}

const addWsToRoom = (ws, room) => 
  room.sockets.set(ws.id, ws)

const removeWsFromRoom = (ws, room) => 
  room.sockets.delete(ws.id, ws)

const getRoom = (id, rooms) => {
  const room = rooms.get(id)
  if (!room) return makeRoom(id)
  return room
}

const join = id => ws => rooms => {
  const room = getRoom(id, rooms)
  return set(socketLens, addWsToRoom(ws, room), room)
}

const leave = id => ws => rooms => {
  const room = getRoom(id, rooms)
  return set(socketLens, removeWsFromRoom(ws, room), room)
}

export default Rooms

export {
  Rooms,
  join,
  leave
}

