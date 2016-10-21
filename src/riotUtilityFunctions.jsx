const ChampionData = require('../public/data/championData.json').data
const _ = require('lodash')

var utils = {
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
  }
}

module.exports = utils
