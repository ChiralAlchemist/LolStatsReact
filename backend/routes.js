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
  app.get('/api/gameInfo/:summonerName', function (req, res) {
    var summonerName = req.params.summonerName
    axios.get(`https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${summonerName}?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446`)
    .then(function (response) {
      var summonerId = response.data[summonerName.toLowerCase()].id
      return axios.get(`https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${summonerId}/recent?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446`)
    })
    .then(function (response) {
      var games = response.data.games
      console.log('made it here')
      var count = 0;
      return Promise.all(games.map(function (game) {
        return Promise.all(game.fellowPlayers.map(function (player){
          var summonerId = player.summonerId
          count++;
          console.log(count);
          return checkIfAlreadyHaveSummonerInfo(summonerId).
            then(function(dataBaseInfo) {
              if(dataBaseInfo === false) {
                return getSummonerName(summonerId)
                .then(saveUserToDb)
                .then(function (savedUser) {
                  return Promise.resolve(savedUser)
                })
              }
              return Promise.resolve(dataBaseInfo)
            })
        }))
      }))
      .then(function (result) {
        console.log('made it to this spot')
        return res.json({
          succuss: true,
          result: result
        })
      })
    })
  })
  function checkIfAlreadyHaveSummonerInfo (summonerId) {
    //var summonerId = req.params.summonerId;
    console.log("hello from checking the db")
    return app.mongoose.user.find({
      id: summonerId
    })
    .exec()
    .then(function (user) {
      console.log('got to the user')
      if(user.length) {
        return Promise.resolve(user[0])
      }
      return Promise.resolve(false)
    })
  }
  function saveUserToDb (user) {
    console.log('hello from save user to db')
    return new app.mongoose.user(user)
    .save()
    .then(function (savedUser) {
      console.log('succesfully saved user')
      return Promise.resolve(savedUser)
    })
  }
}
function getSummonerName (summonerId) {
  console.log('hello from get summoner name')
  return axios.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/"+ summonerId+ "?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446")
  .then(function (res){
    return Promise.resolve(res.data[summonerId])
  })
  .catch(function (err){
    var retryTime = err.headers['retry-after'] * 1000;
    var summonerId = err.config.url.match(/summoner\/\d+/g)[0].slice(9)
    console.log("rateLimit error for summonerId", summonerId)
    return new Promise(function (resolve, reject) {
      setTimeout(function (){
        resolve(getSummonerName(summonerId))
      }, retryTime)
    })
  })
}

module.exports = routes;
