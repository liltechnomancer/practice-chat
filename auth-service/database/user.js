const { User, create, find, get } = require('./wrapper')
const { secureStore } = require('../authentication/password')

const _find = find(User)

const createUser = user => {
  const store = pass => create(User, { ...user, password: pass })
  return secureStore(store, user.password)
}

const findUser = find(User)
const getUser = () => get(User)

module.exports = {
  createUser,
  findUser,
  getUser
}
