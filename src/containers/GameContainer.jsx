import { connect } from 'react-redux'
const GameContainer = require('../components/GameContainer')

const mapStateToProps = (state) => {
  return {
    games: state.games
  }
}

const VisibleGameContainer = connect(mapStateToProps)(GameContainer)

module.exports = VisibleGameContainer
