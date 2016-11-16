var React = require('react')
import { render } from 'react-dom'
var { Provider } = require('react-redux')
var { createStore } = require('redux')
var LoLapp = require('./reducers/index.jsx')
import App from './components/App.jsx'
const { Router, Route, hashHistory } = require('react-router')
const Landing = require('./components/Landing.jsx')
let store = createStore(LoLapp)
console.log('landding', Landing)
const GameContainer = require('./containers/GameContainer.jsx')
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App} >
        <Route path='/land' component={Landing}/>
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app')
)
