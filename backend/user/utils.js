const axios = require('axios');
const _ = require("lodash");
var utils = function (app) {
  return {
    checkDbBatch: checkDbBatch,
    getSummonerId: getSummonerId,
    getSummonerNames: getSummonerNames,
    getSummonerName: getSummonerName,
    getSummonerNameBatch: getSummonerNameBatch,
    getRecentGames: getRecentGames,
    saveUserToDbBatch: saveUserToDbBatch
  }
  //////////////////////
  //////////////////////
  function checkDbBatch (playerIds){
    console.log('hello from checkDbBatch')
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
      return Promise.resolve(playerObj)
    })
    .catch(function (err){
      console.log('mistakes were made', err)
      return Promise.resolve({
        playerIds: playerIds,
        savedUsers: []
      })
    })
  }

  function getSummonerNames(playerIds) {
    var groups = []
    var self = this
    while(playerIds.length>40 || playerIds.length){
      if(playerIds.length>=40){
        groups.push(playerIds.splice(0,40))
      } else {
        groups.push(playerIds.splice(0, playerIds.length))
      }
    }

    return Promise.all(groups.map(function (group){
      return self.getSummonerNameBatch(group.join(','))
    }))
  }

  function getSummonerId (summonerName) {
      console.log('hello from getSummonerId', summonerName)
      return axios.get(`https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${summonerName}?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446`)
        .then(function (response){
          return response.data[summonerName.toLowerCase()].id
        })
        .catch(function (response){
          return 404;
        })

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

  function getRecentGames (summonerId) {
    console.log('hello from getRecentGames', summonerId)
    return axios.get(`https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${summonerId}/recent?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446`)
  }

 function saveUserToDbBatch (userColllection) {
   userColllection = Object.keys(userColllection).map(function (key, index) {
     return userColllection[key]
   })
   var userColllectionPromises = userColllection.map(function (user) {
     return app.mongoose.user.findOneAndUpdate({id :user.id}, user, {upsert: true, new: true})
       .then(function (savedUser) {
         return Promise.resolve(savedUser);
       })
       .catch(function (error) {
         console.log('error saving users', error, user)
         return Promise.resolve(user)
       })
   })
   return Promise.all(userColllectionPromises)
 }
}




module.exports = utils
