import Rooms from '../src/rooms'

test('Allows rooms to be created and joined', () => {
  const rooms = Rooms()
  const newRoom = { id: 1, sockets: new Map() }
  expect(rooms.join(1, 'test')).toEqual(newRoom)
  rooms.join(1, 'test')
})
