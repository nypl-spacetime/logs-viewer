import React from 'react'

const columns = {
  id: 'Map ID',
  nyplDigitalId: 'Image ID',
  logs: 'Logs'
}

const columnWidths = {
  id: 80,
  nyplDigitalId: 170,
  logs: 750
}

const Renderer = {
  rowHeight: (row, lineHeight) => 185,

  header: (column) => columns[column],

  columnWidth: (column) => columnWidths[column],

  cell: (column, value, row) => {
    if (column === 'id') {
      return value
    } else if (column === 'nyplDigitalId') {
      return (
        <div>
          <div>
            <a href={`http://digitalcollections.nypl.org/items/image_id/${value}`} target='_blank'>{value}</a>
          </div>
          <a href={`http://maps.nypl.org/warper/maps/${row.id}`} target='_blank'>
            <img src={`http://images.nypl.org/?t=t&id=${value}`} />
          </a>
        </div>
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
