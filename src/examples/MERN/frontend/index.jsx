/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import ReactDOM from 'react-dom'

import Recorder from '../../../client/Recorder'

import App from './components/App'

ReactDOM.render(
  <Recorder enabled>
    <App />
  </Recorder>,
  document.getElementById('root'),
)
