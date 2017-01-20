const routes = function(app) {
  const axios = require('axios');
  const _ = require("lodash");
  const userStats = require('./user/userStats.js')(app)
  app.get('/users/clear',function (req, res) {
    app.mongoose.user.remove({})
    .then(function (users){
      return res.json({
        users: users
      })
    })
  })
  app.get('/users/viewAll',function (req, res) {
    app.mongoose.user.find({})
    .then(function (users){
      return res.json({
        users: users
      })
    })
  })
  app.get('/summonerName/:summonerId', function (req, res) {
    var summonerId = req.params.summonerId;
    app.mongoose.user.find({
      id: summonerId
    })
    .exec()
    .then(function (user) {
      if(user.length) {
        return res.json({
          user: user
        })
      } else {
        axios.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/"+ summonerId+ "?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446")
          .then(function (response) {
            new app.mongoose.user({
              id: summonerId,
              name: response.data[summonerId].name,
              summonerId: summonerId,
              summonerLevel: response.data[summonerId].summonerLevel,
              profileIconId: response.data[summonerId].profileIconId
            })
            .save()
            .then(function (savedUser) {
              res.json({
                savedUser: savedUser
              })
            })
            .catch(function (error){
              res.json({
                error: error
              })
            })
          })
      }
    })
  })
  app.get('/api/gameInfo/:summonerName', userStats.getStats)
}
module.exports = routes;
