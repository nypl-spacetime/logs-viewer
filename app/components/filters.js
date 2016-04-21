import React, { Component } from 'react';

import './logs-list.scss'

const Filters = React.createClass({

  getInitialState: function() {
    var types = new Set()

    this.props.logs.forEach((log) => {
      (log.logs || []).forEach((error) => {
        types.add(error.error)
      })
    })

    return {
      types: types
    }
  },

  render: function() {
    console.log(this.state.types)
    return (
      <div>
        <input placeholder='ID' />
        <input placeholder='Name' />
      </div>
    )
  }

})

export default Filters
