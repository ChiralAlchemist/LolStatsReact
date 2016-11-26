const { connect } = require('react-redux')
const Landing = require('../components/Landing.jsx')
const { getGameData } = require('../actions/index.jsx')
const { hashHistory } = require('react-router')

const mapStateToProps = (state) => {
  return { hp: state.players.highlightedPlayer }
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

const VisableLanding = connect(mapStateToProps, mapDispatchToProps)(Landing)
module.exports = VisableLanding
