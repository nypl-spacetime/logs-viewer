import React from 'react'

const Renderer = {
  rowHeight: (row, lineHeight) => {
    var lineCounts = Object.keys(row)
        .map((key) => JSON.stringify(row[key], null, 2))
        .map((str) => str ? str.split(/\r\n|\r|\n/).length : 0)
    return Math.max(...lineCounts) * lineHeight
  },

  columnWidth: (column, columnCount, totalWidth) => {
    return totalWidth / columnCount
  },

  header: (column) => column,

  cell: (column, value) => {
    var columnType = typeof value

    if (columnType === 'boolean') {
      value = value ? 'true' : 'false'
    }

    if (columnType === 'object') {
      return (
        <code><pre>
          { JSON.stringify(value, null, 2)}
        </pre></code>
      )
    } else {
      return value
    }
  }
}

export default Renderer
