import { combineReducers } from 'redux'
const players = require('./players')
const games = require('./games')

const LoLapp = combineReducers({
  games,
  players
})

module.exports = LoLapp
