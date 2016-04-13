import React from 'react'
import { findDOMNode } from 'react-dom'

import LogsMap from './components/logs-map'
import LogsList from './components/logs-list'

import './app.scss';

const App = React.createClass({

  getInitialState: function() {
    return {
      dataset: 'mapwarper',
      step: 'transform',
      logs: null
    }
  },

  render: function() {
    var logsComponent = null

    if (this.state.logs) {
      var isGeoJSON = this.state.logs[0].type && this.state.logs[0].type === 'Feature'

      if (isGeoJSON) {
        logsComponent = <LogsMap logs={this.state.logs} />
      } else {
        logsComponent = <LogsList logs={this.state.logs} />
      }
    }

    return (
      <div id='app'>
        <header>
          <h1>🚀 Space/Time Logs Viewer</h1>
          <span>Blablablablablablablablablablablablablablablabla!</span>
            <select ref='selectedLog' onChange={this.changeLogs}>
              { this.props.availableLogs.map((log, i) => {
                return <option key={i} value={i}>{log.dataset} - {log.step}</option>
              }) }
            </select>
        </header>
        <section className='logs-container'>
          {logsComponent}
        </section>
      </div>
    );
  },

  componentDidMount: function() {
    this.loadLogs(this.state.dataset, this.state.step)
  },

  changeLogs: function() {
    var logIndex = findDOMNode(this.refs.selectedLog).value;
    var log = this.props.availableLogs[logIndex]
    this.loadLogs(log.dataset, log.step)
  },

  loadLogs: function(dataset, step) {
    fetch(`${this.props.api.url}logs/${dataset}/${step}`)
      .then(response => {
        return response.json();
      }).then(json => {
        this.setState({
          logs: json
        });
      }).catch(err => {
        console.error(err)
      })
  }
});

export default App;
