const mongoose = require('mongoose')

const connect = db => mongoose.connect(db)
// connect('mongodb://localhost:27017/users')
const user = new mongoose.Schema({
  name: String,
  password: String,
  createdAt: Date,
  rooms: [String]
})

const find = (model, query) => {
  const _query = model.where(query)
  return _query.findOne()
}

const create = (model, object) => {
  const obj = new model(object)
  return obj.save()
}

const User = mongoose.model('User', user)

module.exports = {
  connect,
  User,
  find,
  create
}
