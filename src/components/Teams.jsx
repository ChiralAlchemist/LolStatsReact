const React = require('react')
const { object, arrayOf } = React.PropTypes
const MiniPlayer = require('./MiniPlayer.jsx')
const Teams = React.createClass({
  propTypes: {
    redSide: arrayOf(object),
    blueSide: arrayOf(object)
  },
  render () {
    let playersTeam = this.props.redSide
    let opposingTeam = this.props.blueSide
    return (
      <div className='teams'>
        <div className='playerTeam'>
        {playersTeam.map((player) => {
          return <MiniPlayer player={player} />
        })
        }
        </div>
        <div className='opposingTeam'>
        {opposingTeam.map((player) => {
          return <MiniPlayer player={player} />
        })
        }
        </div>
      </div>
    )
  }
})

module.exports = Teams
