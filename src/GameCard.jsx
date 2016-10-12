const React = require('react')
const ChampionData = require('../public/data/championData.json').data
const _ = require('lodash')

const GameCard = React.createClass({
  getChampionName (id) {
    console.log('id', id)
    var champion = _.find(ChampionData, {'key': id.toString()})
    console.log('champion', champion)
    return champion.id
  },
  render () {
    console.log(this.props.game)
    console.log(ChampionData)
    let championName = this.getChampionName(this.props.game.championId)
    return (
      <div className='gameCard'>
        <div>
          <img className= 'championPic' src={'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/' + championName + '.png'} />
        </div>
      </div>
    )
  }
})

module.exports = GameCard
