import { createStep, addStepResponse } from './reducer'

export default (dispatch, windowFetch) =>
  function relayFetch(...args) {
    console.log('relayFetch args', args)
    const step = {
      trigger: 'fetch',
      request: args,
    }
    dispatch(createStep(step))
    return new Promise((resolve, reject) => {
      windowFetch
        .apply(this, args)
        .then(async (response) => {
          console.log('response', response)
          if (
            response.headers
              .get('Content-Type')
              .indexOf('application/json') > -1
          ) {
            const cloned = response.clone()
            const json = await cloned.json()
            dispatch(addStepResponse({ json, url: cloned.url }))
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
          // reject(response)
        })
    })
  }
