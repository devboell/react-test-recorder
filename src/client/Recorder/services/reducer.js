export const TOGGLE_IS_RECORDING = 'TOGGLE_IS_RECORDING'
export const CREATE_FETCH_RECORD = 'CREATE_FETCH_RECORD'
export const CREATE_EVENT_RECORD = 'CREATE_EVENT_RECORD'
export const ADD_FETCH_RESPONSE = 'ADD_FETCH_RESPONSE'
export const CLEAR_RECORDING = 'CLEAR_RECORDING'

export const toggleIsRecording = () => ({
  type: TOGGLE_IS_RECORDING,
})

export const createFetchRecord = (rec) => ({
  type: CREATE_FETCH_RECORD,
  rec,
})

export const createEventRecord = (rec) => ({
  type: CREATE_EVENT_RECORD,
  rec,
})

export const addFetchResponse = (response) => ({
  type: ADD_FETCH_RESPONSE,
  response,
})

export const clearRecording = () => ({
  type: CLEAR_RECORDING,
})

export const initialState = {
  fetchRecords: [],
  eventRecords: [],
  isRecording: false,
  name: '',
}

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_IS_RECORDING: {
      return { ...state, isRecording: !state.isRecording }
    }
    case CREATE_FETCH_RECORD: {
      return {
        ...state,
        fetchRecords: [...state.fetchRecords, action.rec],
      }
    }
    case ADD_FETCH_RESPONSE: {
      const { response } = action
      const updatedRecords = state.fetchRecords.map((rec) =>
        rec.request[0] === response.url ? { ...rec, response } : rec,
      )

      return state.isRecording // nescessary?
        ? { ...state, fetchRecords: updatedRecords }
        : state
    }

    case CREATE_EVENT_RECORD: {
      return {
        ...state,
        eventRecords: [...state.eventRecords, action.rec],
      }
    }
    case CLEAR_RECORDING: {
      return { ...state, fetchRecords: [], eventRecords: [] }
    }
    default:
      return state
  }
}
