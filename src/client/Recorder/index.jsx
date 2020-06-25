import React, { useState, useEffect, useReducer } from 'react'
import pt from 'prop-types'

import reducer, {
  toggleIsRecording,
  // clearRecording,
  initialState,
} from './services/reducer'

import fetchIntercept from './services/fetchIntercept'
import mouseTracker from './services/mouseTracker'

import RecordingPanel from './components/RecordingPanel'

const Recorder = ({ enabled, children }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [locationPath] = useState(window.location.pathname)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [filePath, setFilePath] = useState('')
  const [description, setDescription] = useState('')

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
        filePath,
        description,
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
    <RecordingPanel
      isRecording={isRecording}
      stopRecording={stopRecording}
      filePath={filePath}
      setFilePath={setFilePath}
      description={description}
      setDescription={setDescription}
    >
      {children}
    </RecordingPanel>
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
