import { createRecord } from './reducer'

export default (dispatch, windowFetch) =>
  function fetchIntercept(...args) {
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

            const Record = {
              type: 'fetch',
              request: args,
              response: { json, url: cloned.url },
            }
            dispatch(createRecord(Record))
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
