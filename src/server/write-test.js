const fs = require('fs')

const fileImports = () => {
  return `
  /* eslint-disable sonarjs/no-duplicate-string */
  import { render, fireEvent, wait } from '@testing-library/react'  
  import { generateImage } from 'jsdom-screenshot'
  import { testProvider } from 'testProvider' 
  `
}

const fetchMocks = (recording) => {
  let result = ''
  for (let i = 0; i < recording.length; i += 1) {
    const step = recording[i]
    if (step.trigger === 'fetch') {
      result += `
      .once(JSON.stringify(${JSON.stringify(
        step.response.json,
      )}), { headers: { 'Content-Type': 'application/json' } },
      )`
    }
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
    const ${testidToCamel(step.testid)} = getByTestId('${
      step.testid
    }')
    fireEvent.click(${testidToCamel(step.testid)})
    await wait(() => {})`
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

const propEquals = (propName, propValue) => (obj) =>
  obj[propName] === propValue

const fileContents = (recording) => {
  let contents = fileImports()

  contents += `
  jest.setTimeout(30000)

  it('runs the test', async () => {
    fetch${fetchMocks(recording)}

    const { getByTestId } = render(testProvider())
  `
  const uiEventSteps = recording.filter(
    propEquals('trigger', 'uievent'),
  )
  const fetchSteps = recording.filter(propEquals('trigger', 'fetch'))

  contents += fireEvents(uiEventSteps)
  contents += fetchCalls(fetchSteps)

  contents += `

    expect(fetch).toHaveBeenCalledTimes(${fetchSteps.length})

    const screenshot = await generateImage()
    expect(screenshot).toMatchImageSnapshot()

    fetch.resetMocks()
  })
`
  return contents
}

// const writeFile = () => {}
const writeTest = ({ recording, fileName }) => {
  const contents = fileContents(recording)
  fs.writeFileSync(
    `./src/recorded-tests/${fileName}.test.js`,
    contents,
  )
}

module.exports = {
  writeTest,
  fileContents,
}
