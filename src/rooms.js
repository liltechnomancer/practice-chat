import { Map } from 'immutable'
import { lens, prop, assoc, set } from 'ramda'

const socketLens = lens(prop('sockets'), assoc('sockets'))

const Rooms = (rooms = Map()) => {

  const makeRoom = id => {
    const room = {
      id,
      sockets: Map()
    }
    return room
  }

  const getRoom = id => {
    const room = rooms.get(id)
    if (!room) return makeRoom(id)
    return room
  }

  const addWsToRoom = (ws, room) => 
    room.sockets.set(ws.id, ws)

  const removeWsFromRoom = (ws, room) => 
    room.sockets.delete(ws.id, ws)


  //TODO: Rooms should be a monad & join and leave should be passed into flatMap/chain.
  const join = (id, ws) => {
    const room = getRoom(id)
    return Rooms(set(socketLens, addWsToRoom(ws, room), room))
  }

  const leave = (id, ws) => {
    const room = getRoom(id)
    return Rooms(set(socketLens, removeWsFromRoom(ws, room), room))
  }

  const message = (opts, ws) => {}

  return {
    join,
    leave,
    message,
    rooms
  }
}

export default Rooms
