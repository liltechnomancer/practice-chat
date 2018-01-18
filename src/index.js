import http from 'http'
import micro from 'micro'
// import escapeHtml from './utils/escape-html'
import WebSocket from 'ws'
import wsserver from './wss'
import { Rooms, join, leave } from './rooms'
import { map } from 'ramda'

const server = micro(async (req, res) => {})
const wss = new WebSocket.Server({
  server
})

wsserver(wss)
server.listen(3000)
module.exports = () => 'Hello, friend.'
