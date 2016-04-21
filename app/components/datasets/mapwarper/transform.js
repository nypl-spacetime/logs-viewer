import React from 'react'

const columns = {
  id: 'Map ID',
  nyplDigitalId: 'Preview',
  logs: 'Logs'
}

const columnWidths = {
  id: 80,
  nyplDigitalId: 170,
  logs: 750
}

const Renderer = {
  rowHeight: (row, lineHeight) => 170,

  header: (column) => columns[column],

  columnWidth: (column) => columnWidths[column],

  cell: (column, value) => {
    if (column === 'id') {
      return value
    } else if (column === 'nyplDigitalId') {
      return (
        <a href={`http://maps.nypl.org/warper/maps/${value}`} target='_blank'>
          <img src={`http://images.nypl.org/?t=t&id=${value}`} />
        </a>
      )
    } else if (column === 'logs') {
      return (
        <ul>
          { value.map((log, i) => {
            var message
            var httpPos = log.message.indexOf('http://')
            if (httpPos > -1) {
              message = (
                <span>
                  {log.message.slice(0, httpPos)}
                  <a href={log.message.slice(httpPos)}>{log.message.slice(httpPos)}</a>
                </span>
              )
            } else {
              message = <span>{log.message}</span>
            }
            return (
              <li key={i}>
                <code>{log.type}</code>
                <span>{message}</span>
              </li>
            )
          } )}
        </ul>
      )
    }
  }

}

export default Renderer
