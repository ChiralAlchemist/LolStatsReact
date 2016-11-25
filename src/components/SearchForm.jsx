import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

let SearchForm = ({handleSubmit}) => (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name='summonerName' component='input' type='text' />
      </div>
    </form>
)

SearchForm = reduxForm({
  form: 'test'
})(SearchForm)

module.exports = SearchForm
