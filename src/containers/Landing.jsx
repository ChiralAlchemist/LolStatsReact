const { connect } = require('react-redux')
const Landing = require('../components/Landing.jsx')
const { changeHighlightedSummoner, getGameData } = require('../actions/index.jsx')
const { hashHistory } = require('react-router')

const mapStateToProps = (state) => {
  return { hp: state.players.highlightedPlayer }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerStats: (event) => {

      console.log('event', event)
      let {summonerName} = event
      //getGameData(summonerName)
      dispatch(getGameData(summonerName))
      let path = `/summoner/${summonerName}`
      hashHistory.push(path)
      console.log('hashHistory', hashHistory)
    },
    handleInputChange: (event) => {

      console.log('event', event)
      //dispatch(changeHighlightedSummoner())
    }
  }
}

const VisableLanding = connect(mapStateToProps, mapDispatchToProps)(Landing)
console.log('VisableLanding', VisableLanding)
module.exports = VisableLanding
