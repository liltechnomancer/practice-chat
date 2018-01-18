import http from 'http'
import micro from 'micro'
// import escapeHtml from './utils/escape-html'
import WebSocket from 'ws'
import wsserver from './wss'
import { Rooms, join, leave } from './rooms'
import { map } from 'ramda'

const PORT = process.argv[2] || 1337
const server = micro(async (req, res) => {
  console.log('is this thing on')
})
let clients = []
let rooms = Rooms()

const wss = new WebSocket.Server({
  server
})

const onMessage = clients => message => {
  if (message.type === 'utf8') {
    console.log(message)
  }
}

wsserver(wss)
server.listen(1337)
module.exports = () => 'Welcome to Micro'
