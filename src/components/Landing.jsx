const React = require('react')
const SearchForm = require('./SearchForm')

const Landing = ({hp, getSummonerStats, handleInputChange}) => (
  <div>
    <h1>{hp}</h1>
    <SearchForm onSubmit={getSummonerStats}/>
  </div>
)

// <form onSubmit={this.props.getSummonerStats}>
//   <input className='search' type='text' placeholder='Search' onChange={this.props.handleInputChange} />
// </form>

Landing.propTypes = {
  getSummonerStats: React.PropTypes.func.isRequired
}

module.exports = Landing
