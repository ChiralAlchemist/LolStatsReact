const { connect } = require('react-redux')
const Landing = require('../components/Landing.jsx')
const { changeHighlightedSummoner } = require('../actions/index.jsx')

console.log('landing', Landing)
const mapStateToProps = (state) => {
  console.log('state', state)
  return { hp: state.players.highlightedPlayer }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSummonerStats: (summonerName) => {
      dispatch(changeHighlightedSummoner(summonerName))
    }
  }
}

const VisableLanding = connect(mapStateToProps)(Landing)
console.log('VisableLanding', VisableLanding)
export default VisableLanding
