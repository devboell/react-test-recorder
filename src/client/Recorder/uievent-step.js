import { createStep } from './reducer'

export default (dispatch) => (mouseEvent) => {
  const {
    type,
    toElement: {
      dataset: { testid },
    },
  } = mouseEvent
  if (testid)
    dispatch(
      createStep({
        trigger: 'uievent',
        type,
        testid,
      }),
    )
}
