import http from 'http'

// import escapeHtml from './utils/escape-html'
const WebSocketServer = require('websocket').server

const PORT = process.argv[2] || 1337
const server = http.createServer((req, res) => {})

server.listen(1337, () => console.log('listening on ' + PORT))

// const colors = ['red', 'green']
let clients = []

const socketServer = new WebSocketServer({
  httpServer: server
})

const onMessage = clients => message => {
  if (message.type === 'utf8') {
    console.log(message)
  }
}

socketServer.on('request', req => {
  const connection = req.accept(null, req.origin)
  console.log(`connection from ${req.origin}`)
  clients.push(connection)
  connection.on('message', message => {
    if (message.type === 'utf8') {
      const msg = JSON.parse(message.utf8Data)
      console.log(msg)
      if (msg.type === 'message')
        clients.map(x => x.sendUTF(JSON.stringify(msg)))
      if (msg.type === 'userJoined')
        clients.map(x =>
          x.sendUTF(
            JSON.stringify({
              type: 'message',
              username: 'bot',
              text: `${msg.username} has joined the chat!`
            })
          )
        )
    }
  })

  connection.on('close', connection => {
    // close connection
  })
})
