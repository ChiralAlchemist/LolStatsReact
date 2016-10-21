const React = require('react')
const { shape, string } = React.PropTypes
const ItemTable = React.createClass({
  propTypes: {
    stats: shape({
      item0: string,
      item1: string,
      item2: string,
      item3: string,
      item4: string,
      item5: string
    })
  },

  render () {
    let { item0, item1, item2, item3, item4, item5 } = this.props.stats
    return (
      <div className='itemTable'>
        <table>
          <tbody>
            <tr>
              <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/' + item0 + '.png'} /> </td>
              <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/' + item1 + '.png'} /> </td>
              <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/' + item2 + '.png'} /> </td>
            </tr>
            <tr>
              <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/' + item3 + '.png'} /> </td>
              <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/' + item4 + '.png'} /> </td>
              <td><img className='itemPicture' src={'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/' + item5 + '.png'} /> </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
})

module.exports = ItemTable
