import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import {Table, Column, Cell} from 'fixed-data-table';

import Filters from './filters'

import '../../node_modules/fixed-data-table/dist/fixed-data-table.css'
import './logs-list.scss'

var Renderers = {}
function requireAll(r) {
  r.keys().forEach((filename, i) => {
    var [, dataset, step] = filename.match(/\.\/(.*)\/(.*)\.js/)
    if (!Renderers[dataset]) {
      Renderers[dataset] = {}
    }
    Renderers[dataset][step] = r(filename).default
  })
}
requireAll(require.context('./datasets/', true, /\.js$/))

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

const SortFilterHeaderCell = React.createClass({
  render: function() {
    var sortDir = this.props.sortDir
    var children = this.props.children
    return (
      <Cell>
        <a onClick={this.onSortChange} href='javascript:void(0)'>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
        <div>
          <input ref='filter' placeholder={'Filter'} onChange={this.onFilterChange}/>
        </div>
      </Cell>
    )
  },

  onFilterChange: function(e) {
    if (this.props.onFilterChange) {
      var input = ReactDOM.findDOMNode(this.refs.filter)
      var filter = input.value.length ? input.value : null
      this.props.onFilterChange(this.props.column, filter)
    }
  },

  onSortChange: function(e) {
    e.preventDefault()

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.column,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      )
    }
  }
})

const LogsList = React.createClass({

  getInitialState: function() {
    var allIndexes = []
    for (var index = 0; index < this.props.logs.length; index++) {
      allIndexes.push(index)
    }

    const container = document.querySelector('.logs-container')
    const totalHeight = container.offsetHeight

    return {
      colSortDirs: {},
      colFilters: {},
      allIndexes: allIndexes,
      sortedAndFilteredIndexes: allIndexes.slice(),
      totalHeight
    }
  },

  render: function() {
    const rowHeight = 30
    const totalWidth = 1000
    const totalHeight = this.state.totalHeight
    const columns = Object.keys(this.props.logs[0])
    const columnCount = columns.length

    const dataset = this.props.dataset
    const step = this.props.step

    var renderer = Object.assign({}, Renderers.default.default)
    if (Renderers[dataset] && Renderers[dataset][step]) {
      renderer = Object.assign(renderer, Renderers[dataset][step])
    }

    return (
      <div>
        <Table
          rowHeight={rowHeight}
          rowHeightGetter={(rowIndex) => {
            var row = this.props.logs[this.state.sortedAndFilteredIndexes[rowIndex]]
            return renderer.rowHeight(row, rowHeight)
          }}
          rowsCount={this.state.sortedAndFilteredIndexes.length}
          width={totalWidth}
          height={totalHeight}
          headerHeight={rowHeight * 2}>
          { columns.map((column, i) => (
            <Column
              key={i}
              width={renderer.columnWidth(column, columnCount, totalWidth) || 250}
              header={<SortFilterHeaderCell
                onSortChange={this.onSortChange}
                onFilterChange={this.onFilterChange}
                column={column}
                sortDir={this.state.colSortDirs[column]}>
                {renderer.header(column)}
              </SortFilterHeaderCell>}
              cell={({rowIndex}) => {
                var row = this.props.logs[this.state.sortedAndFilteredIndexes[rowIndex]]
                return (
                  <Cell
                    className='log-cell'
                    key={`${i}-${column}`} >
                    {renderer.cell(column, row[column], row)}
                  </Cell>
                )
              }}
            />
          )) }
        </Table>
      </div>
    )
  },

  onFilterChange: function (column, filter) {
    var colFilters
    if (filter) {
      colFilters = Object.assign(this.state.colFilters, {[column]: filter})
    } else {
      colFilters = Object.assign(this.state.colFilters)
      delete colFilters[column]
    }

    var colSortDirs = Object.assign({}, this.state.colSortDirs)
    this.filterAndSort(colSortDirs, colFilters)
  },

  onSortChange: function (column, sortDir) {
    var colSortDirs = {
      [column]: sortDir
    }
    var colFilters = Object.assign({}, this.state.colFilters)
    this.filterAndSort(colSortDirs, colFilters)
  },

  filterAndSort(colSortDirs, colFilters) {
    // First filter, then sort

    const filterColumns = Object.keys(colFilters)

    var filteredIndexes = this.state.allIndexes.slice()

    if (colFilters && Object.keys(colFilters).length) {
      var applyFilter = (value, filter) => {
        var columnType = typeof value
        if (columnType === 'object') {
          value = JSON.stringify(value)
        }

        return `${value}`.toLowerCase().indexOf(filter.toLowerCase()) > -1
      }

      filteredIndexes = filteredIndexes.filter((index) => {
        var row = this.props.logs[index]

        var filtered = filterColumns.reduce((filtered, column) => {
          return filtered && applyFilter(row[column], colFilters[column])
        }, true)

        return filtered
      })
    }

    if (colSortDirs && Object.keys(colSortDirs).length) {
      var column = Object.keys(colSortDirs)[0]
      var sortDir = colSortDirs[column]

      filteredIndexes.sort((indexA, indexB) => {
        var valueA = this.props.logs[indexA][column]
        var valueB = this.props.logs[indexB][column]

        var sortVal = 0

        if (valueA > valueB) {
          sortVal = 1
        }
        if (valueA < valueB) {
          sortVal = -1
        }
        if (sortVal !== 0 && sortDir === SortTypes.ASC) {
          sortVal = sortVal * -1
        }

        return sortVal
      })
    }

    this.setState({
      colSortDirs: colSortDirs,
      colFilters: colFilters,
      sortedAndFilteredIndexes: filteredIndexes
    })
  },

  handleResize: function(e) {
    const container = document.querySelector('.logs-container')
    const totalHeight = container.offsetHeight

    this.setState({
      totalHeight
    })
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize)
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  }

})

export default LogsList
