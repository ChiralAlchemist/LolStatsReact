import { combineReducers } from 'redux'
const players = require('./players')
const games = require('./games')
import { reducer as formReducer } from'redux-form'

const LoLapp = combineReducers({
  games,
  players,
  form: formReducer
})

module.exports = LoLapp
