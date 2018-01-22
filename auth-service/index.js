const { connect } = require('./database/wrapper')
const { getUser, createUser, findUser } = require('./database/user')
const micro = require('micro')
const { router, get, post } = require('microrouter')
const send = micro.send
const json = micro.json

connect('mongodb://localhost:27017/users')

const create = (req, res) => {
  return json(req)
    .then(createUser)
    .then(body => send(res, 200, body))
}

const hello = (req, res) =>
  findUser({ name: req.params.who }).then(user =>
    send(res, 200, `Hello, ${user.name}`)
  )

const fetch = (req, res) => getUser().then(data => send(res, 200, data))

const server = router(
  get('/hello/:who', hello),
  post('/sign-up/', create),
  get('/users/', fetch)
)

micro(server).listen(3000)

module.exports = server
