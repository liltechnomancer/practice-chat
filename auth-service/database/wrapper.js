const mongoose = require('mongoose')
const { curry } = require('ramda')

const connect = db => mongoose.connect(db)

const user = {
  name: String,
  password: String,
  createdAt: Date,
  rooms: [String]
}

const find = curry((model, query) => {
  const _query = model.where(query)
  return _query.findOne()
})

const create = curry((model, object) => {
  const obj = new model(object)
  return obj.save()
})

const get = model => model.find()

const User = mongoose.model('User', user)

module.exports = {
  connect,
  User,
  find,
  get,
  create
}
