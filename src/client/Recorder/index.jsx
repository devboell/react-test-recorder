import React, { useState, useEffect, useReducer } from 'react'
import pt from 'prop-types'

import reducer, {
  toggleIsRecording,
  // clearRecording,
  initialState,
} from './reducer'

import fetchIntercept from './fetchIntercept'
import mouseTracker from './mouseTracker'

const Recorder = ({ enabled, children }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [locationPath] = useState(window.location.pathname)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [fileName, setFileName] = useState('')

  let windowFetch
  let Tracker
  if (!isInitialized && enabled) {
    // intercept fetch calls
    windowFetch = window.fetch
    window.fetch = fetchIntercept(dispatch, windowFetch)

    // intercept ui events
    Tracker = mouseTracker(dispatch)
    document.addEventListener('click', Tracker)

    // init recorder
    setIsInitialized(true)
    dispatch(toggleIsRecording())
  }

  useEffect(() => {
    // cleanup
    return () => {
      window.fetch = windowFetch
      document.removeEventListener('click', Tracker)
    }
  }, [])

  const stopRecording = async () => {
    dispatch(toggleIsRecording())
    const recording = {
      fetchRecords: state.fetchRecords,
      eventRecords: state.eventRecords,
    }
    console.log('recording stopped', recording)
    await window.fetch('http://localhost:2000/recording', {
      method: 'post',
      body: JSON.stringify({
        fileName,
        locationPath,
        localStorage,
        recording,
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

/*
        <button
          type="button"
          onClick={() => {}} // {startRecording}
          disabled={isRecording}
        >
          start
        </button>
*/
/*
 
*/
