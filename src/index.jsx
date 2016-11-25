const React = require('react')
const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { createStore } = require('redux')
const LoLapp = require('./reducers/index.jsx')
import App from './components/App.jsx'
const { Router, Route, hashHistory, IndexRoute } = require('react-router')
const VisableLanding = require('./containers/Landing.jsx')
const store = createStore(LoLapp)
const GameContainer = require('./containers/GameContainer.jsx')

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={VisableLanding} />
        <Route path='/summoner/:name' component={GameContainer} />
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app')
)
