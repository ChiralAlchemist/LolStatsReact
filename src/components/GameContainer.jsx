const React = require('react')
const GameCard = require('./GameCard.jsx')
const { Link } = require('react-router')

const GameContainer = ({games, highlightedPlayer}) => (
  <div className='container'>
    <li><Link to='/'> Back </Link></li>
    <div className='shows'>
    {
      games.map((game) => {
        return (<GameCard game={game} key={game.gameId} highlightedPlayer={highlightedPlayer} />)
      })
    }
    </div>
  </div>
)

GameContainer.propTypes = {
  games: React.PropTypes.array.isRequired,
  highlightedPlayer: React.PropTypes.string.isRequired
}

module.exports = GameContainer
