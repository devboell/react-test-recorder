import React, { useState, useEffect, useReducer } from 'react'
import pt from 'prop-types'

import reducer, {
  toggleIsRecording,
  clearSteps,
  initialState,
} from './reducer'

import fetchRelay from './fetch-step'
import mouseTracker from './uievent-step'

const Recorder = ({ enabled, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    if (enabled) {
      const windowFetch = window.fetch
      window.fetch = fetchRelay(dispatch, windowFetch)
      return () => {
        window.fetch = windowFetch
      }
    }
    return () => {} // not sure about this -- lint error fix
  }, [])

  useEffect(() => {
    if (enabled) {
      const Tracker = mouseTracker(dispatch)
      document.addEventListener('click', Tracker)
      return () => document.removeEventListener('click', Tracker)
    }
    return () => {} // not sure about this -- lint error fix
  }, [])

  const startRecording = () => {
    setFileName('')
    dispatch(clearSteps())
    dispatch(toggleIsRecording())
  }

  const stopRecording = async () => {
    dispatch(toggleIsRecording())
    console.log('recording stopped', state.steps)

    await window.fetch('http://localhost:2000/recording', {
      method: 'post',
      body: JSON.stringify({
        fileName,
        recording: state.steps,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const { isRecording } = state
  return enabled ? (
    <>
      <div>
        <button
          type="button"
          onClick={startRecording}
          disabled={isRecording}
        >
          start
        </button>
        {isRecording ? (
          <input
            type="text"
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
          />
        ) : (
          'NOT RECORDING'
        )}
        <button
          type="button"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          stop
        </button>
      </div>
      {children}
    </>
  ) : (
    <>{children}</>
  )
}

Recorder.propTypes = {
  enabled: pt.bool,
  children: pt.node.isRequired,
}

Recorder.defaultProps = {
  enabled: false,
}

export default Recorder
