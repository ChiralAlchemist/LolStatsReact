const { connect } = require('react-redux')
const Landing = require('../components/Landing.jsx')
const { changeHighlightedSummoner } = require('../actions/index.jsx')

const mapStateToProps = (state) => {
  return { hp: state.players.highlightedPlayer }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerStats: (event) => {

      console.log('event', event)
      let {summonerName} = event
      dispatch(changeHighlightedSummoner(summonerName))
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
