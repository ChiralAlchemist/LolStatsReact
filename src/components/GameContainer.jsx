const React = require('react')
const GameCard = require('./GameCard.jsx')
const { Link } = require('react-router')

const GameContainer = ({games}) => (
  <div className='container'>
    <li><Link to='/land'> hello world  im here in real time</Link></li>
    <div className='shows'>
    {
      games.map((game) => {
        return (<GameCard game={game} key={game.gameId} />)
      })
    }
    </div>
  </div>
)

GameContainer.propTypes = {
  games: React.PropTypes.array.isRequired
}

module.exports = GameContainer
