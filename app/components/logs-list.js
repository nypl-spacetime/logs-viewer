import React from 'react'

import './logs-list.scss'

const LogsList = React.createClass({

  render: function() {
    return (
      <ul>
        { this.props.logs.slice(0, 100).map((row, i) => {
          return (
            <li key={i} className='logs-list-row'>
              <div>
                <a href={`http://maps.nypl.org/warper/maps/${row.id}`}>
                  <img src={`http://images.nypl.org/?t=t&id=${row.nyplDigitalId}`}/>
                </a>
              </div>
              <div>
                <ul>
                  { row.errors.map((err, i) => {
                    var message
                    var httpPos = err.message.indexOf('http://')
                    if (httpPos > -1) {
                      message = (
                        <span>
                          {err.message.slice(0, httpPos)}
                          <a href={err.message.slice(httpPos)}>{err.message.slice(httpPos)}</a>
                        </span>
                      )
                    } else {
                      message = <span>{err.message}</span>
                    }

                    return (
                      <li key={i} className='logs-list-error'>
                        <code>{err.error}</code>
                        {message}
                      </li>
                    )
                  }) }
                </ul>
              </div>
            </li>
          )
        }) }
      </ul>
    )
  }

})

export default LogsList
