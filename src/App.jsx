var React = require('react')
var ReactDOM = require('react-dom')
const fakeData = require('../public/data/gameData.json')
var GameCard = require('./GameCard.jsx')
console.log(fakeData)
var App = React.createClass({
  render () {
    return (
      <div className='app-container'>
        <div className='container'>
          <h1> hello world  im here in real time</h1>
          <div className='shows'>
            {
              fakeData.games.map((game) => {
                return (<GameCard game={game} key={game.gameId} />)
              })
            }
          </div>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
