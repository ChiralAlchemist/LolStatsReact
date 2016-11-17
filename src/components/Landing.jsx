const React = require('react')

const Landing = ({hp, getSummonerStats}) => (
  <div>
    <h1>{hp}</h1>
    <form onSubmit={getSummonerStats}>
      <input className='search' type='text' placeholder='Search' />
    </form>
  </div>
)

Landing.propTypes = {
  getSummonerStats: React.PropTypes.func.isRequired
}

module.exports = Landing
