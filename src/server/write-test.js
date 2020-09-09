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
    screenshotWidth,
    screenshotHeight,
  },
  rootDir,
) => {
  const recordingDir = `${rootDir}/${filePath}`

  fs.mkdirSync(recordingDir, { recursive: true })

  const testProviderImport = path.relative(
    recordingDir,
    `${process.cwd()}/src`,
  )

  console.log('screenshotWidth', screenshotWidth)
  const contents = fileContents(
    recording,
    locationPath,
    localStorage,
    testProviderImport,
    screenshotWidth,
    screenshotHeight,
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
