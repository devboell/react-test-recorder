import { createFetchRecord, addFetchResponse } from './reducer'

export default (dispatch, windowFetch) =>
  function fetchIntercept(...args) {
    const FetchRecord = {
      request: args,
    }
    dispatch(createFetchRecord(FetchRecord))
    return new Promise((resolve, reject) => {
      windowFetch
        .apply(this, args)
        .then(async (response) => {
          if (
            response.headers
              .get('Content-Type')
              .indexOf('application/json') > -1
          ) {
            const cloned = response.clone()
            const json = await cloned.json()
            dispatch(addFetchResponse({ json, url: cloned.url }))
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
