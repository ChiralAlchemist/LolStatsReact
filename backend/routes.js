
const axios = require('axios');
const _ = require("lodash");
const routes = function(app) {
  app.get('/test',function (req, res) {
    app.mongoose.user.remove({})
    .then(function (users){
      return res.json({
        users: users
      })
    })
  })
  app.get('/test2',function (req, res) {
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
  })
  app.get('/api/gameInfo/:summonerName', function (req, res) {
    var summonerName = req.params.summonerName
    var gameInfo = {}
    axios.get(`https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${summonerName}?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446`)
    .then(function (response) {
      var summonerId = response.data[summonerName.toLowerCase()].id
      return axios.get(`https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${summonerId}/recent?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446`)
    })
    .then(function (response) {
      gameInfo = response.data
      var games = response.data.games
      console.log('made it here')
      var count = 0;
      var playerIds = [];
      games.forEach(function (game){
        game.fellowPlayers.forEach(function (player) {
          playerIds.push(player.summonerId)
        })
      })
      console.log(playerIds)
      checkDbBatch(playerIds)
        .then(function (dbResults) {
          gameInfo.dbResults = dbResults.savedUsers
          return  Promise.resolve(getSummonerNames(dbResults.playerIds))
        })
        .then(function (newUsers){
          return Promise.all(newUsers.map(function(newUsers) {
            return saveUserToDbBatch(newUsers)
          }))
        })
      // return Promise.all(games.map(function (game) {
      //   var playerIds = game.fellowPlayers.map(function (player) {
      //     return player.summonerId
      //   }).join(',')
      //   return checkDbBatch(playerIds)
      //   .then(getSummonerNameBatch)
      //   .then(saveUserToDbBatch)
      // }))
      .then(function (result) {
        console.log('made it to this spot', result)
        result = _.flatten(result)
        gameInfo.games.forEach(function (game) {
          game.fellowPlayers.forEach(function (player, index) {
            var playerWithName = _.find(gameInfo.dbResults, {id : player.summonerId}) || _.find(result, {id: player.summonerId})
            if(playerWithName) game.fellowPlayers[index] = _.defaults(player, playerWithName )
          })
        })
        //var i = getSummonerNames(result.playerIds)
        return res.json({
          succuss: true,
          result: result,
          gameInfo: gameInfo
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
  function checkDbBatch (playerIds){
    console.log('hello from checkDbBatch', playerIds)
    if(typeof playerIds === 'string'){
      playerIds = playerIds.split(',').map(function (id){
        return id * 1
      })
    }
    return app.mongoose.user.find({
      id: {
        "$in": playerIds
      }
    })
    .exec()
    .then(function (users){
      var playerObj = {
        playerIds: [],
        savedUsers: users
      }
      // find userid in db remove them from the playerIds given
      var userIds = users.map(function (user) {return user.id})
      playerObj.playerIds = _.difference(playerIds, userIds)
      console.log(playerObj)

      return Promise.resolve(playerObj)
    })
    .catch(function (err){
      console.log('mistakes were made', err)
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
  function saveUserToDbBatch (userColllection) {
    userColllection = Object.keys(userColllection).map(function (key, index) {
      return userColllection[key]
    })
    var userColllectionPromises = userColllection.map(function (user) {
      return app.mongoose.user.findOneAndUpdate({id :user.id}, user, {upsert: true, new: true})
        .then(function (savedUser) {
          console.log("savedUser", savedUser)
          return Promise.resolve(savedUser);
        })
    })
    return Promise.all(userColllectionPromises)
  }
}
function getSummonerName (summonerId) {
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
function getSummonerNameBatch (playerIds) {
  //given string of comma separated of playerIds
  //riot api can only take 40 ids at a time
  return axios.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/"+ playerIds+ "?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446")
  .then(function (res){
    return Promise.resolve(res.data)
  })
  .catch(function (err){
    var retryTime = err.headers['retry-after'] * 1000;
    var summonerId = err.config.url.match(/summoner\/\d+/g)[0].slice(9)
    console.log("rateLimit error for summonerId", playerIds)
    return new Promise(function (resolve, reject) {
      setTimeout(function (){
        resolve(getSummonerNameBatch(playerIds))
      }, retryTime)
    })
  })
}
function getSummonerNames(playerIds) {
  var groups = []
  if(playerIds.length>40){

    while(playerIds.length>40 || playerIds.length){
      if(playerIds.length>=40){
        groups.push(playerIds.splice(0,40))
      } else {
        groups.push(playerIds.splice(0, playerIds.length))
      }
    }
  }
  return Promise.all(groups.map(function (group){
    return getSummonerNameBatch(group.join(','))
  })
  )
}

module.exports = routes;
