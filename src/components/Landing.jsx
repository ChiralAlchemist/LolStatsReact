const React = require('react')
const SearchForm = require('./SearchForm')

const Landing = ({hp, getSummonerStats}) => (
  <div>
    <h1>{hp}</h1>
    <SearchForm onSubmit={getSummonerStats} />
  </div>
)

Landing.propTypes = {
  getSummonerStats: React.PropTypes.func.isRequired,
  hp: React.PropTypes.string.isRequired
}

module.exports = Landing
