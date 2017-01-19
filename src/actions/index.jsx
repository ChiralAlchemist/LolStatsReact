const axios = require('axios')
export const changeHighlightedSummoner = (summonerName) => {
  return {
    type: 'CHANGE_SUMMONER_NAME',
    summonerName: summonerName
  }
}
export const changeGames = (games) => {
  return {
    type: 'CHANGE_GAMES',
    newGames: games
  }
}
export const convertSummonerNameToId = (summonerName) => {
  return axios.get(`https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${summonerName}?api_key=ff62241d-f02d-443b-8309-c4b10a4bc446`)
}

export const getGameData = (summonerName) => {
  return function (dispatch) {
    dispatch(changeHighlightedSummoner(summonerName))
    return axios.get(`/api/gameInfo/${summonerName}`)
      .then(function (response) {
        let games = response.data.gameInfo.games
        dispatch(changeGames(games))
      })
  }
}
