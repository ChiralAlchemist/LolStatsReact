const axios = require('axios');
const _ = require("lodash");

const userStats = function (app) {
  const userUtils = require('./utils')(app)
  return {
    getStats :function (req, res) {
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
        var count = 0;
        var playerIds = [];
        games.forEach(function (game){
          game.fellowPlayers.forEach(function (player) {
            playerIds.push(player.summonerId)
          })
        })
        userUtils.checkDbBatch(playerIds)
          .then(function (dbResults) {
            gameInfo.dbResults = dbResults.savedUsers
            return  Promise.resolve(userUtils.getSummonerNames(dbResults.playerIds))
          })
          .then(function (newUsers){
            return Promise.all(newUsers.map(function(newUsers) {
              return userUtils.saveUserToDbBatch(newUsers)
            }))
          })
        .then(function (result) {
          result = _.flatten(result)
          gameInfo.games.forEach(function (game, gameIndex) {
            game.fellowPlayers.forEach(function (player, index) {
              var playerWithName = _.find(gameInfo.dbResults, {id : player.summonerId}) || _.find(result, {id: player.summonerId})
              playerWithName = playerWithName || {}
              var name = playerWithName.name
              var profileIconId = playerWithName.profileIconId
              var summonerLevel = playerWithName.summonerLevel
              gameInfo.games[gameIndex].fellowPlayers[index].name = name
              gameInfo.games[gameIndex].fellowPlayers[index].profileIconId = profileIconId
              gameInfo.games[gameIndex].fellowPlayers[index].summonerLevel = summonerLevel
            })
          })
          return res.json({
            succuss: true,
            result: result,
            gameInfo: gameInfo
          })
        })
      })
    }
  }
}
module.exports = userStats
