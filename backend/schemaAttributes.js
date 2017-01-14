var mongoose = require('mongoose')

var loadSchema = function (app) {
  var userSchema = mongoose.Schema({
    name: String,
    id: Number,
    summonerId: Number,//{ type: Number, unqiue: true, required: true },
    summonerLevel: Number,
    profileIconId: Number
  })
  app.mongoose.user = mongoose.model('User', userSchema)
}

module.exports = loadSchema;
