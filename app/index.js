import React from 'react';
import { render } from 'react-dom';

import App from './app';

import './index.scss';

var api = __CONFIG__.api;
var availableLogs = __CONFIG__['available-logs'];

render(
  <App api={api} availableLogs={availableLogs} />,
  document.getElementById('app')
);
