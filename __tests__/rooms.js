import { Rooms, join, leave } from '../src/rooms'
import { Map } from 'immutable'

test('Allows rooms to be created and joined, as well as left.', () => {
  const rooms = Rooms()
  const ws = { id: 1 }
  const newRoom = { id: 1, sockets: Map().set(ws.id, ws) }
  const emptyRoom = { id: 1, sockets: Map() }
  const joinOne = join(1)
  const leaveOne = leave(1)
  expect(rooms.map(joinOne(ws)).id()).toEqual(newRoom)
  expect(rooms.map(leaveOne(ws)).id()).toEqual(emptyRoom)
})
