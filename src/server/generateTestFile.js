const fileImports = (hasEvents, testProviderImport) => {
  return `
  import { render,${
    hasEvents ? ' fireEvent,' : ''
  } waitFor } from '@testing-library/react'  
  import { generateImage } from 'jsdom-screenshot'
  import { createBrowserHistory } from 'history'
  import { testProvider } from '${testProviderImport}/testProvider'

  `
}

const fetchMocks = (fetchRecords) => {
  let result = ''
  for (let i = 0; i < fetchRecords.length; i += 1) {
    const record = fetchRecords[i]
    result += `
      .once(JSON.stringify(${JSON.stringify(
        record.response.json,
      )}), { headers: { 'Content-Type': 'application/json' } })`
  }
  return result
}

const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

const testidToCamel = (testid) =>
  testid
    .split('-')
    .map((part, idx) => (idx === 0 ? part : capitalize(part)))
    .join('')

const fireEvents = (steps) => {
  let result = ''
  steps.forEach((step) => {
    result += `
    await waitFor(() => {
      const ${testidToCamel(step.testid)} = getByTestId('${
      step.testid
    }')
      fireEvent.click(${testidToCamel(step.testid)})
    })`
  })
  return result
}

const fetchCalls = (steps) => {
  let result = `
  `
  steps.forEach((step, idx) => {
    const [url, payload] = step.request

    result += `
    expect(fetch).toHaveBeenNthCalledWith(${
      idx + 1
    }, '${url}', ${JSON.stringify(payload)})`
  })
  return result
}

const history = (path) => `
  const history = createBrowserHistory()
  history.push('${path}')
`

const storage = (localStorage) => {
  let result = `
  `
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(localStorage)) {
    result += `localStorage.setItem('${key}', '${value}')
    `
  }
  return result
}
const fileContents = (
  recording,
  locationPath,
  localStorage,
  testProviderImport,
) => {
  const { fetchRecords, eventRecords } = recording

  const hasEvents = eventRecords.length > 0

  let contents = fileImports(hasEvents, testProviderImport)

  contents += `
  jest.setTimeout(30000)
  `
  contents += history(locationPath)
  contents += storage(localStorage)

  contents += `
  it('runs the test', async () => {
    fetch${fetchMocks(fetchRecords)}
    
  `
  contents += hasEvents
    ? `
    const { getByTestId } = render(testProvider())
    `
    : `
    render(testProvider())
    await waitFor(() => {})`

  contents += fireEvents(eventRecords)
  contents += fetchCalls(fetchRecords)

  contents += `

    expect(fetch).toHaveBeenCalledTimes(${fetchRecords.length})

    const screenshot = await generateImage({ viewport: { width: 1500, height: 1000 } })
    expect(screenshot).toMatchImageSnapshot()

    fetch.resetMocks()
  })
`
  return contents
}

module.exports = fileContents
