import { combineReducers } from 'redux'
const players = require('./players')
const highlightedPlayer = require('./players')
const games = require('./games')

const LoLapp = combineReducers({
  games,
  highlightedPlayer,
  players
})

module.exports = LoLapp
