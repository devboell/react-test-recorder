import React, { useEffect, useReducer } from 'react'
import pt from 'prop-types'

const TOGGLE_IS_RECORDING = 'TOGGLE_IS_RECORDING'
const ADD_EVENT = 'ADD_EVENT'
const CLEAR_EVENTS = 'CLEAR_EVENTS'

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_IS_RECORDING: {
      return { ...state, isRecording: !state.isRecording }
    }
    case ADD_EVENT: {
      return state.isRecording
        ? { ...state, events: [...state.events, action.event] }
        : state
    }
    case CLEAR_EVENTS: {
      return { ...state, events: [] }
    }
    default:
      return state
  }
}
const Recorder = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    events: [],
    isRecording: false,
  })

  useEffect(() => {
    const trueFetch = window.fetch
    window.fetch = function relayFetch(...args) {
      console.log('relayFetch args', args)

      return new Promise((resolve, reject) => {
        trueFetch
          .apply(this, args)
          .then(async (response) => {
            console.log('response', response)
            if (
              true
              // response.url.indexOf('/me') > -1 &&
              // response.type !== 'cors'
            ) {
              const cloned = response.clone()
              const json = await cloned.json()
              dispatch({
                type: ADD_EVENT,
                event: {
                  source: 'fetch',
                  json,
                },
              })
            }
            resolve(response)
          })
          .catch((error) => {
            reject(error)
            // reject(response)
          })
      })
    }
    return () => {
      window.fetch = trueFetch
    }
  }, [])
  useEffect(() => {
    const Tracker = (mouseEvent) => {
      const {
        type,
        toElement: {
          dataset: { testid },
        },
      } = mouseEvent
      if (testid)
        dispatch({
          type: ADD_EVENT,
          event: {
            source: 'ui',
            type,
            testid,
          },
        })
    }

    document.addEventListener('click', Tracker)
    return () => document.removeEventListener('click', Tracker)
  }, [])

  const startRecording = () => {
    dispatch({ type: CLEAR_EVENTS })
    dispatch({ type: TOGGLE_IS_RECORDING })
  }

  const stopRecording = async () => {
    dispatch({ type: TOGGLE_IS_RECORDING })

    // somehow send html or snapshot to the server as a baseline
    console.log('recording stopped', state.events)
    // console.log('children', children)
    await window.fetch('http://localhost:2000/recording', {
      method: 'post',
      body: state.events,
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
