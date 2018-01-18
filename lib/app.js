// import http from 'http'
// // import escapeHtml from './utils/escape-html'
// import WebSocket from 'ws'
// import { Rooms, join, leave } from './rooms'
// import { map } from 'ramda'

// const PORT = process.argv[2] || 1337
// const server = http.createServer((req, res) => {})

// server.listen(1337, () => console.log('listening on ' + PORT))

// let clients = []
// let rooms = Rooms()

// const wss = new WebSocket.Server({
//   server
// })

// const onMessage = clients => message => {
//   if (message.type === 'utf8') {
//     console.log(message)
//   }
// }

// const greet = user =>
//   JSON.stringify({
//     type: 'message',
//     username: 'welcome bot',
//     text: `${user} has joined the chat`
//   })

// const welcome = user => client => client.send(greet(user))

// wss.on('connection', (ws, req) => {
//   ws.on('message', message => {
//     ws.id = 123
//     const msg = JSON.parse(message)
//     console.log(msg)
//     if (msg.type === 'message')
//       wss.clients.forEach(x => x.send(JSON.stringify(msg)))
//     if (msg.type === 'joinroom') rooms = rooms.map(join(msg.room.id)(ws))
//     if (msg.type === 'userJoined') {
//       rooms.map(x => map(y => welcome(msg.username)(ws), x[1].sockets))
//     }
//   })

//   ws.on('close', connection => {
//     // close connection
//     connection.close()
//   })
// })
"use strict";