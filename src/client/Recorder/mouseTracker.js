import { createEventRecord } from './reducer'

export default (dispatch) => (mouseEvent) => {
  const {
    type,
    toElement: {
      dataset: { testid },
    },
  } = mouseEvent
  if (testid)
    dispatch(
      createEventRecord({
        type,
        testid,
      }),
    )
}
