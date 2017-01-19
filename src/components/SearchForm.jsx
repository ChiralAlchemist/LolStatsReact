import React from 'react'
import { Field, reduxForm } from 'redux-form'

let SearchForm = ({handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field name='summonerName' component='input' type='text' />
    </div>
  </form>
)

SearchForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired
}

SearchForm = reduxForm({
  form: 'test'
})(SearchForm)

module.exports = SearchForm
