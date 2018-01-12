import Rooms from '../src/rooms'
import { Map } from 'immutable'

test('Allows rooms to be created and joined', () => {
  const rooms = Rooms()
  const ws = { id: 1 }
  const newRoom = { id: 1, sockets: Map().set(ws.id, ws) }
  const emptyRoom = { id: 1, sockets: Map() }
  expect(rooms.join(1, ws).rooms).toEqual(newRoom)
  expect(rooms.leave(1, ws).rooms).toEqual(emptyRoom)
  rooms.join(1, 'test')
})
