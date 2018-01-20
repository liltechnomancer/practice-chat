const { User, create, find } = require('./wrapper')
const { secureStore } = require('../authentication/password')

const createUser = user => {
  const store = pass => create(User, { ...user, password: pass })
  secureStore(store, user.password)
}

const findUser = user => find(User, user)

module.exports = {
  createUser,
  findUser
}
