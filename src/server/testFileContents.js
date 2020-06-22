const fileImports = hasUiEvents => {
  return `
  /* eslint-disable sonarjs/no-duplicate-string */
  import { render,${
    hasUiEvents ? ' fireEvent,' : ''
  } wait } from '@testing-library/react'  
  import { generateImage } from 'jsdom-screenshot'
  import { testProvider } from 'testProvider'
  import { createBrowserHistory } from 'history'
 
  `
}

const fetchMocks = recording => {
  let result = ''
  for (let i = 0; i < recording.length; i += 1) {
    const step = recording[i]
    if (step.trigger === 'fetch') {
      result += `
      .once(JSON.stringify(${JSON.stringify(
        step.response.json,
      )}), { headers: { 'Content-Type': 'application/json' } })`
    }
  }
  return result
}

const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

const testidToCamel = testid =>
  testid
    .split('-')
    .map((part, idx) => (idx === 0 ? part : capitalize(part)))
    .join('')

const fireEvents = steps => {
  let result = ''
  steps.forEach(step => {
    result += `
    await wait(() => {
      const ${testidToCamel(step.testid)} = getByTestId('${
      step.testid
    }')
      fireEvent.click(${testidToCamel(step.testid)})
    })`
  })
  return result
}

const fetchCalls = steps => {
  let result = `
  `
  steps.forEach((step, idx) => {
    const [url, payload] = step.request

    result += `
    expect(fetch).toHaveBeenNthCalledWith(${idx +
      1}, '${url}', ${JSON.stringify(payload)})`
  })
  return result
}

const propEquals = (propName, propValue) => obj =>
  obj[propName] === propValue

const history = path => `
  const history = createBrowserHistory()
  history.push('${path}')

`

const storage = () => {
  const accessToken = localStorage.getItem('accessToken')
  const expirationDate = localStorage.getItem('expirationDate')
  const userId = localStorage.getItem('userId')

  return `
  localStorage.setItem(
    'accessToken',
    '${accessToken}')
  localStorage.setItem('expirationDate', '${expirationDate}')
  localStorage.setItem('userId', '${userId}')

  `
}
const fileContents = (recording, locationPath) => {
  const uiEventSteps = recording.filter(
    propEquals('trigger', 'uievent'),
  )
  const fetchSteps = recording.filter(propEquals('trigger', 'fetch'))
  const hasUiEvents = uiEventSteps.length > 0

  let contents = fileImports(hasUiEvents)

  contents += `
  jest.setTimeout(30000)
  `
  contents += history(locationPath)
  contents += storage()

  contents += `
  it('runs the test', async () => {
    fetch${fetchMocks(recording)}
    
  `
  contents += hasUiEvents
    ? `
    const { getByTestId } = render(testProvider())
    `
    : `
    await wait(() => {})`

  contents += fireEvents(uiEventSteps)
  contents += fetchCalls(fetchSteps)

  contents += `

    expect(fetch).toHaveBeenCalledTimes(${fetchSteps.length})

    const screenshot = await generateImage({ viewport: { width: 1500, height: 1000 } })
    expect(screenshot).toMatchImageSnapshot()

    fetch.resetMocks()
  })
`
  return contents
}

export default fileContents
