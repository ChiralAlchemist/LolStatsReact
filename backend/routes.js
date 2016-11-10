const axios = require('axios');
const routes = function(app) {
  app.get('/test',function (req, res) {
    res.send('hello your routes work')
  })
  app.get('/summonerName/:summonerId', function (req, res) {
    var summonerId = req.params.summonerId;
    app.mongoose.user.find({
      id: summonerId
    })
    .exec()
    .then(function (user) {
      console.log(user)
      if(user.length) {
        return res.json({
          user: user
        })
      } else {
        console.log('hello')
        axios.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/"+ summonerId+ "?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446")
          .then(function (response) {
            console.log('response', response)
            new app.mongoose.user({
              id: summonerId,
              name: response.data[summonerId].name,
              summonerId: summonerId,
              summonerLevel: response.data[summonerId].summonerLevel,
              profileIconId: response.data[summonerId].profileIconId
            })
            .save()
            .then(function (savedUser) {
              console.log('asdfkljlj')
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
      //res.send(summonerId)
  })
}

module.exports = routes;
