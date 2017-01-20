import { connect } from 'react-redux'
const GameContainer = require('../components/GameContainer')
const { getGameData } = require('../actions/index.jsx')
const mapStateToProps = (state) => {
  return {
    games: state.games,
    highlightedPlayer: state.players.highlightedPlayer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerStats: (event) => {
      let {summonerName} = event
      dispatch(getGameData(summonerName))
      let path = `/summoner/${summonerName}`
      hashHistory.push(path)
    },
    handleInputChange: (event) => {
    }
  }
}

const VisibleGameContainer = connect(mapStateToProps, mapDispatchToProps)(GameContainer)

module.exports = VisibleGameContainer
