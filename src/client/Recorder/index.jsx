import React, { useEffect, useReducer } from 'react'
import pt from 'prop-types'

import reducer, {
  toggleIsRecording,
  clearSteps,
  initialState,
} from './reducer'

import fetchRelay from './fetch-step'
import mouseTracker from './uievent-step'

const Recorder = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const windowFetch = window.fetch
    window.fetch = fetchRelay(dispatch, windowFetch)
    return () => {
      window.fetch = windowFetch
    }
  }, [])

  useEffect(() => {
    const Tracker = mouseTracker(dispatch)
    document.addEventListener('click', Tracker)
    return () => document.removeEventListener('click', Tracker)
  }, [])

  const startRecording = () => {
    dispatch(clearSteps())
    dispatch(toggleIsRecording())
  }

  const stopRecording = async () => {
    dispatch(toggleIsRecording())
    console.log('recording stopped', state.steps)

    await window.fetch('http://localhost:2000/recording', {
      method: 'post',
      body: JSON.stringify(state.steps),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const { isRecording } = state
  return (
    <>
      <div>
        <button
          type="button"
          onClick={startRecording}
          disabled={isRecording}
        >
          start
        </button>
        {isRecording ? 'RECORDING' : 'NOT RECORDING'}
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
  )
}

Recorder.propTypes = {
  children: pt.node.isRequired,
}
export default Recorder
