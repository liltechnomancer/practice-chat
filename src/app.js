import http from 'http'
// import escapeHtml from './utils/escape-html'
import WebSocket from 'ws'

const PORT = process.argv[2] || 1337
const server = http.createServer((req, res) => {})

server.listen(1337, () => console.log('listening on ' + PORT))

let clients = []

const wss = new WebSocket.Server({
  server
  // path: '/chat'
})

const onMessage = clients => message => {
  if (message.type === 'utf8') {
    console.log(message)
  }
}

wss.on('connection', (ws, req) => {
  ws.on('message', message => {
    const msg = JSON.parse(message)
    console.log(msg)
    if (msg.type === 'message')
      wss.clients.forEach(x => x.send(JSON.stringify(msg)))
    if (msg.type === 'userJoined') {
      wss.clients.forEach(x =>
        x.send(
          JSON.stringify({
            type: 'message',
            username: 'bot',
            text: `${msg.username} has joined the chat!`
          })
        )
      )
    }
  })

  // connection.on('close', connection => {
  //   // close connection
  // })
})
