//const fakeData = require('../../public/data/gameData.json')
// fakeData.games
const { hashHistory } = require('react-router')
const games = (state = [], action) => {
  let handlers = {
    CHANGE_GAMES: function (state, action) {
      return action.newGames
    }
  }

  return handlers[action.type] ? handlers[action.type](state, action) : state
}

module.exports = games
