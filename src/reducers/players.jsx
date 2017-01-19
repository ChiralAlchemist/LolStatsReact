const initalState = {
  highlightedPlayer: '0'
}
const players = (state = initalState, action) => {
  console.log('players Action', action)
  let handlers = {
    CHANGE_SUMMONER_NAME: function (state, action) {
      let nextState = Object.assign({}, state, {
        highlightedPlayer: action.summonerName
      })
      return nextState
    }
  }

  return handlers[action.type] ? handlers[action.type](state, action) : state
}

module.exports = players
