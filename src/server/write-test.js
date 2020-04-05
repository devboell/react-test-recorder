const fs = require('fs')

const fileImports = () => {
  return `
  /* eslint-disable sonarjs/no-duplicate-string */
  import { render, fireEvent, wait } from '@testing-library/react'  
  import { testProvider } from 'testProvider' 
  `
}

const responses = (recording) => {
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
// recording
//   .filter((step) => step.source === 'fetch')
//   .map(
//     (step) => `
//     .once(${JSON.stringify(step.response.json)})`,
//   )

const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

const testidToCamel = (testid) =>
  testid
    .split('-')
    .map((part, idx) => (idx === 0 ? part : capitalize(part)))
    .join('')

const fileContents = (recording) => {
  let contents = fileImports()

  contents += `
  it('runs the test', async () => {
    fetch${responses(recording)}

    const { getByTestId } = render(testProvider())
  `

  let fetchCount = 0
  recording.forEach((step) => {
    if (step.trigger === 'uievent') {
      contents += `
    const ${testidToCamel(step.testid)} = getByTestId('${
        step.testid
      }')
    fireEvent.click(${testidToCamel(step.testid)})
      `
      if (fetchCount === 0)
        contents += `
    await wait(() => {})`
    } else {
      fetchCount += 1
      const [url, payload] = step.request
      contents += `
    expect(fetch).toHaveBeenNthCalledWith(${fetchCount}, '${url}', ${JSON.stringify(
        payload,
      )})
      `
    }
  })

  contents += `
    expect(fetch).toHaveBeenCalledTimes(${fetchCount})

    fetch.resetMocks()
  })
`
  return contents
}

// const writeFile = () => {}
const writeTest = (recording) => {
  const contents = fileContents(recording)
  fs.writeFileSync('./src/recorded-tests/somename.test.js', contents)
}

module.exports = {
  writeTest,
  fileContents,
}
