import { createRecord } from './reducer'

const findElementWithTestId = (Element) => {
  while (!Element.dataset?.testid) {
    const parent = Element.parentElement
    if (parent) return findElementWithTestId(parent)
    return null
  }
  return Element
}

export default (dispatch) => (event) => {
  console.log('we have an event', event)

  const { type: eventType } = event

  const Element = findElementWithTestId(event.target)
  console.log('we have an event', event)

  if (Element)
    dispatch(
      createRecord({
        type: 'event',
        eventType,
        ...(eventType === 'change' && {
          value: Element.value,
        }),
        targetType: event.target.type,
        testid: Element.dataset.testid,
      }),
    )
}
