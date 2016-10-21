const React = require('react')
const { object, arrayOf } = React.PropTypes
const { getChampionName } = require('./riotUtilityFunctions.jsx')

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
          return (
            <div key={player.summonerId} >
              <img className='miniChampionPic' src={'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/' + getChampionName(player.championId) + '.png'} />
              <div > {player.summonerId} </div>
            </div>
          )
        })
        }
        </div>
        <div className='opposingTeam'>
        {opposingTeam.map((player) => {
          return (
            <div key={player.summonerId} >
              <img className='miniChampionPic' src={'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/' + getChampionName(player.championId) + '.png'} />
              <div> {player.summonerId} </div>
            </div>
          )
        })
        }
        </div>
      </div>
    )
  }
})

module.exports = Teams
