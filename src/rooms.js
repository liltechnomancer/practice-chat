import { Map } from 'immutable'
import { lens, prop, assoc, set, over, omit } from 'ramda'

const socketLens = lens(prop('sockets'), assoc('sockets'))

const Rooms = (rooms = {}) => {

  const map = (fn) => Rooms(fn(rooms))
  const chain = fn => fn(rooms)
  const id = _ => rooms

  return {
    chain,
    map,
    id 
  }
}

const makeRoom = id => {
  const room = {
    id,
    sockets: {} 
  }
  return room
}

const getRoom = (id, rooms) => {
  const room = rooms[id]
  if (!room) return makeRoom(id)
  return room
}

const addWsToRoom = ws => sockets => 
 ({ ...sockets, [ws.id]: ws })

const removeWsFromRoom = ws => sockets => 
  omit([ws.id], sockets) 

const join = id => ws => rooms => {
  const room = getRoom(id, rooms)
  const updated = over(socketLens, addWsToRoom(ws), room)
  return { ...rooms, [id]: updated }
}

const leave = id => ws => rooms => {
  const room = getRoom(id, rooms)
  const updated = over(socketLens, removeWsFromRoom(ws), room)
  return { ...rooms, [id]: updated }
}

export default Rooms

export {
  Rooms,
  join,
  leave
}

