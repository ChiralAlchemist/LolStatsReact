var mongoose = require('mongoose')

var loadSchema = function (app) {
  var userSchema = mongoose.Schema({
    name: String,
    id: Number,
    summonerId: Number,
    test: String
  })
  app.mongoose.user = mongoose.model('User', userSchema)
}

module.exports = loadSchema;
