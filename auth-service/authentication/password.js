const { hash, compare } = require('bcrypt')
const { curryN } = require('ramda')

const SALT_ROUNDS = 10
const check = curryN(2, compare)

const secureStore = (store, password) => {
  return hash(password, SALT_ROUNDS).then(store)
}

const checkPass = (retrieve, password) => {
  return retrieve().then(check(password))
}

module.exports = {
  hash,
  checkPass,
  secureStore
}
