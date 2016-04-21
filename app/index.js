import React from 'react'
import { render } from 'react-dom'

import App from './app'

import './index.scss'

const api = __CONFIG__.api
const initialLogs = __CONFIG__['initial-logs']

render(
  <App api={api} initialLogs={initialLogs}/>,
  document.getElementById('app')
);
