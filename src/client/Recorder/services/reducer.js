export const TOGGLE_IS_RECORDING = 'TOGGLE_IS_RECORDING'
export const CREATE_RECORD = 'CREATE_RECORD'
export const CLEAR_RECORDING = 'CLEAR_RECORDING'

export const toggleIsRecording = () => ({
  type: TOGGLE_IS_RECORDING,
})

export const createRecord = (rec) => ({
  type: CREATE_RECORD,
  rec,
})

export const clearRecording = () => ({
  type: CLEAR_RECORDING,
})

export const initialState = {
  records: [],
  isRecording: false,
}

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_IS_RECORDING: {
      return { ...state, isRecording: !state.isRecording }
    }
    case CREATE_RECORD: {
      return {
        ...state,
        records: [...state.records, action.rec],
      }
    }

    case CLEAR_RECORDING: {
      return { ...state, fetchRecords: [], eventRecords: [] }
    }
    default:
      return state
  }
}
