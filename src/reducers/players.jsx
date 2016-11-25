const { hashHistory } = require('react-router')
const initalState = {
  highlightedPlayer: "0"
}
const players = (state = initalState, action) => {
  console.log('players Action', action)
  let handlers = {
    CHANGE_SUMMONER_NAME: function (state, action) {
      console.log('action', action)
      let nextState = Object.assign({}, state, {
        highlightedPlayer: action.summonerName
      })
      console.log('nextState', nextState)
      let path = `/summoner/${action.summonerName}`
      hashHistory.push(path)
      return nextState
    }
  }

  return handlers[action.type] ? handlers[action.type](state, action) : state
}

module.exports = players
