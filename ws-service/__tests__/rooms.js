import { Rooms, join, leave } from '../src/rooms'
import { Map } from 'immutable'

test('Allows rooms to be created and joined, as well as left.', () => {
  let rooms = Rooms()
  const ws = { id: 1 }
  const newRoom = { id: 1, sockets: { 1: ws }}
  const emptyRoom = { id: 1, sockets: {} }
  const joinOne = join(1)
  const leaveOne = leave(1)


  // Rooms must be reassigned to persist.
  expect(rooms.map(joinOne(ws)).id()).toEqual({1:newRoom})
  expect(rooms.id()).toEqual({})
  rooms = rooms.map(joinOne(ws))
  expect(rooms.id()).toEqual({1:newRoom})

  expect(rooms.map(leaveOne(ws)).id()).toEqual({1:emptyRoom})
})
