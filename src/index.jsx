var React = require('react')
import { render } from 'react-dom'
var { Provider } = require('react-redux')
var { createStore } = require('redux')
var LoLapp = require('./reducers/index.jsx')
import App from './components/App.jsx'

let store = createStore(LoLapp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
