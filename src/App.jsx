var React = require('react')
var ReactDOM = require('react-dom')
var Test = require('./Test.jsx')

var App = React.createClass({
  render () {
    return (
      <div>
        <h1> hello world  im here in real time</h1>
        <Test />
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
