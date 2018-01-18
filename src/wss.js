import { Rooms, join, leave } from './rooms'
import { map } from 'ramda'
import uuid from 'uuid/v1'

let rooms = Rooms()
const clients = []

const greet = user =>
  JSON.stringify({
    type: 'message',
    username: 'Welcome bot',
    text: `${user} has joined the chat`
  })

const welcome = user => client => client.send(greet(user))

module.exports = wss => {
  wss.on('connection', (ws, req) => {
    ws.id = uuid()
    clients.push(ws)
    ws.on('message', message => {
      const msg = JSON.parse(message)
      console.log(msg)
      if (msg.type === 'message')
        rooms.get(msg.room, room =>
          map(x => x.send(JSON.stringify(msg)), room.sockets)
        )
      if (msg.type === 'joinroom') {
        welcome(msg.username)(ws)
        rooms = rooms.map(join(msg.room)(ws))
      }
      if (msg.type === 'userJoined') {
        rooms.map(x => map(y => welcome(msg.username)(ws), x[msg.room].sockets))
      }
    })

    ws.on('close', connection => {
      connection.close()
    })
  })
}
