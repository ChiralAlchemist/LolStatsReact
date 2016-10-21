const React = require('react')
const ChampionData = require('../public/data/championData.json').data
const ItemTable = require('./ItemTable.jsx')
const Teams = require('./Teams.jsx')
const _ = require('lodash')
const { object, shape, number, array } = React.PropTypes

const GameCard = React.createClass({
  propTypes: {
    game: shape({
      championId: number,
      fellowPlayers: array,
      stats: object
    })
  },
  getChampionName (id) {
    var champion = _.find(ChampionData, {'key': id.toString()})
    return champion.id
  },
  filterPlayers (player, whichTeam) {
    let { teamId } = this.props.game
    let playerOnPlayersTeam = player.teamId === teamId

    if (playerOnPlayersTeam && !whichTeam) return true
    if (!playerOnPlayersTeam && whichTeam) return true
    return false
  },
  render () {
    let self = this
    let {fellowPlayers, championId, stats} = this.props.game
    let championName = this.getChampionName(championId)
    let playersTeam = fellowPlayers.filter(function (player) {
      return self.filterPlayers(player)
    })
    let opposingTeam = fellowPlayers.filter(function (player) {
      return self.filterPlayers(player, true)
    })
    return (
      <div className='gameCard'>
        <img className='championPic' src={'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/' + championName + '.png'} />
        <div className='playerKDA'>{`${stats.championsKilled}/${stats.numDeaths}/${stats.assists}`}</div>
        <ItemTable stats={stats} />
        <Teams redSide={playersTeam} blueSide={opposingTeam} />
      </div>
    )
  }
})

module.exports = GameCard
