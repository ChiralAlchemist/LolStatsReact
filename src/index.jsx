const React = require('react')
const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { createStore } = require('redux')
const LoLapp = require('./reducers/index.jsx')
import App from './components/App.jsx'
const { Router, Route, hashHistory, IndexRoute } = require('react-router')
const VisableLanding = require('./containers/Landing.jsx')
const Landing = require('./components/Landing.jsx')

console.log('vis', VisableLanding)

const store = createStore(LoLapp)
const GameContainer = require('./containers/GameContainer.jsx')
console.log('gc', GameContainer)

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={Landing} />
        <Route path='/summoner' component={GameContainer} />
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app')
)
