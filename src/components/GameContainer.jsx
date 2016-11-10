const React = require('react')
const GameCard = require('./GameCard.jsx')

const GameContainer = ({games}) => (
  <div className='container'>
    <h1> hello world  im here in real time</h1>
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
