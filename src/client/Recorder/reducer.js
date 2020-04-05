export const TOGGLE_IS_RECORDING = 'TOGGLE_IS_RECORDING'
export const CREATE_STEP = 'CREATE_STEP'
export const ADD_STEP_RESPONSE = 'ADD_STEP_RESPONSE'
export const CLEAR_STEPS = 'CLEAR_STEPS'

export const toggleIsRecording = () => ({
  type: TOGGLE_IS_RECORDING,
})

export const createStep = (step) => ({
  type: CREATE_STEP,
  step,
})

export const addStepResponse = (response) => ({
  type: ADD_STEP_RESPONSE,
  response,
})

export const clearSteps = () => ({
  type: CLEAR_STEPS,
})

export const initialState = {
  steps: [],
  isRecording: false,
  name: '',
}

export default (state, action) => {
  switch (action.type) {
    case TOGGLE_IS_RECORDING: {
      return { ...state, isRecording: !state.isRecording }
    }
    case CREATE_STEP: {
      console.log('in CREATE_STEP, trigger', action.step.trigger)
      return state.isRecording
        ? { ...state, steps: [...state.steps, action.step] }
        : state
    }
    case ADD_STEP_RESPONSE: {
      const { response } = action
      const updatedSteps = state.steps.map((step) =>
        step.trigger === 'fetch' && step.request[0] === response.url
          ? { ...step, response }
          : step,
      )

      return state.isRecording
        ? { ...state, steps: updatedSteps }
        : state
    }
    case CLEAR_STEPS: {
      return { ...state, steps: [] }
    }
    default:
      return state
  }
}
