const { connect } = require('./database/wrapper')
connect('mongodb://localhost:27017/users')
const { createUser, findUser } = require('./database/user')
const micro = require('micro')
const { router, get } = require('microrouter')
const send = micro.send

// createUser({ name: 'Alex', password: 'pass' })
// find(User, { name: 'Alex' }).then(console.log)
// create(User, { name: 'Levi' })

const hello = (req, res) =>
  findUser({ name: req.params.who }).then(user =>
    send(res, 200, `Hello, ${user.name}`)
  )

const server = router(get('/hello/:who', hello))

micro(server).listen(3000)

module.exports = server
