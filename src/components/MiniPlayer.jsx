const React = require('react')
const { getChampionName } = require('./riotUtilityFunctions.jsx')
const MiniPlayer = React.createClass({
  propTypes: {
    player: React.PropTypes.object.isRequired
  },
  render () {
    var name = this.props.player.name
    if (name.length > 10) {
      name = name.slice(0, 9) + '...'
    }
    return (
      <div key={this.props.player.summonerId} >
        <img className='miniChampionPic' src={'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/' + getChampionName(this.props.player.championId) + '.png'} />
        <div key={this.props.player.summonerId}> {name} </div>
      </div>
    )
  }
})

module.exports = MiniPlayer
