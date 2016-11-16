const React = require('react')
// const GameCard = require('./GameCard.jsx')
// const fakeData = require('../../public/data/gameData.json')
const GameContainer = require('../containers/GameContainer.jsx')

const App = React.createClass({
  render () {
    console.log("this", this)
    return (
      <div className='app-container'>
        { console.log("this", this) }
        { this.props.children }

        <GameContainer />


      </div>
    )
  }
})

export default App
