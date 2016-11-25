const React = require('react')
const App = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired
  },
  render () {
    return (
      <div className='app-container'>
        {this.props.children}
      </div>
    )
  }
})

export default App
