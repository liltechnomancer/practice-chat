const Rooms = () => {
  const rooms = new Map()

  const makeRoom = id => {
    const room = {
      id,
      sockets: new Map()
    }
    rooms.set(id, room)
    return room
  }

  const getRoom = id => {
    const room = rooms.get(id)
    if (!room) return makeRoom(id)
    console.log('yay')
    return room
  }

  const join = (id, ws) => {
    const room = getRoom(id)
    return room
  }

  const leave = (opts, ws) => {}
  const message = (opts, ws) => {}

  return {
    join,
    leave,
    message
  }
}

export default Rooms
