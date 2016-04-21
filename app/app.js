import React from 'react'
import { findDOMNode } from 'react-dom'

import LogsMap from './components/logs-map'
import LogsList from './components/logs-list'

import './app.scss';

const App = React.createClass({

  getInitialState: function() {
    return {
      availableLogs: [],
      dataset: null,
      step: null,
      logs: null
    }
  },

  render: function() {
    var logsComponent = null

    if (this.state.logs) {
      // var isGeoJSON = this.state.logs[0].type && this.state.logs[0].type === 'Feature'
      var isGeoJSON = false

      if (isGeoJSON) {
        logsComponent = <LogsMap dataset={this.state.dataset} step={this.state.step} logs={this.state.logs} />
      } else {
        logsComponent = <LogsList dataset={this.state.dataset} step={this.state.step} logs={this.state.logs} />
      }
    }

    return (
      <div id='app'>
        <header>
          <div className='container'>
            <h1>🚀 Space/Time Logs Viewer</h1>
            <span></span>
              <select ref='selectedLog' onChange={this.changeLogs}>
                { this.state.availableLogs.map((log, i) => {
                  return <option key={i} value={i}>{log.dataset} - {log.step}</option>
                }) }
              </select>
          </div>
        </header>
          <div className='container'>
            <section className='logs-container'
              key={`${this.state.dataset}-${this.state.step}`} >
              {logsComponent}
            </section>
          </div>
      </div>
    );
  },

  componentDidMount: function() {
    this.loadLogsList()
    this.loadLogs(this.props.initialLogs.dataset, this.props.initialLogs.step)
  },

  changeLogs: function() {
    var logIndex = findDOMNode(this.refs.selectedLog).value
    var log = this.state.availableLogs[logIndex]
    this.loadLogs(log.dataset, log.step)
  },

  loadLogsList: function() {
    fetch(`${this.props.api.url}logs`)
      .then(response => {
        return response.json();
      }).then(json => {
        let availableLogs = []
        Object.keys(json).forEach((dataset) => {
          json[dataset].forEach((step) => {
            availableLogs.push({
              dataset: dataset,
              step: step
            })
          })
        })

        this.setState({
          availableLogs: availableLogs
        });
      }).catch(err => {
        console.error(err)
      })
  },

  loadLogs: function(dataset, step) {
    fetch(`${this.props.api.url}logs/${dataset}/${step}`)
      .then(response => {
        return response.json();
      }).then(json => {
        this.setState({
          dataset: dataset,
          step: step,
          logs: json
        })
      }).catch(err => {
        console.error(err)
      })
  }
});

export default App;
