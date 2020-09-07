const fs = require('fs')
const path = require('path')
const fileContents = require('./generateTestFile')

const writeTest = (
  {
    recording,
    filePath,
    locationPath,
    localStorage,
    description,
    windowWidth,
    windowHeight,
  },
  rootDir,
) => {
  const recordingDir = `${rootDir}/${filePath}`

  fs.mkdirSync(recordingDir, { recursive: true })

  const testProviderImport = path.relative(
    recordingDir,
    `${process.cwd()}/src`,
  )
  const contents = fileContents(
    recording,
    locationPath,
    localStorage,
    testProviderImport,
    windowWidth,
    windowHeight,
  )

  fs.writeFileSync(`${recordingDir}/index.test.js`, contents)
  fs.writeFileSync(
    `${recordingDir}/recording.json`,
    JSON.stringify(recording, null, 2),
  )
  fs.writeFileSync(`${recordingDir}/description.txt`, description)
}

module.exports = {
  writeTest,
  fileContents,
}
