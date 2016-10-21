const React = require('react')
const ChampionData = require('../public/data/championData.json').data
const _ = require('lodash')

const GameCard = React.createClass({
  getChampionName (id) {
    var champion = _.find(ChampionData, {'key': id.toString()})
    return champion.id
  },
  filterPlayers (player, whichTeam) {
    let playersTeamId = this.props.game.teamId
    let playerOnPlayersTeam = player.teamId === playersTeamId

    if(playerOnPlayersTeam && !whichTeam) return true;
    if(!playerOnPlayersTeam && whichTeam) return true;
    return false;
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
          <div className='itemTable'>
            <table>
              <tbody>
                  <tr>
                  <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+stats.item0+'.png'} /> </td>
                  <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+stats.item1+'.png'} /> </td>
                  <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+stats.item2+'.png'} /> </td>
                  </tr>
                  <tr>
                  <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+stats.item3+'.png'} /> </td>
                  <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+stats.item4+'.png'} /> </td>
                  <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+stats.item5+'.png'} /> </td>

                  </tr>
              </tbody>
            </table>
          </div>
          <div className='teams'>  {/* todo make into separate component */}
            <div className='playerTeam'>
            {playersTeam.map((player) => {
              return (
                  <div key={player.summonerId} >
                    <img className='miniChampionPic' src={'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/' + self.getChampionName(player.championId) + '.png'} />
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
                    <img className='miniChampionPic' src={'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/' + self.getChampionName(player.championId) + '.png'} />
                    <div> {player.summonerId} </div>
                  </div>
              )
            })
            }
            </div>

        </div>
      </div>
    )
  }
})

const { object } = React.PropTypes;

GameCard.propTypes = {
  game: object.isRequired
}

module.exports = GameCard
