const fakeData = require('../../public/data/gameData.json')
const games = (state = fakeData.games, action) => {
  switch (action.type) {
    default:
      console.log(state)
      return state
  }
}

module.exports = games
